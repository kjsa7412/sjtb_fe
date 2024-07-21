'use client';

import styles from './BoardOptionPopup.module.scss';
import {useRecoilState} from "recoil";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {boardOptionPopupAtom} from "@/atoms/boardOptionPopupAtom";
import {useEffect, useRef} from "react";
import {EElementId} from "@/types/enums/common-enum";

const BoardOptionPopup = () => {
    const targetRef = useRef(null);
    const [rcBoardOptionPopup, setRcBoardOptionPopup] = useRecoilState<IOptionPopup>(boardOptionPopupAtom);

    useEffect(() => {
        const updatePosition = () => {
            const targetElement = document.getElementById(EElementId.HeaderProfile);
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const thisRect = targetRef.current.getBoundingClientRect();
                setRcBoardOptionPopup((prev) => ({
                    ...prev,
                    position: { top: rect.bottom - 10, left: rect.left - thisRect.width + 30},
                }));
            }
        };

        if (rcBoardOptionPopup.isOpen) {
            window.addEventListener('resize', updatePosition);
            updatePosition();
        }

        return () => {
            window.removeEventListener('resize', updatePosition);
        };
    }, [rcBoardOptionPopup.isOpen]);

    return (
        <>
            {rcBoardOptionPopup.isOpen &&
                <div ref={targetRef} className={styles.baseContainer} style={{top: rcBoardOptionPopup.position.top, left: rcBoardOptionPopup.position.left}}>
                    <div className={styles.itemContainer}>
                        Edit Board
                    </div>
                    <div className={styles.line}/>
                    <div className={styles.itemContainer}>
                        Delete Board
                    </div>
                </div>
            }
        </>
    )
}

export default BoardOptionPopup;