'use client';

import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";

import {IParam_CreatePost, IPostData} from "@/types/interfaces/post-interface";
import axiosClient from "@/libs/axiosClient";
import {BREAKPOINT} from "@/contants/common";
import useIsLargeScreen from "@/hooks/useIsLargeScreen";
import useBreakPoint from "@/hooks/useBreakPoint";
import {EBreakPoint} from "@/types/enums/common-enum";

import Label from "@/components/label/Label";
import ColumnPostMotion from "@/components/post/ColumnPostMotion";
import ColumnPostSlider from "@/components/post/ColumnPostSlider";


const allPostAPI = (): Promise<AxiosResponse<IPostData[]>> => {
    return axiosClient.get('/api/allPost');
};

const PopularPost = () => {
    const breakPoint = useBreakPoint();
    const [lastThreePosts, setLastThreePosts] = useState<IPostData[]>([]); // 상태 선언

    const result_allPostAPI = useQuery(
        ["result_searchAPI"],
        () => allPostAPI(),
        {
            enabled: false,
            onSuccess: (data) => {
                // API 요청이 성공하면 마지막 3개의 포스트로 상태 업데이트
                // todo: 인기 게시물 api 생성하면 이거도 수정 필요
                setLastThreePosts(data.data.slice(-3));
            }
        }
    );
    useEffect(() => {
        result_allPostAPI.refetch();
    }, [])

    return (
        <>
            <Label text={'인기 있는 글'}/>
            {
                result_allPostAPI.status !== 'success' ||
                result_allPostAPI.isFetching === true ?
                    <div style={{width: '100%', height: '388px', borderRadius: '10px', background: 'lightgray'}}/> :
                    (
                        breakPoint === EBreakPoint.LG ?
                            <ColumnPostMotion posts={lastThreePosts}/> :
                            <ColumnPostSlider posts={lastThreePosts}/>
                    )
            }
        </>
    )
}

export default PopularPost;