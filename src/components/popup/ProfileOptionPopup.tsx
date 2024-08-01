'use client';

import {useRecoilState, useResetRecoilState} from "recoil";
import {useEffect, useRef} from "react";

import {EElementId, EPopup} from "@/types/enums/common-enum";
import {userAtom} from "@/atoms/userAtom";
import {loginAtom} from "@/atoms/loginAtom";
import usePopup from "@/hooks/usePopup";
import {IUser} from "@/types/interfaces/common-interface";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";

import styles from "./ProfileOptionPopup.module.scss";

const ProfileOptionPopup = () => {
    const actionAndNavigate = useActionAndNavigate();
    const targetRef = useRef(null);
    const popupController = usePopup();
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);
    const resetRcUserAtom = useResetRecoilState(userAtom);
    const resetRcLoginAtom = useResetRecoilState(loginAtom);

    const signOut = () => {
        actionAndNavigate.actionAndNavigate(`/`);
        resetRcLoginAtom();
        resetRcUserAtom();
    }

    const editProfile = () => {
        popupController.closePopup(EPopup.ProfileOption);
        popupController.openPopup(EPopup.EditProfile);
    }

    const onClick = () => {
        actionAndNavigate.actionAndNavigate(`/board/search/${rcUser.userId}`);
    }

    useEffect(() => {
        const updatePosition = () => {
            const targetElement = document.getElementById(EElementId.HeaderProfile);

            if (targetElement && targetRef.current) {
                const element = targetRef.current as HTMLDivElement;
                const thisRect = element.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();

                popupController.openPopup(EPopup.ProfileOption, {
                    position: {
                        top: targetRect.bottom - 10,
                        left: targetRect.left - thisRect.width + 30,
                    },
                });
            } else {
                popupController.openPopup(EPopup.ProfileOption);
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
                    <button className={styles.itemContainer} onClick={editProfile}>
                        Profile
                    </button>
                    <button className={styles.itemContainer} onClick={onClick}>
                        Posts
                    </button>
                    <div className={styles.line}/>
                    <button className={styles.itemContainer} onClick={signOut}>
                        Sign Out
                    </button>
                </div>
            }
        </>
    )
}

export default ProfileOptionPopup;