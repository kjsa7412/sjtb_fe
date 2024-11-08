'use client'

import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";

import {EIcon} from "@/types/enums/common-enum";
import {
    IParam_UserInfo,
    IResult_UserInfo
} from "@/types/interfaces/user-interface";
import {IAPIResponse} from "@/types/interfaces/common-interface";
import axiosServer from "@/libs/axiosServer";
import {IMG} from "@/contants/common";

import Icons from "@/components/Icons";
import styles from './WriterInfo.module.scss';

interface Props {
    author: string;
}

async function serverAPI_userInfo(param: IParam_UserInfo): Promise<AxiosResponse<IAPIResponse<IResult_UserInfo>>> {
    return await axiosServer.get('/public/get/user/info', { params: param });
}

const WriterInfo = ({ author }: Props) => {
    const result_UserInfo = useQuery(
        ["result_UserInfo", author],
        () => serverAPI_userInfo({ userId: author }),
        {
            enabled: false,
        }
    )

    useEffect(() => {
        result_UserInfo.refetch();
    }, [author]);

    return (
        <div className={styles.baseContainer}>
            <div className={styles.avatarContainer}>
                {result_UserInfo.isLoading ? (
                        <Icons iconType={EIcon.Avatar} width={62} height={62} fill={'#C0C0C0'}/>
                    ) : result_UserInfo.isError ? (
                        <Icons iconType={EIcon.Avatar} width={62} height={62} fill={'#C0C0C0'}/>
                    ) :  result_UserInfo.data?.data.content.profilePicPath ? (
                        <Icons iconType={EIcon.Avatar} width={62} height={62} fill={IMG.DefaultPath + result_UserInfo.data?.data.content.profilePicPath}/>
                    ) :  <Icons iconType={EIcon.Avatar} width={62} height={62} fill={'#C0C0C0'}/>
                }
            </div>
            <div className={styles.infoContainer}>
                {result_UserInfo.isLoading ? (
                    <div></div>
                ) : result_UserInfo.isError ? (
                    <>
                        <div className={styles.username}>user</div>
                        <div className={styles.desc}>desc</div>
                    </>
                ) : (
                    <>
                        <div className={styles.username}>
                            {result_UserInfo.data?.data.content.userName ? result_UserInfo.data?.data.content.userName : 'user'}
                        </div>
                        <div className={styles.desc}>
                            {result_UserInfo.data?.data.content.profileCont ? result_UserInfo.data?.data.content.profileCont : 'desc'}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default WriterInfo;

