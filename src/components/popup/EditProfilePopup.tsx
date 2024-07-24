'use client';

import styles from './EditProfilePopup.module.scss';
import {EButtonShape, EButtonSize, EButtonType, EPopup} from "@/types/enums/common-enum";
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import Overlay from "@/components/overlay/Overlay";
import usePopup from "@/hooks/usePopup";

const EditProfilePopup = () => {
    const popupController = usePopup();
    const closePopup = () => popupController.closePopup(EPopup.EditProfile);
    return (
        <>
            {
                popupController.isPopupOpen(EPopup.EditProfile) &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <div className={styles.title}>
                            Profile
                        </div>
                        <div className={styles.body}>
                        </div>
                        <div className={styles.button}>
                            <TextButton controller={{onClick: closePopup, label: "Save"}} styles={{
                                size: EButtonSize.Medium,
                                shape: EButtonShape.Round,
                                type: EButtonType.Black
                            }}/>
                        </div>
                    </div>
                </Overlay>
            }
        </>
    )
}

export default EditProfilePopup;



