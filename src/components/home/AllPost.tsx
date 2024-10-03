'use client';

import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";

import {EBlank} from "@/types/enums/common-enum";
import axiosClient from "@/libs/axiosClient";
import {BREAKPOINT} from "@/contants/common";
import {IAPIResponse} from "@/types/interfaces/common-interface";
import {IPostData} from "@/types/interfaces/post-interface";
import useIsLargeScreen from "@/hooks/useIsLargeScreen";

import Label from "@/components/label/Label";
import RowPost from "@/components/post/RowPost";
import Blank from "@/components/blank/Blank";
import RowPostMd from "@/components/post/RowPostMd";

const allPostAPI = ():Promise<AxiosResponse<IPostData[]>>  => {
    return axiosClient.get('/api/allPost');
};

const AllPost = () => {
    const isLargeScreen = useIsLargeScreen();

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
            <Label text={'전체 게시글'}/>
            {
                result_allPostAPI.status !== 'success' ||
                result_allPostAPI.isFetching === true ?
                    <p>loading</p>
                    :
                    result_allPostAPI.data?.data?.map((value: IPostData) =>
                        <>
                            {
                                isLargeScreen ?
                                    <RowPost key={value.slug + value.author + value.datePublished} postData={value}/> :
                                    <RowPostMd key={value.slug + value.author + value.datePublished} postData={value}/>
                            }
                            <Blank type={EBlank.Column} size={60}/>
                        </>
                    )
            }
        </>
    )
}

export default AllPost;