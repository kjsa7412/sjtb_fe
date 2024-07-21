'use client';

import styles from './SignUpPopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import {EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {useRecoilState} from "recoil";
import Overlay from "@/components/overlay/Overlay";
import {signUpPopupAtom} from "@/atoms/signUpPopupAtom";

const SignUpPopup = () => {
    const [rcSignUpPopupAtom, setRcSignUpPopupAtom] = useRecoilState<IOptionPopup>(signUpPopupAtom);

    const closePopup = () => {
        setRcSignUpPopupAtom(false);
    }

    return (
        <>
            {
                rcSignUpPopupAtom.isOpen &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.body_title}>
                                Join Us
                            </div>
                            <div className={styles.body_button}>
                                <TextButton controller={{onClick: closePopup, label: "Sign Up"}} styles={{
                                    size: EButtonSize.Large,
                                    shape: EButtonShape.Square,
                                    type: EButtonType.Black
                                }}/>
                            </div>
                            <div className={styles.body_button}>
                                <TextButton controller={{onClick: closePopup, label: "Sign In"}} styles={{
                                    size: EButtonSize.Large,
                                    shape: EButtonShape.Square,
                                    type: EButtonType.None
                                }}/>
                            </div>
                        </div>
                    </div>
                </Overlay>
            }
        </>
    )
}

export default SignUpPopup;



