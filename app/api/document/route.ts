import {NextResponse} from 'next/server';

const API_URL = process.env.API_URL
    ? process.env.API_URL
    : 'https://www.drupal.org/api-d7/node.json';

// Only the query parameters the app actually uses are forwarded to drupal.org.
const ALLOWED_PARAMS = ['nid', 'type', 'limit', 'direction', 'page', 'og_group_ref_documentation'];

export async function GET(request: Request) {
    const incoming = new URL(request.url).searchParams;
    const params = new URLSearchParams();
    ALLOWED_PARAMS.forEach((key) => {
        const value = incoming.get(key);
        if (value !== null) {
            params.set(key, value);
        }
    });

    try {
        const res = await fetch(`${API_URL}?${params.toString()}`, {
            headers: {Accept: 'application/json'},
        });

        if (!res.ok) {
            return NextResponse.json({error: 'Upstream API error'}, {status: 502});
        }

        const data = await res.json();
        return NextResponse.json({data});
    } catch (e) {
        console.error('Failed to fetch from drupal.org API:', e);
        return NextResponse.json({error: 'Failed to fetch data'}, {status: 502});
    }
}
