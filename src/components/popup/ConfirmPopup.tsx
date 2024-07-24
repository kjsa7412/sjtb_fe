'use client';

import styles from './ConfirmPopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import {EBlank, EButtonShape, EButtonSize, EButtonType, EPopup} from "@/types/enums/common-enum";
import Blank from "@/components/blank/Blank";
import Overlay from "@/components/overlay/Overlay";
import usePopup from "@/hooks/usePopup";

const ConfirmPopup = () => {
    const popupController = usePopup();
    const closePopup = () => popupController.openPopup(EPopup.Confirm);
    return (
        <>
            {
                popupController.isPopupOpen(EPopup.Confirm) &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.body_mainText}>
                                {setRcConfirmPopup.title}
                            </div>
                            <div className={styles.body_mainSubText}>
                                {setRcConfirmPopup.desc}
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



