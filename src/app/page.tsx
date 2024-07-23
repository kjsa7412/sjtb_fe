import PageContainer from "@/components/containers/PageContainer";
import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";
import Banner from "@/components/banner/Banner";
import FooterBase from "@/components/footer/FooterBase";
import ColumnPost from "@/components/post/ColumnPost";
import RowPost from "@/components/post/RowPost";
import BodyContainer from "@/components/containers/BodyContainer";
import ContentsContainer from "@/components/containers/ContentsContainer";
import Label from "@/components/label/Label";
import RowContainer from "@/components/containers/RowContainer";
import {getAllPosts} from "@/utils/postUtil";

const Index = () => {
    const allPosts = getAllPosts();

    return (
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <Banner title={"Welcome"}/>
            <BodyContainer>
                <ContentsContainer>
                    <Label text={'인기 있는 글'}/>
                    <RowContainer>
                        {
                            allPosts.map((value, index, array) =>
                                <ColumnPost slug={value.slug} url={value.coverImage} title={value.title} date={value.date} writer={value.writer}/>
                            )
                        }
                    </RowContainer>
                    <Blank type={EBlank.Column} size={30}/>
                    <Label text={'전체 게시글'}/>
                    {
                        allPosts.map((value, index, array) =>
                            <>
                                <RowPost slug={value.slug} url={value.coverImage} title={value.title} date={value.date} writer={value.writer} desc={value.excerpt}/>
                                <Blank type={EBlank.Column} size={60}/>
                            </>
                        )
                    }
                </ContentsContainer>
            </BodyContainer>
            <FooterBase/>
        </PageContainer>
    );
}

export default Index;