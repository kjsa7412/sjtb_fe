'use client';

import {FormProvider, useForm} from 'react-hook-form';
import {useEffect} from "react";

import {EButtonShape, EButtonSize, EButtonType, EInputShape, EPopup} from "@/types/enums/common-enum";
import usePopup from "@/hooks/usePopup";

import styles from './SignUpPopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import Overlay from "@/components/overlay/Overlay";
import Input from "@/components/input/Input";

const SignUpPopup = () => {
    const popupController = usePopup();

    const closePopup = () => popupController.closePopup(EPopup.SignUp);

    const openPopup = () => {
        popupController.closePopup(EPopup.SignUp);
        popupController.openPopup(EPopup.SignIn);
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
    },[popupController.isPopupOpen(EPopup.SignUp)]);

    return (
        <>
            {
                popupController.isPopupOpen(EPopup.SignUp) &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <FormProvider {...methods}>
                            <form className={styles.body} onSubmit={methods.handleSubmit(handleFunction)} autoComplete="off">
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



