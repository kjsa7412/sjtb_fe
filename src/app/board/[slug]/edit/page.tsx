import { EBlank } from "@/types/enums/common-enum";
import {IPostData} from "@/types/interfaces/post-interface";
import {getPostBySlug} from "@/utils/postUtil";

import PageContainer from "@/components/containers/PageContainer";
import Blank from "@/components/blank/Blank";
import BodyContainer from "@/components/containers/BodyContainer";
import ContentsContainer from "@/components/containers/ContentsContainer";
import Title from "@/components/edit/Title";
import EditorSection from "@/components/edit/EditorSection";
import FooterBase from "@/components/footer/FooterBase";

interface Props {
    params: {
        slug: string
    }
}

const Edit = (props: Props) => {
    const post: IPostData | undefined = getPostBySlug(props.params.slug);

    return (
        <PageContainer>
            <Blank type={EBlank.Header} />
            <BodyContainer>
                <ContentsContainer>
                    <Blank type={EBlank.Column} size={60}/>
                    <Title title={post?.title}/>
                    <EditorSection post={post}/>
                    {/*임의로 비워둔 칸 -> 스크롤 비교용*/}
                    <Blank type={EBlank.Column} size={120}/>
                </ContentsContainer>
            </BodyContainer>
            <FooterBase/>
        </PageContainer>
    );
};

export default Edit;
