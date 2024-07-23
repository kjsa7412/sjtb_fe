'use client';

import styles from "./ProfileOptionPopup.module.scss";
import {useRecoilState, useResetRecoilState} from "recoil";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {profileOptionPopupAtom} from "@/atoms/profileOptionPopupAtom";
import {useEffect, useRef} from "react";
import {EElementId} from "@/types/enums/common-enum";
import {userAtom} from "@/atoms/userAtom";
import {loginAtom} from "@/atoms/loginAtom";
import {editProfilePopupAtom} from "@/atoms/editProfilePopupAtom";

const ProfileOptionPopup = () => {
    const targetRef = useRef(null);
    const [rcProfileOptionPopup, setRcProfileOptionPopup] = useRecoilState<IOptionPopup>(profileOptionPopupAtom)
    const [rcEditProfilePopup, setRcEditProfilePopup] = useRecoilState<IOptionPopup>(editProfilePopupAtom);
    const resetRcUserAtom = useResetRecoilState(userAtom);
    const resetRcLoginAtom = useResetRecoilState(loginAtom);

    const signOut = () => {
        setRcProfileOptionPopup({isOpen: false});
        resetRcUserAtom();
        resetRcLoginAtom();
    }

    const editProfile = () => {
        setRcProfileOptionPopup({isOpen: false});
        setRcEditProfilePopup({isOpen: true});
    }

    useEffect(() => {
        const updatePosition = () => {
            const targetElement = document.getElementById(EElementId.HeaderProfile);
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const thisRect = targetRef.current.getBoundingClientRect();
                setRcProfileOptionPopup((prev) => ({
                    ...prev,
                    position: { top: rect.bottom - 10, left: rect.left - thisRect.width + 30},
                }));
            }
        };

        if (rcProfileOptionPopup.isOpen) {
            window.addEventListener('resize', updatePosition);
            updatePosition();
        }

        return () => {
            window.removeEventListener('resize', updatePosition);
        };
    }, [rcProfileOptionPopup.isOpen]);

    return (
        <>
            {rcProfileOptionPopup.isOpen &&
                <div ref={targetRef} className={styles.baseContainer} style={{top: rcProfileOptionPopup.position.top, left: rcProfileOptionPopup.position.left}}>
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