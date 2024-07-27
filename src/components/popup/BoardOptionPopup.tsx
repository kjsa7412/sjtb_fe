'use client';


import {useEffect, useRef} from "react";
import {usePathname} from "next/navigation";
import usePopup from "@/hooks/usePopup";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";
import styles from './BoardOptionPopup.module.scss';
import {EElementId, EPopup} from "@/types/enums/common-enum";

const BoardOptionPopup = () => {
    const pathname = usePathname();
    const actionAndNavigate = useActionAndNavigate();
    const targetRef = useRef(null);
    const popupController = usePopup();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const onClick = () => actionAndNavigate.actionAndNavigate(`${baseUrl}/${pathname}/edit`);

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

    return (
        <>
            {popupController.isPopupOpen(EPopup.BoardOption) &&
                <div ref={targetRef} className={styles.baseContainer} style={{
                    top: popupController.getPopupData(EPopup.BoardOption).position.top,
                    left: popupController.getPopupData(EPopup.BoardOption).position.left
                }}>
                    <div className={styles.itemContainer} onClick={onClick}>
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