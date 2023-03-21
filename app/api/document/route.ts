import {NextResponse} from 'next/server';

const API_URL = process.env.API_URL
    ? process.env.API_URL
    : 'https://www.drupal.org/api-d7/node.json';
export async function GET(request: Request) {
    const params = request.url.split('?')[1];
    try {
        const res = await fetch(`${API_URL}?${params.toString()}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            return NextResponse.error();
        }

        const data = await res.json().catch((e: Error) => {
            console.error(e);
            return NextResponse.error();
        });
        return NextResponse.json({ data });
    } catch (e: Error | any) {
        if (e.message === 'cancelled') {
            // Cancelled by browser
            console.log('Request Cancelled by the Browser', e);
        } else {
            console.error('Network Error, CORS or timeout.');
        }
    }
}