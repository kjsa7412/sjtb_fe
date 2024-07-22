'use client';

import styles from './SignUpPopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import {EButtonShape, EButtonSize, EButtonType, EInputShape} from "@/types/enums/common-enum";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {useRecoilState} from "recoil";
import Overlay from "@/components/overlay/Overlay";
import {signUpPopupAtom} from "@/atoms/signUpPopupAtom";
import {FormProvider, useForm} from 'react-hook-form';
import Input from "@/components/input/Input";
import {useEffect} from "react";
import {signInPopupAtom} from "@/atoms/signInPopupAtom";

const SignUpPopup = () => {
    const [rcSignUpPopupAtom, setRcSignUpPopupAtom] = useRecoilState<IOptionPopup>(signUpPopupAtom);
    const [rcSignInPopupAtom, setRcSignInPopupAtom] = useRecoilState<IOptionPopup>(signInPopupAtom);

    const closePopup = () => {
        setRcSignUpPopupAtom(false);
    }

    const openPopup = () => {
        setRcSignUpPopupAtom(false);
        setRcSignInPopupAtom((prev) => ({
            ...prev,
            isOpen: !prev.isOpen
        }));
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
            return;
        }

        if (!data.pw) {
            return;
        }

        closePopup();
    };

    useEffect( () => {
        return () => {
            methods.reset();
        };
    },[rcSignUpPopupAtom.isOpen]);

    return (
        <>
            {
                rcSignUpPopupAtom.isOpen &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <FormProvider {...methods}>
                            <form className={styles.body} onSubmit={methods.handleSubmit(handleFunction)}>
                                <div className={styles.body_title}>
                                    Join Us
                                </div>
                                <div className={styles.body_button}>
                                    <Input width="300" formDataName="id" placeholder="ID" shape={EInputShape.Square}/>
                                </div>
                                <div className={styles.body_button}>
                                    <Input width="300" formDataName="pw" placeholder="PW" shape={EInputShape.Square}/>
                                </div>
                                <div className={styles.body_button}>
                                    <TextButton controller={{isSubmit: true, label: "Sign Up"}} styles={{
                                        size: EButtonSize.Large,
                                        shape: EButtonShape.Square,
                                        type: EButtonType.Black
                                    }}/>
                                </div>
                                <div className={styles.body_button}>
                                    <TextButton controller={{onClick: openPopup, label: "Sign In"}} styles={{
                                        size: EButtonSize.Large,
                                        shape: EButtonShape.Square,
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

export default SignUpPopup;



