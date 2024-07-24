import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";
import PageContainer from "@/components/containers/PageContainer";
import Banner from "@/components/banner/Banner";
import {getPostBySlug} from "@/utils/postUtil";
import WriterInfo from "@/components/read/WriterInfo";
import ContentsContainer from "@/components/containers/ContentsContainer";
import BodyContainer from "@/components/containers/BodyContainer";
import Tag from "@/components/read/Tag";
import TagList from "@/components/read/TagList";
import Reaction from "@/components/read/Reaction";
import WriteComment from "@/components/read/WriteComment";
import ReadComment from "@/components/read/ReadComment";

interface Props {
    params: {
        slug: string
    }
};


const Post = (props: Props) => {
    const post = getPostBySlug(props.params.slug);

    return (
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <Banner title={post?.title || ""} writer={post?.writer || ""} info={{date: post?.date || "", avatar: ""}}/>
            <BodyContainer>
                <ContentsContainer>
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