'use client';

import styles from "./ProfileOptionPopup.module.scss";
import {useRecoilState, useResetRecoilState} from "recoil";
import {useEffect, useRef, useState} from "react";
import {EElementId, EPopup} from "@/types/enums/common-enum";
import {userAtom} from "@/atoms/userAtom";
import {loginAtom} from "@/atoms/loginAtom";
import usePopup from "@/hooks/usePopup";

const ProfileOptionPopup = () => {
    const targetRef = useRef(null);
    const popupController = usePopup();
    const resetRcUserAtom = useResetRecoilState(userAtom);
    const resetRcLoginAtom = useResetRecoilState(loginAtom);

    const signOut = () => {
        resetRcUserAtom();
        resetRcLoginAtom();
        popupController.closePopup(EPopup.ProfileOption);
    }

    const editProfile = () => {
        popupController.closePopup(EPopup.ProfileOption);
        popupController.openPopup(EPopup.EditProfile);
    }

    useEffect(() => {
        const updatePosition = () => {
            const targetElement = document.getElementById(EElementId.HeaderProfile);
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const thisRect = targetRef.current.getBoundingClientRect();
                popupController.openPopup(EPopup.ProfileOption, {
                    position: {
                        top: rect.bottom - 10,
                        left: rect.left - thisRect.width + 30
                    }
                });
            }
        };

        if (popupController.isPopupOpen(EPopup.ProfileOption)) {
            window.addEventListener('resize', updatePosition);
            updatePosition();
        }

        return () => {
            window.removeEventListener('resize', updatePosition);
        };
    }, [popupController.isPopupOpen(EPopup.ProfileOption)]);

    return (
        <>
            {popupController.isPopupOpen(EPopup.ProfileOption) &&
                <div ref={targetRef} className={styles.baseContainer} style={{
                    top: popupController.getPopupData(EPopup.ProfileOption).position.top,
                    left: popupController.getPopupData(EPopup.ProfileOption).position.left
                }}>
                    <div className={styles.itemContainer} onClick={editProfile}>
                        Profile
                    </div>
                    <div className={styles.itemContainer}>
                        Posts
                    </div>
                    <div className={styles.line}/>
                    <div className={styles.itemContainer} onClick={signOut}>
                        Sign Out
                    </div>
                </div>
            }
        </>
    )
}

export default ProfileOptionPopup;