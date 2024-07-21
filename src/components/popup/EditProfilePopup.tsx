'use client';

import styles from './EditProfilePopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import {EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {useRecoilState} from "recoil";
import Overlay from "@/components/overlay/Overlay";
import {editProfilePopupAtom} from "@/atoms/editProfilePopupAtom";

const EditProfilePopup = () => {
    const [rcEditProfilePopupAtom, setRcEditProfilePopupAtom] = useRecoilState<IOptionPopup>(editProfilePopupAtom);

    const closePopup = () => {
        setRcEditProfilePopupAtom(false);
    }

    return (
        <>
            {
                rcEditProfilePopupAtom.isOpen &&
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



