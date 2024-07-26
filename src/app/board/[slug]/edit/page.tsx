'use client';

import PageContainer from "@/components/containers/PageContainer";
import { EBlank } from "@/types/enums/common-enum";
import Blank from "@/components/blank/Blank";
import { IPostAtom, postAtom } from "@/atoms/postAtom";
import { useRecoilState } from "recoil";

const Edit = () => {
    const [rcPost, setRcPost] = useRecoilState<IPostAtom>(postAtom);

    return (
        <PageContainer>
            <Blank type={EBlank.Header} />
            {`Edit: ${rcPost.slug}`}
        </PageContainer>
    );
};

export default Edit;