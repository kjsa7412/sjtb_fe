'use client';

import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";

import { EBlank } from "@/types/enums/common-enum";
import {IPostData} from "@/types/interfaces/post-interface";
import axiosClient from "@/libs/axiosClient";

import PageContainer from "@/components/containers/PageContainer";
import Blank from "@/components/blank/Blank";
import BodyContainer from "@/components/containers/BodyContainer";
import ContentsContainer from "@/components/containers/ContentsContainer";
import Title from "@/components/edit/Title";
import EditorSection from "@/components/edit/EditorSection";


interface Props {
    params: {
        slug: string
    }
}

const getPostBySlugAPI = (slug: string): Promise<AxiosResponse<IPostData>> => {
    return axiosClient.get('/api/getPostBySlug', {
        params: {slug: slug}
    });
};

const Edit = (props: Props) => {
    const [post, setPost] = useState<IPostData | undefined>();

    const result_getPostBySlugAPI = useQuery(
        ["result_getPostBySlugAPI"],
        () => getPostBySlugAPI(props.params.slug),
        {
            onSuccess: (data) => {
                setPost(data.data);
            }
        }
    );

    useEffect(() => {
        result_getPostBySlugAPI.refetch();
    }, [])

    return (
        <PageContainer>
            <Blank type={EBlank.Header} />
            {
                !!post &&
                <BodyContainer>
                    <ContentsContainer>
                        <Blank type={EBlank.Column} size={60}/>
                        <Title title={post.title}/>
                        <EditorSection post={post}/>
                        {/*임의로 비워둔 칸 -> 스크롤 비교용*/}
                        <Blank type={EBlank.Column} size={120}/>
                    </ContentsContainer>
                </BodyContainer>
            }
        </PageContainer>
    );
};

export default Edit;
