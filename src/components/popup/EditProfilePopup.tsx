'use client';

import {FormProvider, useForm} from 'react-hook-form';
import {useEffect} from "react";
import {useMutation} from "react-query";
import {useRecoilState} from "recoil";
import {AxiosResponse} from "axios";

import {EBlank, EButtonShape, EButtonSize, EButtonType, EIcon, EInputShape, EPopup} from "@/types/enums/common-enum";
import usePopup from "@/hooks/usePopup";
import {IParam_UserEdit, IResult_UserEdit} from "@/types/interfaces/user-interface";
import {IAPIResponse, IUser} from "@/types/interfaces/common-interface";
import {userAtom} from "@/atoms/userAtom";
import axiosServer from "@/libs/axiosServer";

import styles from './EditProfilePopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import Overlay from "@/components/overlay/Overlay";
import Icons from "@/components/Icons";
import Input from "@/components/input/Input";
import Blank from "@/components/blank/Blank";

async function serverAPI_signEdit(param: IParam_UserEdit): Promise<AxiosResponse<IAPIResponse<IUser>>> {
    return await axiosServer.post('/private/post/user/signEdit', param);
}

const EditProfilePopup = () => {
    const popupController = usePopup();
    const closePopup = () => popupController.closePopup(EPopup.EditProfile);
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);

    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: rcUser?.userName || "",
            desc: rcUser?.profileCont || ""
        }
    });

    // rcUser가 변경될 때마다 폼 필드 값을 업데이트
    
    /// 이 부분도 수정이 필요
    /// 체크가 잘 안되는거 같음
    //todo : useEffect 수정바람
    
    useEffect(() => {
        methods.setValue('name', rcUser?.userName || "");
        methods.setValue('desc', rcUser?.profileCont || "");
    }, [rcUser, methods]);

    const signEdit = useMutation(
        () => {
            const data = methods.getValues();
            return serverAPI_signEdit({userName: data.name, profileCont: data.desc});
        },
        {
            onSuccess: (data) => {
                if (data.data.isError) {
                    popupController.openPopup(EPopup.Notify, {
                        contents: {
                            title: "회원정보 변경 실패",
                            desc: `${data.data.errorMsg}`
                        }
                    });
                    signEdit.reset();
                } else {
                    closePopup();
                    const {...content} = data.data.content;
                    setRcUser({...content});
                    popupController.openPopup(EPopup.Notify, {contents: {title: "회원정보 변경 성공", desc: "회원정보를 변경 하였습니다."}});
                }
            },
            onError: () => {
                signEdit.reset();
                popupController.openPopup(EPopup.Notify, {contents: {title: "회원정보 변경 실패", desc: "전산 오류입니다. 담당자에게 연락해주세요."}});
            }
        }
    );

    const handleFunction = () => {
        const data = methods.getValues();

        if (!data.name) {
            popupController.openPopup(EPopup.Notify, {contents: {title: "회원정보 수정 실패", desc: "사용자 이름을 입력해주세요."}});
            return;
        }

        signEdit.mutate();
    };

    useEffect( () => {
        return () => {
            methods.reset();
        };
    },[popupController.isPopupOpen(EPopup.EditProfile)]);

    return (
        <>
            {
                popupController.isPopupOpen(EPopup.EditProfile) &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <div className={styles.title}>
                            Profile
                        </div>
                        <FormProvider {...methods}>
                            <form className={styles.body} onSubmit={methods.handleSubmit(handleFunction)} autoComplete="off">
                                <div className={styles.label} style={{marginTop: '0px'}}>
                                    Photo
                                </div>
                                <div className={styles.profileContainer}>
                                    <div className={styles.avatarContainer}>
                                        <Icons iconType={EIcon.Avatar} width={80} height={80} fill={'#C0C0C0'}/>
                                    </div>
                                    <div className={styles.infoContainer}>
                                        <p className={styles.delete} style={{marginBottom: '8px'}}>Delete</p>
                                        <p className={styles.desc}>
                                            Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.label}>
                                    Name *
                                </div>
                                <Input width="100%" formDataName="name" placeholder="Name" shape={EInputShape.Square} textAlign="left" maxLength={10}/>
                                <div className={styles.label}>
                                    Description
                                </div>
                                <Input width="100%" formDataName="desc" placeholder="Description" shape={EInputShape.Square} textAlign="left" maxLength={250}/>
                                <div className={styles.button}>
                                    <TextButton
                                        controller={{
                                            isSubmit: true,
                                            label: "Save",
                                            isLoading: (signEdit.status !== 'success' && signEdit.status !== 'idle')
                                        }}
                                        styles={{
                                            size: EButtonSize.Medium,
                                            shape: EButtonShape.Round,
                                            type: EButtonType.Black
                                    }}/>
                                </div>
                            </form>
                        </FormProvider>
                        <Blank type={EBlank.Column} size={40}/>
                    </div>
                </Overlay>
            }
        </>
    )
}

export default EditProfilePopup;



