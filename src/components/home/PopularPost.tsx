'use client';

import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";

import {IPostData} from "@/types/interfaces/post-interface";
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

    const result_allPostAPI = useQuery(
        ["result_searchAPI"],
        () => allPostAPI(),
        {
            enabled: false
        }
    )

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
                            <ColumnPostMotion posts={result_allPostAPI.data?.data}/> :
                            <ColumnPostSlider posts={result_allPostAPI.data?.data}/>
                    )
            }
        </>
    )
}

export default PopularPost;