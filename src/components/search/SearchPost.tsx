'use client';

import {useEffect, useState} from "react";
import {useQuery} from "react-query";

import {EBlank} from "@/types/enums/common-enum";
import axiosInstance from "@/libs/axios";
import {IPost, IPostData} from "@/types/interfaces/post-interface";

import Label from "@/components/label/Label";
import RowPost from "@/components/post/RowPost";
import Blank from "@/components/blank/Blank";

const searchAPI = (searchTerm: string) => {
    return axiosInstance.get('/api/search', {
        params: {q: searchTerm}
    });
};

const SearchPost = ({keyword}: { keyword: string }) => {
    const allPosts: IPostData[] = [];
    const [data, setData] = useState<{slug: string}[]>();

    const result_searchAPI = useQuery(
        ["result_searchAPI"],
        () => searchAPI(keyword),
        {
            enabled: false,
            onSuccess: (value) => {
                setData(value.data);
            }
        }
    )

    useEffect(() => {
        result_searchAPI.refetch();
    }, [keyword])

    return (
        <>
            <Label text={'검색 결과'}/>
            {
                allPosts?.map((value, index, array) =>
                    <>
                        <RowPost key={value.slug + value.author + value.dateModified} postData={value}/>
                        <Blank type={EBlank.Column} size={60}/>
                    </>
                )
            }
            {
                data?.map((value, index) => {
                    return (
                        <p key={index}>{value.slug}</p>
                    )
                })
            }
        </>
    )
}

export default SearchPost;