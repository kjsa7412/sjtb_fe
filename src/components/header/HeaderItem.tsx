'use client';

import {useRecoilState} from "recoil";
import {useEffect, useRef, useState} from "react";

import {EElementId, EIcon, EPopup} from "@/types/enums/common-enum";
import {ILogin} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import usePopup from "@/hooks/usePopup";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";
import useIsLargeScreen from "@/hooks/useIsLargeScreen";

import Icons from "@/components/Icons";
import styles from "./HeaderItem.module.scss";

export const HeaderLogo = () => {
    const actionAndNavigate = useActionAndNavigate();

    const onClick = () => {
        actionAndNavigate.actionAndNavigate(`/`);
    }
    return (
        <button className={styles.logoContainer} onClick={onClick}>
            <p>TECH BLOG</p>
        </button>
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
            if(targetRef.current) {
                const element = targetRef.current as HTMLDivElement;
                const rect = element.getBoundingClientRect();
                popupController.openPopup(EPopup.ProfileOption, {position: {top: rect.bottom, left: rect.left}})
            }
            else {
                popupController.openPopup(EPopup.ProfileOption);
            }
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
        <button id={EElementId.HeaderProfile} ref={targetRef} className={styles.profileContainer} onClick={onClick}>
            <Icons iconType={EIcon.Avatar} width={32} height={32} fill={'#C0C0C0'}/>
        </button>
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
                <button className={styles.actionContainer}
                     onClick={() => actionAndNavigate.actionAndNavigate('/board/new')}>
                    {action}
                </button>
            }
        </>
    )
}

export const HeaderSearch = () => {
    const isLargeScreen = useIsLargeScreen();
    const popupController = usePopup();

    const onClick = () => {
        return popupController.openPopup(EPopup.Search);
    };

    return (
        <>
            {
                !isLargeScreen &&
                <button className={styles.profileContainer} onClick={onClick}>
                    <Icons iconType={EIcon.Search} fill={'#929292'} width={20} height={20}/>
                </button>
            }
        </>
    )
}

