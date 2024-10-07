'use client'

import {AxiosResponse} from "axios";
import {useEffect} from "react";
import {useQuery} from "react-query";

import {IAPIResponse} from "@/types/interfaces/common-interface";
import axiosServer from "@/libs/axiosServer";
import {IParam_CmmtList, IResult_CmmtList} from "@/types/interfaces/post-interface";

import Reaction from "@/components/read/Reaction";
import WriteComment from "@/components/read/WriteComment";
import ReadComment from "@/components/read/ReadComment";
import styles from "@/components/read/WriterInfo.module.scss";

interface Props {
    slug: string;
}

async function serverAPI_CmmtList(param: IParam_CmmtList): Promise<AxiosResponse<IAPIResponse<IResult_CmmtList>>> {
    return await axiosServer.get('/public/get/cmmt/list', { params: param });
}

const ActivityBox = ({ slug }: Props) => {
    const result_CmmtList = useQuery(
        ["result_CmmtList", slug],
        () => serverAPI_CmmtList({ boadId: parseInt(slug) }),
        {
            enabled: false,
        }
    )

    useEffect(() => {
        result_CmmtList.refetch();
    }, [slug]);
    
    return (
        <>
            <Reaction/>
            <WriteComment/>
            {result_CmmtList.isError ? (
                <div className={styles.baseContainer}>
                    댓글 조회에 실패하였습니다.
                </div>
            ) : !Array.isArray(result_CmmtList.data?.data?.content) || result_CmmtList.data.data.content.length === 0 ? (
                <div className={styles.baseContainer}>
                    작성된 댓글이 존재하지 않습니다.
                </div>
            ) : <>
                {result_CmmtList.data?.data?.content?.map((comment: IResult_CmmtList) => (
                        <ReadComment
                            key={comment.cmtId}
                            comment={comment}
                        />
                    ))}
                </>
            }
        </>
    )
}

export default ActivityBox;