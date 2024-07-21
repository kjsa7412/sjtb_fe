'use client';

import styles from "./ProfileOptionPopup.module.scss";
import {useRecoilState} from "recoil";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {profileOptionPopupAtom} from "@/atoms/profileOptionPopupAtom";
import {useEffect, useRef} from "react";
import {EElementId} from "@/types/enums/common-enum";

const ProfileOptionPopup = () => {
    const targetRef = useRef(null);
    const [rcProfileOptionPopup, setRcProfileOptionPopup] = useRecoilState<IOptionPopup>(profileOptionPopupAtom);

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
                    <div className={styles.itemContainer}>
                        Profile
                    </div>
                    <div className={styles.itemContainer}>
                        Posts
                    </div>
                    <div className={styles.line}/>
                    <div className={styles.itemContainer}>
                        Sign Out
                    </div>
                </div>
            }
        </>
    )
}

export default ProfileOptionPopup;