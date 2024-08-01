import {EBlank} from "@/types/enums/common-enum";

import PageContainer from "@/components/containers/PageContainer";
import Blank from "@/components/blank/Blank";

const New = () => {
    return(
        <PageContainer>
            <Blank type={EBlank.Header}/>
            New
        </PageContainer>
    )
}

export default New;