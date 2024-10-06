import {Metadata} from "next";

import {EBannerType, EBlank} from "@/types/enums/common-enum";
import {getPostBySlug} from "@/utils/postUtil";
import markdownToHtml from "@/utils/markdownToHtml";
import {IPostData} from "@/types/interfaces/post-interface";
import {getMetadata} from "@/seo/metadata/getMetadata";
import {IMetadata} from "@/types/interfaces/metadata-interface";
import {META} from "@/contants/metadata";
import {getLdJsonArticle} from "@/seo/ldJson/getLdJsonArticle";

import Blank from "@/components/blank/Blank";
import PageContainer from "@/components/containers/PageContainer";
import Banner from "@/components/banner/Banner";
import WriterInfo from "@/components/read/WriterInfo";
import ContentsContainer from "@/components/containers/ContentsContainer";
import BodyContainer from "@/components/containers/BodyContainer";
import TagList from "@/components/read/TagList";
import Reaction from "@/components/read/Reaction";
import WriteComment from "@/components/read/WriteComment";
import ReadComment from "@/components/read/ReadComment";
import ReadPost from "@/components/read/ReadPost";
import FooterBase from "@/components/footer/FooterBase";

interface Props {
    params: {
        slug: string
    }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const post = getPostBySlug(params.slug)
    if (!post) return {};
    const metadata: IMetadata = {
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        baseUrl: META.baseUrl,
        pageUrl: `/board/${params.slug}`,
        ogImage: post.thumbnail
    };
    return getMetadata(metadata);
}

const Post = async (props: Props) => {
    const post: IPostData | undefined = getPostBySlug(props.params.slug);
    if (!post) return null;
    const content = await markdownToHtml(post.content);

    const structuredData = getLdJsonArticle({
        id: `${META.baseUrl}/board/${props.params.slug}`,
        headline: post.title,
        image: [post.thumbnail],
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        author: {name: post.author, url: ''},
        keywords: post.keywords,
    });

    return (
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <Banner type={EBannerType.Read} title={post.title} author={post.author} dateModified={post.dateModified}/>
            <BodyContainer>
                <ContentsContainer>
                    <ReadPost content={content}/>
                    <WriterInfo author={post.author}/>
                    {post.keywords.length > 0 && <TagList tags={post.keywords}/>}
                    <Reaction/>
                    <WriteComment/>
                    <ReadComment/>
                    <ReadComment/>
                    <ReadComment/>
                    <ReadComment/>
                </ContentsContainer>
            </BodyContainer>
            <FooterBase/>
        </PageContainer>
    )
}

export default Post;