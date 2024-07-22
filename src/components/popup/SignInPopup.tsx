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
import {notifyPopupAtom} from "@/atoms/notifyPopupAtom";
import Input from "@/components/input/Input";
import {useEffect} from "react";


const SignInPopup = () => {
    const [rcSignInPopupAtom, setRcSignInPopupAtom] = useRecoilState<IOptionPopup>(signInPopupAtom);

    const closePopup = () => {
        setRcSignInPopupAtom(false);
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
                            <form className={styles.body} onSubmit={methods.handleSubmit(handleFunction)}>
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
                                    <TextButton controller={{isSubmit:true, label: "Sign In"}} styles={{
                                        size: EButtonSize.Large,
                                        shape: EButtonShape.Round,
                                        type: EButtonType.Black
                                    }}/>
                                </div>
                                <div className={styles.body_button}>
                                    <TextButton controller={{onClick: closePopup, label: "Sign Up"}} styles={{
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



