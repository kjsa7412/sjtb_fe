'use client';

import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";

import {IPostData} from "@/types/interfaces/post-interface";
import axiosClient from "@/libs/axiosClient";
import {BREAKPOINT} from "@/contants/common";

import Label from "@/components/label/Label";
import ColumnPostMotion from "@/components/post/ColumnPostMotion";
import ColumnPostSlider from "@/components/post/ColumnPostSlider";


const allPostAPI = (): Promise<AxiosResponse<IPostData[]>> => {
    return axiosClient.get('/api/allPost');
};

const PopularPost = () => {
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
            <Label text={'인기 있는 글'}/>
            {
                result_allPostAPI.status !== 'success' ||
                result_allPostAPI.isFetching === true ?
                    <p>loading</p> : (
                        isLargeScreen ?
                            <ColumnPostMotion posts={result_allPostAPI.data?.data}/> :
                            <ColumnPostSlider posts={result_allPostAPI.data?.data}/>
                    )
            }
        </>
    )
}

export default PopularPost;