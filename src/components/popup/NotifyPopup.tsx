'use client';

import styles from './NotifyPopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import {EBlank, EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";
import Blank from "@/components/blank/Blank";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {useRecoilState} from "recoil";
import {notifyPopupAtom} from "@/atoms/notifyPopupAtom";
import Overlay from "@/components/overlay/Overlay";

const NotifyPopup = () => {
    const [rcNotifyOptionPopup, setRcNotifyOptionPopup] = useRecoilState<IOptionPopup>(notifyPopupAtom);

    const closePopup = () => {
        setRcNotifyOptionPopup(false);
    }

    return (
        <>
            {
                rcNotifyOptionPopup.isOpen &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.body_mainText}>
                                Created Blog
                            </div>
                            <div className={styles.body_mainSubText}>
                                작성한 글이 게시되었습니다.
                            </div>
                            <Blank type={EBlank.Column} size={20}/>
                            <div className={styles.body_buttonContainer}>
                                <TextButton controller={{onClick: closePopup, label: "Ok"}} styles={{
                                    size: EButtonSize.Medium,
                                    shape: EButtonShape.Round,
                                    type: EButtonType.Stroke
                                }}/>
                            </div>
                        </div>
                        <Blank type={EBlank.Column} size={40}/>
                    </div>
                </Overlay>
            }
        </>
    )
}

export default NotifyPopup;



