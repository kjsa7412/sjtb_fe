'use client';

import styles from './BoardOptionPopup.module.scss';
import {useEffect, useRef} from "react";
import {EElementId, EPopup} from "@/types/enums/common-enum";
import usePopup from "@/hooks/usePopup";

const BoardOptionPopup = () => {
    const targetRef = useRef(null);
    const popupController = usePopup();

    useEffect(() => {
        const updatePosition = () => {
            const targetElement = document.getElementById(EElementId.BoardOption);
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const thisRect = targetRef.current.getBoundingClientRect();
                popupController.openPopup(EPopup.BoardOption, {
                    position: {
                        top: rect.bottom - 10,
                        left: rect.left - thisRect.width + 30
                    }
                });
            }
        };

        if (popupController.isPopupOpen(EPopup.BoardOption)) {
            window.addEventListener('resize', updatePosition);
            updatePosition();
        }

        return () => {
            window.removeEventListener('resize', updatePosition);
        };
    }, [popupController.isPopupOpen(EPopup.BoardOption)]);
    console.log('c');
    return (
        <>
            {popupController.isPopupOpen(EPopup.BoardOption) &&
                <div ref={targetRef} className={styles.baseContainer} style={{
                    top: popupController.getPopupData(EPopup.BoardOption).position.top,
                    left: popupController.getPopupData(EPopup.BoardOption).position.left
                }}>
                    <div className={styles.itemContainer}>
                        Edit Board
                    </div>
                    <div className={styles.line}/>
                    <div className={`${styles.itemContainer} ${styles.warn}`}>
                        Delete Board
                    </div>
                </div>
            }
        </>
    )
}

export default BoardOptionPopup;