'use client';

import {useRecoilState} from "recoil";
import {useEffect, useRef, useState} from "react";

import {EBreakPoint, EElementId, EIcon, EPopup} from "@/types/enums/common-enum";
import {ILogin, IUser} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import usePopup from "@/hooks/usePopup";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";
import useBreakPoint from "@/hooks/useBreakPoint";
import {userAtom} from "@/atoms/userAtom";
import {IMG} from "@/contants/common";

import Icons from "@/components/Icons";
import styles from "./HeaderItem.module.scss";
import SearchBar from "@/components/search/SearchBar";
import SearchIcon from "@/components/search/SearchIcon";

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
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);
    const targetRef = useRef(null);
    const popupController = usePopup();
    const [isMounted, setIsMounted] = useState(false); // 마운트 여부 관리

    useEffect(() => {
        setIsMounted(true); // 컴포넌트가 마운트되면 true로 설정
    }, []);

    const togglePopup = () => {
        if (popupController.isPopupOpen(EPopup.ProfileOption)) {
            popupController.closePopup(EPopup.ProfileOption);
        } else {
            if (targetRef.current) {
                const element = targetRef.current as HTMLDivElement;
                const rect = element.getBoundingClientRect();
                popupController.openPopup(EPopup.ProfileOption, {position: {top: rect.bottom, left: rect.left}})
            } else {
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
            {isMounted && (rcUser.profilePicPath ? <Icons iconType={EIcon.Avatar} width={32} height={32} fill={IMG.DefaultPath + rcUser.profilePicPath} /> : <Icons iconType={EIcon.Avatar} width={32} height={32} fill={'#C0C0C0'} />)}
        </button>
    );
}

export const HeaderAction = () => {
    const [action, setAction] = useState('')
    const [rcLogin, setRcLogin] = useRecoilState<ILogin>(loginAtom);
    const actionAndNavigate = useActionAndNavigate();

    useEffect(() => {
        if (rcLogin.isLogin) {
            setAction('Write');
        } else {
            setAction('');
        }
    }, [rcLogin]);

    const onClick = () => {
        if (rcLogin.isLogin) {
            actionAndNavigate.actionAndNavigate('/board/new')
        }
    };

    return (
        <>
            <button className={styles.actionContainer} onClick={onClick}>
                {action}
            </button>
        </>
    )
}

export const HeaderSearch = () => {
    const breakPoint = useBreakPoint();
    return (
        <>
            {
                breakPoint === EBreakPoint.LG ?
                    <SearchBar/> : <SearchIcon/>
            }
        </>
    )
}

