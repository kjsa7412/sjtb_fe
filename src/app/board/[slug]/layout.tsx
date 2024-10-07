import {ReactNode} from 'react';
import Script from "next/script";

import {getPostBySlug} from "@/utils/postUtil";
import {META} from "@/contants/metadata";
import {IPostData} from "@/types/interfaces/post-interface";
import {getLdJsonArticle} from "@/seo/ldJson/getLdJsonArticle";

const Layout = ({children, params}: { children: ReactNode, params: { slug: string } }) => {
    const post: IPostData | undefined = getPostBySlug(params.slug);

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