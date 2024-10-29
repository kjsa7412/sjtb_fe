'use client';

import {useRecoilState, useRecoilValue} from "recoil";
import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import {AxiosResponse} from "axios";

import {EBreakPoint, EElementId, EIcon, EPopup} from "@/types/enums/common-enum";
import {IAPIResponse, ILogin, IUser} from "@/types/interfaces/common-interface";
import {loginAtom} from "@/atoms/loginAtom";
import usePopup from "@/hooks/usePopup";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";
import useBreakPoint from "@/hooks/useBreakPoint";
import {userAtom} from "@/atoms/userAtom";
import {IMG} from "@/contants/common";
import {editorAtom} from "@/atoms/editorAtom";
import {IParam_UserSignUp, IResult_UserSignUp} from "@/types/interfaces/user-interface";
import axiosServer from "@/libs/axiosServer";

import Icons from "@/components/Icons";
import styles from "./HeaderItem.module.scss";
import SearchBar from "@/components/search/SearchBar";
import SearchIcon from "@/components/search/SearchIcon";

// 나중에 api 전달에 사용
async function serverAPI_publishBoard(param: IParam_UserSignUp): Promise<AxiosResponse<IAPIResponse<IResult_UserSignUp>>> {
    return await axiosServer.post('/public/post/user/signUp', param);
}

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
    const [rcLogin] = useRecoilState<ILogin>(loginAtom);
    const actionAndNavigate = useActionAndNavigate();
    const pathName = usePathname();
    const editorRef = useRecoilValue(editorAtom);

    useEffect(()=> {
        if (pathName === '/board/new' && !rcLogin.isLogin) {
            alert('비 정상적인 접근입니다.')
            actionAndNavigate.actionAndNavigate('/')
            return;
        }
    }, []);

    // 경로 변경을 감지해서 버튼값 설정
    useEffect(() => {
        if (pathName === '/board/new') {
            setAction('Publish');
        } else if (/^\/board\/\d+\/edit$/.test(pathName)) {
            setAction('Edit');
        } else {
            setAction(rcLogin.isLogin ? 'Write' : '');
        }
    }, [rcLogin, pathName]);

    const onClick = () => {
        // 게시물 작성 url 이동
        if (action === 'Write') {
            actionAndNavigate.actionAndNavigate('/board/new');
        } else if (action === 'Publish' || action === 'Edit') {
            if (editorRef) {
                console.log(editorRef);
                console.log(editorRef.getMarkdown());
            }
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

