'use client';

import styles from './ConfirmPopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import {EBlank, EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";
import Blank from "@/components/blank/Blank";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {useRecoilState} from "recoil";
import {confirmPopupAtom} from "@/atoms/confirmPopupAtom";
import Overlay from "@/components/overlay/Overlay";

const ConfirmPopup = () => {
    const [rcConfirmOptionPopup, setRcConfirmOptionPopup] = useRecoilState<IOptionPopup>(confirmPopupAtom);

    const closePopup = () => {
        setRcConfirmOptionPopup(false);
    }

    return (
        <>
            {
                rcConfirmOptionPopup.isOpen &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.body_mainText}>
                                Delete Blog
                            </div>
                            <div className={styles.body_mainSubText}>
                                삭제 된 글을 복구가 불가능합니다.
                            </div>
                            <Blank type={EBlank.Column} size={20}/>
                            <div className={styles.body_buttonContainer}>
                                <TextButton controller={{onClick: closePopup, label: "Cancel"}} styles={{
                                    size: EButtonSize.Medium,
                                    shape: EButtonShape.Round,
                                    type: EButtonType.Stroke
                                }}/>
                                <Blank type={EBlank.Row}/>
                                <TextButton controller={{onClick: closePopup, label: "Save"}} styles={{
                                    size: EButtonSize.Medium,
                                    shape: EButtonShape.Round,
                                    type: EButtonType.Black
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

export default ConfirmPopup;



