import {EBannerType, EBlank} from "@/types/enums/common-enum";
import {getPostBySlug} from "@/utils/postUtil";
import markdownToHtml from "@/utils/markdownToHtml";
import {IPostData} from "@/types/interfaces/post-interface";

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

const Post = async (props: Props) => {
    const post: IPostData | undefined = getPostBySlug(props.params.slug);
    if(!post) return null;
    const content = await markdownToHtml(post.content);
    return (
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <Banner type={EBannerType.Read} title={post.title} author={post.author} dateModified={post.dateModified}/>
            <BodyContainer>
                <ContentsContainer>
                    <ReadPost content={content}/>
                    <WriterInfo/>
                    <TagList/>
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