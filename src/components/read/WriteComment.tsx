'use client'

import {AxiosResponse} from "axios";
import {useMutation} from "react-query";
import React, {useCallback, useState} from "react";
import {useRecoilState} from "recoil";

import {EButtonShape, EButtonSize, EButtonType, EPopup} from "@/types/enums/common-enum";
import {IAPIResponse, ILogin} from "@/types/interfaces/common-interface";
import axiosServer from "@/libs/axiosServer";
import {IParam_InsertCmmt, IResult_InsertCmmt} from "@/types/interfaces/post-interface";
import usePopup from "@/hooks/usePopup";
import {loginAtom} from "@/atoms/loginAtom";

import styles from './WriteComment.module.scss';
import TextButton from "@/components/button/TextButton";

interface Props {
    slug : string;
    resetCommentList: (comment: any) => void;
}

async function serverAPI_InsertComment(param: IParam_InsertCmmt): Promise<AxiosResponse<IAPIResponse<IResult_InsertCmmt>>> {
    return await axiosServer.post('/private/post/cmmt/inst', param);
}

const WriteComment = ({ slug, resetCommentList }: Props) => {
    const popupController = usePopup();
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    const [cmmtValue, setCmmtValue] = useState('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCmmtValue(e.target.value);
    }, []);

    const insertCmmt = useMutation(
        () => {
            return serverAPI_InsertComment({boadId: parseInt(slug), cmt: cmmtValue});
        },
        {
            onSuccess: (data) => {
                if (data.data.isError) {
                    popupController.openPopup(EPopup.Notify, {contents: {title: "댓글 작성 실패", desc: "댓글 작성을 실패하였습니다."}});
                } else {
                    // 리턴받은 댓글 목록 이용하여 mutation 초기화
                    resetCommentList(data.data.content);
                    setCmmtValue('');
                }
            },
            onError: () => {
                popupController.openPopup(EPopup.Notify, {
                    contents: {
                        title: "댓글 작성 실패",
                        desc: "전산 오류입니다. 담당자에게 연락해주세요."
                    }
                });
            }
        }
    );

    const submitCmmt = useCallback(() => {
        if (!rcLogin.isLogin) {
            popupController.openPopup(EPopup.SignIn);
            return;
        }

        if (!cmmtValue) {
            popupController.openPopup(EPopup.Notify, {contents: {title: "댓글 작성 실패", desc: "댓글을 입력해주세요."}});
            return;
        }

        insertCmmt.mutate();
    }, [rcLogin.isLogin, cmmtValue, popupController, insertCmmt]);

    return (
        <div className={styles.baseContainer}>
             <textarea
                 className={styles.textBox}
                 placeholder={'댓글을 입력해주세요'}
                 value={cmmtValue}
                 onChange={handleChange}
             />
            <div className={styles.buttonContainer}>
                <TextButton
                    controller={{
                        onClick: submitCmmt,
                        label: "등록",
                        isLoading: (insertCmmt.status !== 'success' && insertCmmt.status !== 'idle')
                    }}
                    styles={{
                    size: EButtonSize.Small,
                    shape: EButtonShape.Round,
                    type: EButtonType.Black
                }}/>
            </div>
        </div>
    )
}

export default WriteComment;