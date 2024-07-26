import PageContainer from "@/components/containers/PageContainer";
import Blank from "@/components/blank/Blank";
import {EBannerType, EBlank} from "@/types/enums/common-enum";
import Banner from "@/components/banner/Banner";
import ContentsContainer from "@/components/containers/ContentsContainer";
import BodyContainer from "@/components/containers/BodyContainer";
import SearchPost from "@/components/search/SearchPost";

interface Props {
    params: {
        keyword: string
    }
};

const Search = (props: Props) => {
    return(
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <Banner type={EBannerType.Search} title={"Result for " + props.params.keyword}/>
            <BodyContainer>
                <ContentsContainer>
                    <SearchPost/>
                </ContentsContainer>
            </BodyContainer>
        </PageContainer>
    )
}

export default Search;