'use client';

import PageContainer from "@/components/containers/PageContainer";
import { EBlank } from "@/types/enums/common-enum";
import Blank from "@/components/blank/Blank";
import {usePathname, } from "next/navigation";
import {useEffect, useState} from "react";

const Edit = () => {
    const pathname = usePathname();
    const [slug, setSlug] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (pathname) {
            const parts = pathname.split('/');
            const slugValue = parts[2]; // "/board/[slug]/edit"에서 slug 부분 추출
            setSlug(slugValue);
        }
    }, [pathname]);

    useEffect(() => {
        if (slug) {
            // 서버에서 포스트 데이터 가져오기
        }
    }, [slug]);

    return (
        <PageContainer>
            <Blank type={EBlank.Header} />
            {`Edit: ${slug}`}
        </PageContainer>
    );
};

export default Edit;