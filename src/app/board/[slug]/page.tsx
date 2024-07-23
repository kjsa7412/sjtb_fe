import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";
import PageContainer from "@/components/containers/PageContainer";
import Banner from "@/components/banner/Banner";
import {getPostBySlug} from "@/utils/postUtil";

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
            {props.params.slug}
        </PageContainer>
    )
}

export default Post;