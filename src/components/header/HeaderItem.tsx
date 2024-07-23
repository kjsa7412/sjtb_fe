'use client';

import Link from "next/link";
import styles from "./HeaderItem.module.scss";
import Icons from "@/components/Icons";
import {EElementId, EIcon} from "@/types/enums/common-enum";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {profileOptionPopupAtom} from "@/atoms/profileOptionPopupAtom";
import {useRecoilState} from "recoil";
import {useRef} from "react";
import {ILogin} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import {editProfilePopupAtom} from "@/atoms/editProfilePopupAtom";
import signInPopup from "@/components/popup/SignInPopup";
import {signInPopupAtom} from "@/atoms/signInPopupAtom";

export const HeaderLogo = () => {
    return (
        <div className={styles.logoContainer}>
            <Link href={`/`}>
                <p style={{fontWeight: 'bold'}}>TECH BLOG</p>
            </Link>
        </div>
    );
};

export const HeaderProfile = () => {
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    const [rcProfileOptionPopup, setRcProfileOptionPopup] = useRecoilState<IOptionPopup>(profileOptionPopupAtom);
    const [rcSignInPopup, setRcSignInPopup] = useRecoilState<IOptionPopup>(signInPopupAtom);
    const targetRef = useRef(null);

    const togglePopup = () => {
        if (!rcProfileOptionPopup.isOpen) {
            const rect = targetRef.current.getBoundingClientRect();
            setRcProfileOptionPopup({
                isOpen: true,
                position: { top: rect.bottom, left: rect.left },
            });
        } else {
            setRcProfileOptionPopup({ ...rcProfileOptionPopup, isOpen: false });
        }
    };

    const onClick = () => {
        if(rcLogin.isLogin) {
            return togglePopup();
        } else {
            return setRcSignInPopup((prev) => ({
                ...prev,
                isOpen: !prev.isOpen
            }));
        }
    };


    return (
        <div id={EElementId.HeaderProfile} ref={targetRef} className={styles.profileContainer} onClick={onClick}>
            <Icons iconType={EIcon.Avatar} width={'32'} height={'32'} fill={'#C0C0C0'}/>
        </div>
    )
}

export const HeaderAction = () => {
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    return (
        <>
            {
                !!rcLogin.isLogin &&
                <div className={styles.actionContainer}>
                    <p style={{fontWeight: 'bold'}}>Write</p>
                </div>
            }
        </>
    )
}