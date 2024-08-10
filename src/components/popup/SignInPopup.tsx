'use client';

import {useRecoilState, useResetRecoilState} from "recoil";
import {FormProvider, useForm} from 'react-hook-form';
import {useEffect} from "react";
import {useMutation, useQuery} from "react-query";

import {EBlank, EButtonShape, EButtonSize, EButtonType, EInputShape, EPopup} from "@/types/enums/common-enum";
import {ILogin, IUser} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import {userAtom} from "@/atoms/userAtom";
import usePopup from "@/hooks/usePopup";
import {IParam_UserJoin} from "@/types/interfaces/user-interface";
import axiosClient from "@/libs/axiosClient";
import {isValidEmail} from "@/utils/commonUtil";
import {EQuerykey} from "@/types/enums/querykey-enum";

import Input from "@/components/input/Input";
import Overlay from "@/components/overlay/Overlay";
import TextButton from "@/components/button/TextButton";
import CloseButton from "@/components/button/CloseButton";
import styles from './SignInPopup.module.scss';
import Blank from "@/components/blank/Blank";

const clientAPI_signIn = (param: IParam_UserJoin) => {
    return axiosClient.post('/api/signIn', param);
}

const SignInPopup = () => {
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);
    const rcResetLogin = useResetRecoilState(loginAtom);
    const rcResetUser = useResetRecoilState(userAtom);

    const popupController = usePopup();

    const closePopup = () => popupController.closePopup(EPopup.SignIn);

    const openPopup = () => {
        popupController.closePopup(EPopup.SignIn);
        popupController.openPopup(EPopup.SignUp);
    }

    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            id: "",
            pw: ""
        },
    });

    const signIn = useQuery(
        [EQuerykey.SIGNIN],
        () => {
            const data = methods.getValues();
            return clientAPI_signIn({userId: data.id, userPw: data.pw});
        },
        {
            enabled: false,
            onSuccess: (data) => {
                if (data?.data?.isError) {
                    rcResetLogin();
                    rcResetUser();
                    popupController.openPopup(EPopup.Notify, {
                        contents: {
                            title: "로그인 실패",
                            desc: `${data.data.errorMsg}`
                        }
                    });
                } else {
                    const {loginToken, ...content} = data.data.content;
                    popupController.closeAll();
                    setRcLogin({isLogin: true});
                    setRcUser({...content});
                    popupController.openPopup(EPopup.Notify, {contents: {title: "로그인 성공", desc: "로그인 되었습니다."}});
                }
            },
            onError: (error) => {
                rcResetLogin();
                rcResetUser();
                popupController.openPopup(EPopup.Notify, {contents: {title: "로그인 실패", desc: `${error}`}});
            }
        }
    );

    // validation
    const handleFunction = () => {
        const data = methods.getValues();

        if (!data.id) {
            popupController.openPopup(EPopup.Notify, {contents: {title: "로그인 실패", desc: "이메일을 입력해주세요."}});
            return;
        }

        if (!data.pw) {
            popupController.openPopup(EPopup.Notify, {contents: {title: "로그인 실패", desc: "비밀번호를 입력해주세요."}});
            return;
        }

        if (!isValidEmail(data.id)) {
            popupController.openPopup(EPopup.Notify, {contents: {title: "로그인 실패", desc: "올바른 이메일 형식이 아닙니다."}});
            return;
        }

        signIn.refetch();
    };

    useEffect(() => {
        return () => {
            methods.reset();
        };
    }, [popupController.isPopupOpen(EPopup.SignIn)]);

    return (
        <>
            {
                popupController.isPopupOpen(EPopup.SignIn) &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <FormProvider {...methods}>
                            <form className={styles.body} onSubmit={methods.handleSubmit(handleFunction)}
                                  autoComplete="off">
                                <div className={styles.body_title}>
                                    Welecome Back
                                </div>
                                <div className={styles.body_button}>
                                    <Input width="300" formDataName="id" placeholder="ID" shape={EInputShape.Round}/>
                                </div>
                                <div className={styles.body_button}>
                                    <Input width="300" formDataName="pw" placeholder="PW" shape={EInputShape.Round}/>
                                </div>
                                <div className={styles.body_button}>
                                    <TextButton
                                        controller={{
                                            isSubmit: true,
                                            label: "Sign In",
                                            isLoading: (signIn.status !== 'success' && signIn.status !== 'idle') || signIn.isFetching
                                        }}
                                        styles={{
                                            size: EButtonSize.Large,
                                            shape: EButtonShape.Round,
                                            type: EButtonType.Black
                                        }}/>
                                </div>
                                <div className={styles.body_button}>
                                    <TextButton
                                        controller={{
                                            onClick: openPopup,
                                            label: "Sign Up"
                                        }}
                                        styles={{
                                            size: EButtonSize.Large,
                                            shape: EButtonShape.Round,
                                            type: EButtonType.None
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

export default SignInPopup;



