import {ReactNode} from 'react';
import Head from "next/head";
import Script from "next/script";

import {getPostBySlug} from "@/utils/postUtil";
import {META} from "@/contants/metadata";
import {IPostData} from "@/types/interfaces/post-interface";
import {getLdJsonArticle} from "@/seo/ldJson/getLdJsonArticle";

const Layout = ({children, params}: { children: ReactNode, params: { slug: string } }) => {
    const post: IPostData | undefined = getPostBySlug(params.slug);

    //todo
    // 이부분 hydration 에러가 나와서 ld+json 부분을 page.tsx에 있는 generateMetadata로 옮겨야할듯?
    // 구조 한번 여쭤보기
    // <head> 태그를 <Head>로 바꾸면 에러는 사라지나, html head에 ldjson 삽입이 안됨


    return (
        <>
            {
                !!post &&
                    <Script id="ld+json"
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(getLdJsonArticle({
                                id: `${META.baseUrl}/board/${params.slug}`,
                                headline: post.title,
                                image: [post.thumbnail],
                                datePublished: post.datePublished,
                                dateModified: post.dateModified,
                                author: {name: post.author, url: ''},
                                keywords: post.keywords,
                            }))
                        }}
                    />
            }
            {children}
        </>
    );
}

export default Layout;