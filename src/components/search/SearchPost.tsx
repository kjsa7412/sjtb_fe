'use client';

import Label from "@/components/label/Label";
import {getAllPosts} from "@/utils/postUtil";
import RowPost from "@/components/post/RowPost";
import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";
import axiosInstance from "@/libs/axios";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";

const searchAPI = (searchTerm: string) => {
    return axiosInstance.get('/api/search', {
        params: {q: searchTerm}
    });
};

const SearchPost = ({keyword}: { keyword: string }) => {
    const allPosts = [];
    const [data, setData] = useState([]);

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
        return () => {
        }
    }, [keyword])

    return (
        <>
            <Label text={'검색 결과'}/>
            {
                allPosts?.map((value, index, array) =>
                    <>
                        <RowPost key={value.writer + value.slug + value.date} {...value}/>
                        <Blank type={EBlank.Column} size={60}/>
                    </>
                )
            }
            {
                data.map((value) => {
                    return (
                        <p>{value.slug}</p>
                    )
                })
            }
        </>
    )
}

export default SearchPost;