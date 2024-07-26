'use client';

import styles from "./HeaderItem.module.scss";
import Icons from "@/components/Icons";
import {EElementId, EIcon, EPopup} from "@/types/enums/common-enum";
import {useRecoilState} from "recoil";
import {useEffect, useRef, useState} from "react";
import {ILogin} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import usePopup from "@/hooks/usePopup";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";

export const HeaderLogo = () => {
    const actionAndNavigate = useActionAndNavigate();

    const onClick = () => {
        actionAndNavigate.actionAndNavigate(`/`);
    }
    return (
        <div className={styles.logoContainer} onClick={onClick}>
            <p>TECH BLOG</p>
        </div>
    );
};

export const HeaderProfile = () => {
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    const targetRef = useRef(null);
    const popupController = usePopup();

    const togglePopup = () => {
        if (popupController.isPopupOpen(EPopup.ProfileOption)) {
            popupController.closePopup(EPopup.ProfileOption);
        } else {
            const rect = targetRef.current.getBoundingClientRect();
            popupController.openPopup(EPopup.ProfileOption, {position: {top: rect.bottom, left: rect.left}})
        }
    };

    const onClick = () => {
        if (rcLogin.isLogin) {
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
    const [action, setAction] = useState('')
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    const actionAndNavigate = useActionAndNavigate();

    useEffect(() => setAction('Write'), [])

    return (
        <>
            {
                rcLogin.isLogin &&
                <div className={styles.actionContainer}
                     onClick={() => actionAndNavigate.actionAndNavigate('/board/new')}>
                    {action}
                </div>
            }
        </>
    )
}