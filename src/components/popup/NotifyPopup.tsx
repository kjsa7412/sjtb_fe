'use client';

import styles from './NotifyPopup.module.scss';
import {EBlank, EButtonShape, EButtonSize, EButtonType, EPopup} from "@/types/enums/common-enum";
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import Blank from "@/components/blank/Blank";
import Overlay from "@/components/overlay/Overlay";
import usePopup from "@/hooks/usePopup";

const NotifyPopup = () => {
    const popupController = usePopup();
    const closePopup = () => popupController.closePopup(EPopup.Notify);
    return (
        <>
            {
                popupController.isPopupOpen(EPopup.Notify) &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.body_mainText}>
                                {popupController.getPopupData(EPopup.Notify).title}
                            </div>
                            <div className={styles.body_mainSubText}>
                                {popupController.getPopupData(EPopup.Notify).desc}
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



