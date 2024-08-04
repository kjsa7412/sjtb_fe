import {EBannerType, EBlank} from "@/types/enums/common-enum";

import PageContainer from "@/components/containers/PageContainer";
import Blank from "@/components/blank/Blank";
import Banner from "@/components/banner/Banner";
import ContentsContainer from "@/components/containers/ContentsContainer";
import BodyContainer from "@/components/containers/BodyContainer";
import SearchPost from "@/components/search/SearchPost";
import FooterBase from "@/components/footer/FooterBase";

interface Props {
    params: {
        keyword: string
    }
}

const Search = (props: Props) => {
    return(
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <Banner type={EBannerType.Search} title={"Result for " + props.params.keyword}/>
            <BodyContainer>
                <ContentsContainer>
                    <SearchPost keyword={props.params.keyword}/>
                </ContentsContainer>
            </BodyContainer>
            <FooterBase/>
        </PageContainer>
    )
}

export default Search;