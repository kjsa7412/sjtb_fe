'use client';

import {FormProvider, useForm} from 'react-hook-form';
import {useEffect} from "react";

import {EButtonShape, EButtonSize, EButtonType, EIcon, EInputShape, EPopup} from "@/types/enums/common-enum";
import usePopup from "@/hooks/usePopup";

import styles from './EditProfilePopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import Overlay from "@/components/overlay/Overlay";
import Icons from "@/components/Icons";
import Input from "@/components/input/Input";

const EditProfilePopup = () => {
    const popupController = usePopup();
    const closePopup = () => popupController.closePopup(EPopup.EditProfile);

    const methods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: "",
            desc: ""
        },
    });

    const handleFunction = () => {
        const data = methods.getValues();

        if (!data.name) {
            popupController.openPopup(EPopup.Notify, {contents: {title: "프로필 등록 실패", desc: "사용자이름을 입력해주세요."}});
            return;
        }

        closePopup();
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
                            <Input width="100%" formDataName="name" placeholder="Name" shape={EInputShape.Square} textAlign="left"/>
                            <div className={styles.label}>
                                Description
                            </div>
                            <Input width="100%" formDataName="desc" placeholder="Description" shape={EInputShape.Square} textAlign="left"/>
                        </form>
                        <div className={styles.button}>
                            <TextButton controller={{onClick: closePopup, label: "Save"}} styles={{
                                size: EButtonSize.Medium,
                                shape: EButtonShape.Round,
                                type: EButtonType.Black
                            }}/>
                        </div>
                        </FormProvider>
                    </div>
                </Overlay>
            }
        </>
    )
}

export default EditProfilePopup;



