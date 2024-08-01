'use client';

import {useRecoilState} from "recoil";
import {FormProvider, useForm} from 'react-hook-form';
import {useEffect} from "react";

import {EButtonShape, EButtonSize, EButtonType, EInputShape, EPopup} from "@/types/enums/common-enum";
import {ILogin, IUser} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import {userAtom} from "@/atoms/userAtom";
import usePopup from "@/hooks/usePopup";

import Input from "@/components/input/Input";
import Overlay from "@/components/overlay/Overlay";
import TextButton from "@/components/button/TextButton";
import CloseButton from "@/components/button/CloseButton";
import styles from './SignInPopup.module.scss';

const SignInPopup = () => {
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);
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

    // validation
    const handleFunction = () => {
        const data = methods.getValues();

        if (!data.id) {
            popupController.openPopup(EPopup.Notify, {contents: {title: "로그인 실패", desc: "유저아이디 정보를 확인해주세요."}});
            return;
        }

        if (!data.pw) {
            popupController.openPopup(EPopup.Notify, {contents: {title: "로그인 실패", desc: "비민번호를 확인해주세요."}});
            return;
        }

        setRcUser({userId: data.id, userName: data.id, profileCont: '설명'})
        setRcLogin({isLogin: true});

        closePopup();
    };

    useEffect( () => {
        return () => {
            methods.reset();
        };
    },[popupController.isPopupOpen(EPopup.SignIn)]);

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
                            <form className={styles.body} onSubmit={methods.handleSubmit(handleFunction)} autoComplete="off">
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
                                    <TextButton controller={{isSubmit: true, label: "Sign In"}} styles={{
                                        size: EButtonSize.Large,
                                        shape: EButtonShape.Round,
                                        type: EButtonType.Black
                                    }}/>
                                </div>
                                <div className={styles.body_button}>
                                    <TextButton controller={{onClick: openPopup, label: "Sign Up"}} styles={{
                                        size: EButtonSize.Large,
                                        shape: EButtonShape.Round,
                                        type: EButtonType.None
                                    }}/>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </Overlay>
            }
        </>
    )
}

export default SignInPopup;



