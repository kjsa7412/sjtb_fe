'use client';

import {useEffect, useRef} from "react";
import {usePathname} from "next/navigation";

import usePopup from "@/hooks/usePopup";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";
import {EElementId, EPopup} from "@/types/enums/common-enum";

import styles from './BoardOptionPopup.module.scss';

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

                if(targetRef.current) {
                    const element = targetRef.current as HTMLDivElement;
                    const thisRect = element.getBoundingClientRect();
                    popupController.openPopup(EPopup.BoardOption, {
                        position: {
                            top: rect.bottom - 10,
                            left: rect.left - thisRect.width + 30
                        }
                    });
                }
                else {
                    popupController.openPopup(EPopup.BoardOption);
                }
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (targetRef.current) {
                const element = targetRef.current as HTMLDivElement;
                !element.contains(event.target as Node)
                {
                    popupController.closePopup(EPopup.BoardOption);
                }
            }
        };

        // document에 이벤트 리스너 추가
        document.addEventListener('mousedown', handleClickOutside);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {
                popupController.isPopupOpen(EPopup.BoardOption) &&
                <div ref={targetRef} className={styles.baseContainer} style={{
                    top: popupController.getPopupData(EPopup.BoardOption).position.top,
                    left: popupController.getPopupData(EPopup.BoardOption).position.left
                }}>
                    <button className={styles.itemContainer} onClick={onClick}>
                        Edit Board
                    </button>
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