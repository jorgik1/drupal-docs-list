import fetchAPI from "@/app/lib/api/dataFetcher";
import {PageData} from "@/app/lib/types/types";

export default async function Page({params}: { params: { slug: string } }) {
    const apiData = fetchAPI(new URLSearchParams({nid : params.slug}));
    const page = await apiData.then((data) => {
        Object.assign(data.list[0], {body: data.list[0].body?.value?.replace(/(<([^>]+)>)/gi, "")});
        return data.list[0]
    }) as PageData;
    return (
        <>
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
                    <div className="px-10">
                        <h1 className="headerTitle px-0 no-underline pb-2">
                            <p className="text-5xl font-bold">{page.title}</p>
                        </h1>
                        <p className="pt-4">{page.body}</p>
                    </div>
                </section>
            </div>
        </>
    );
}