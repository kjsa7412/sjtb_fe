'use client';

import {useQuery} from "react-query";
import {useEffect, useState} from "react";

import {EBlank} from "@/types/enums/common-enum";
import axiosClient from "@/libs/axiosClient";
import {BREAKPOINT} from "@/contants/common";

import Label from "@/components/label/Label";
import RowPost from "@/components/post/RowPost";
import Blank from "@/components/blank/Blank";
import RowPostMd from "@/components/post/RowPostMd";

const allPostAPI = () => {
    return axiosClient.get('/api/allPost');
};

const AllPost = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    const result_allPostAPI = useQuery(
        ["result_searchAPI"],
        () => allPostAPI(),
        {
            enabled: false
        }
    )

    const handleResize = () => {
        setIsLargeScreen(window.innerWidth > BREAKPOINT.MD);
    };

    useEffect(() => {
        handleResize();
        result_allPostAPI.refetch();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <>
            <Label text={'전체 게시글'}/>
            {
                result_allPostAPI.status !== 'success' ||
                result_allPostAPI.isFetching === true ?
                    <p>loading</p>
                    :
                    result_allPostAPI.data?.data?.map((value) =>
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