'use client';

import Link from "next/link";
import styles from "./HeaderItem.module.scss";
import Icons from "@/components/Icons";
import {EElementId, EIcon} from "@/types/enums/common-enum";
import {IProfileOptionPopup} from "@/types/interfaces/popup-interface";
import {profileOptionPopupAtom} from "@/atoms/profileOptionPopupAtom";
import {useRecoilState} from "recoil";
import {useRef} from "react";

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
    const [rcProfileOptionPopup, setRcProfileOptionPopup] = useRecoilState<IProfileOptionPopup>(profileOptionPopupAtom);
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


    return (
        <div id={EElementId.HeaderProfile} ref={targetRef} className={styles.profileContainer} onClick={togglePopup}>
            <Icons iconType={EIcon.Avatar} width={'32'} height={'32'} fill={'#C0C0C0'}/>
        </div>
    )
}

export const HeaderAction = () => {
    return (
        <div className={styles.actionContainer}>
            <p style={{fontWeight: 'bold'}}>Write</p>
        </div>
    )
}