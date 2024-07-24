'use client';

import Link from "next/link";
import styles from "./HeaderItem.module.scss";
import Icons from "@/components/Icons";
import {EElementId, EIcon, EPopup} from "@/types/enums/common-enum";
import {useRecoilState} from "recoil";
import {useRef} from "react";
import {ILogin} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import usePopup from "@/hooks/usePopup";

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
    const targetRef = useRef(null);
    const popupController = usePopup();

    const togglePopup = () => {
        if (popupController.isPopupOpen(EPopup.ProfileOption)) {
            console.log("123");
            popupController.closePopup(EPopup.ProfileOption);
        } else {
            console.log("456");
            const rect = targetRef.current.getBoundingClientRect();
            popupController.openPopup(EPopup.ProfileOption, {position: { top: rect.bottom, left: rect.left }})
        }
    };

    const onClick = () => {
        if(rcLogin.isLogin) {
            return togglePopup();
        } else {
            return popupController.openPopup(EPopup.SignIn);
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