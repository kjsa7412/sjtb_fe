'use client'

import {AxiosResponse} from "axios";
import {useMutation} from "react-query";
import React, {useCallback, useState} from "react";
import {useRecoilState} from "recoil";

import {EButtonShape, EButtonSize, EButtonType, EModalMutationStatus, EPopup} from "@/types/enums/common-enum";
import {IAPIResponse, ILogin} from "@/types/interfaces/common-interface";
import axiosServer from "@/libs/axiosServer";
import {IParam_InsertCmmt, IResult_InsertCmmt} from "@/types/interfaces/post-interface";
import usePopup from "@/hooks/usePopup";
import {loginAtom} from "@/atoms/loginAtom";
import {IModalMutation} from "@/types/interfaces/modal-interface";
import {modalMutationAtom} from "@/atoms/modalMutationAtom";

import styles from './WriteComment.module.scss';
import TextButton from "@/components/button/TextButton";

interface Props {
    slug: string;
    resetCommentList: () => void;
}

async function serverAPI_InsertComment(param: IParam_InsertCmmt): Promise<AxiosResponse<IAPIResponse<IResult_InsertCmmt>>> {
    return await axiosServer.post('/private/post/cmmt/inst', param);
}

const WriteComment = ({slug, resetCommentList}: Props) => {
    const [cmmtValue, setCmmtValue] = useState('');
    const popupController = usePopup();
    const [, setRcModalMutation] = useRecoilState<IModalMutation>(modalMutationAtom);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCmmtValue(e.target.value);
    }, []);

    const resultMutation_insertCmmt = useMutation(
        () => serverAPI_InsertComment({boadId: parseInt(slug), cmt: cmmtValue}),
        {
            onSuccess: (data) => {
                if (data.data.isError) {
                    setRcModalMutation(() => ({
                        resultMutation: resultMutation_insertCmmt,
                        message: "댓글 등록",
                        desc: "전산 오류입니다. 담당자에게 연락해주세요.",
                        modalMutationStatus: EModalMutationStatus.Error
                    }));
                } else {
                    setRcModalMutation(() => ({
                        resultMutation: resultMutation_insertCmmt,
                        message: "댓글 등록",
                        desc: "댓글 등록",
                        modalMutationStatus: EModalMutationStatus.Success
                    }));

                    resetCommentList();
                    setCmmtValue('');
                }
            },
            onError: () => {
                setRcModalMutation(() => ({
                    resultMutation: resultMutation_insertCmmt,
                    message: "댓글 등록",
                    desc: "전산 오류입니다. 담당자에게 연락해주세요.",
                    modalMutationStatus: EModalMutationStatus.Error
                }));

            }
        }
    );

    const validation = () => {
        if (!cmmtValue) {
            popupController.openPopup(EPopup.Notify, {contents: {title: "댓글 작성", desc: "댓글을 작성해주세요."}});
            return;
        }

        setRcModalMutation(() => ({
            resultMutation: resultMutation_insertCmmt,
            message: "댓글 등록",
            desc: "댓글 등록",
            modalMutationStatus: EModalMutationStatus.Confirm
        }));
    };

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
                        onClick: validation,
                        label: "등록",
                        isLoading: resultMutation_insertCmmt.isLoading
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