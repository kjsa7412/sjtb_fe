import Blank from "@/components/blank/Blank";
import {EBannerType, EBlank} from "@/types/enums/common-enum";
import PageContainer from "@/components/containers/PageContainer";
import Banner from "@/components/banner/Banner";
import {getPostBySlug} from "@/utils/postUtil";
import WriterInfo from "@/components/read/WriterInfo";
import ContentsContainer from "@/components/containers/ContentsContainer";
import BodyContainer from "@/components/containers/BodyContainer";
import TagList from "@/components/read/TagList";
import Reaction from "@/components/read/Reaction";
import WriteComment from "@/components/read/WriteComment";
import ReadComment from "@/components/read/ReadComment";
import ReadPost from "@/components/read/ReadPost";
import markdownToHtml from "@/utils/markdownToHtml";

interface Props {
    params: {
        slug: string
    }
};

const Post = async (props: Props) => {
    const post = getPostBySlug(props.params.slug);
    const content = await markdownToHtml(post?.content || "");

    return (
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <Banner type={EBannerType.Read} title={post?.title || ""} writer={post?.writer || ""} info={{date: post?.date || "", avatar: ""}}/>
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
        </PageContainer>
    )
}

export default Post;