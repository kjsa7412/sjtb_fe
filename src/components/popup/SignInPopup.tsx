'use client';

import styles from './SignInPopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import {EButtonShape, EButtonSize, EButtonType, EInputShape} from "@/types/enums/common-enum";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {useRecoilState} from "recoil";
import Overlay from "@/components/overlay/Overlay";
import {signInPopupAtom} from "@/atoms/signInPopupAtom";
import {FormProvider, useForm} from 'react-hook-form';
import Input from "@/components/input/Input";
import {useEffect} from "react";
import {signUpPopupAtom} from "@/atoms/signUpPopupAtom";
import {ILogin, IUser} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import {userAtom} from "@/atoms/userAtom";
import {notifyPopupAtom} from "@/atoms/notifyPopupAtom";


const SignInPopup = () => {
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);
    const [rcSignInPopupAtom, setRcSignInPopupAtom] = useRecoilState<IOptionPopup>(signInPopupAtom);
    const [rcSignUpPopupAtom, setRcSignUpPopupAtom] = useRecoilState<IOptionPopup>(signUpPopupAtom);
    const [rcNotifyPopupAtom, setNotifyPopupAtom] = useRecoilState<IOptionPopup>(notifyPopupAtom);

    const closePopup = () => {
        setRcSignInPopupAtom(false);
    }

    const openPopup = () => {
        setRcSignInPopupAtom({isOpen: false});
        setRcSignUpPopupAtom({isOpen: true});
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
            setNotifyPopupAtom({isOpen: true, title: "로그인 실패", desc: "유저아이디 정보를 확인해주세요."});
            return;
        }

        if (!data.pw) {
            setNotifyPopupAtom({isOpen: true, title: "로그인 실패", desc: "비민번호를 확인해주세요."});
            return;
        }

        setRcLogin({isLogin: true});

        closePopup();
    };

    useEffect( () => {
        return () => {
            methods.reset();
        };
    },[rcSignInPopupAtom.isOpen]);

    return (
        <>
            {
                rcSignInPopupAtom.isOpen &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <FormProvider {...methods}>
                            <form className={styles.body} onSubmit={methods.handleSubmit(handleFunction)} autocomplete="off">
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



