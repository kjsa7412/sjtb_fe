import {Metadata} from "next";

import {EBannerType, EBlank} from "@/types/enums/common-enum";
import {getPostBySlug} from "@/utils/postUtil";
import markdownToHtml from "@/utils/markdownToHtml";
import {IPostData} from "@/types/interfaces/post-interface";
import {getMetadata} from "@/seo/metadata/getMetadata";
import {IMetadata} from "@/types/interfaces/metadata-interface";
import {META} from "@/contants/metadata";

import Blank from "@/components/blank/Blank";
import PageContainer from "@/components/containers/PageContainer";
import Banner from "@/components/banner/Banner";
import WriterInfo from "@/components/read/WriterInfo";
import ContentsContainer from "@/components/containers/ContentsContainer";
import BodyContainer from "@/components/containers/BodyContainer";
import TagList from "@/components/read/TagList";
import ReadPost from "@/components/read/ReadPost";
import FooterBase from "@/components/footer/FooterBase";
import ActivityBox from "@/components/read/ActivityBox";

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

    return (
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <Banner type={EBannerType.Read} title={post.title} author={post.author} dateModified={post.dateModified}/>
            <BodyContainer>
                <ContentsContainer>
                    <ReadPost content={content}/>
                    <WriterInfo author={post.author}/>
                    <TagList tags={post.keywords}/>
                    <ActivityBox slug={post.slug}/>
                </ContentsContainer>
            </BodyContainer>
            <FooterBase/>
        </PageContainer>
    )
}

export default Post;