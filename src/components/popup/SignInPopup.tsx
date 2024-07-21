'use client';

import styles from './SignInPopup.module.scss';
import CloseButton from "@/components/button/CloseButton";
import TextButton from "@/components/button/TextButton";
import {EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {useRecoilState} from "recoil";
import Overlay from "@/components/overlay/Overlay";
import {signInPopupAtom} from "@/atoms/signInPopupAtom";

const SignInPopup = () => {
    const [rcSignInPopupAtom, setRcSignInPopupAtom] = useRecoilState<IOptionPopup>(signInPopupAtom);

    const closePopup = () => {
        setRcSignInPopupAtom(false);
    }

    return (
        <>
            {
                rcSignInPopupAtom.isOpen &&
                <Overlay>
                    <div className={styles.baseContainer}>
                        <div className={styles.header}>
                            <CloseButton onClick={closePopup}/>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.body_title}>
                                Welecome Back
                            </div>
                            <div className={styles.body_button}>
                                <TextButton controller={{onClick: closePopup, label: "Sign In"}} styles={{
                                    size: EButtonSize.Large,
                                    shape: EButtonShape.Round,
                                    type: EButtonType.Black
                                }}/>
                            </div>
                            <div className={styles.body_button}>
                                <TextButton controller={{onClick: closePopup, label: "Sign Up"}} styles={{
                                    size: EButtonSize.Large,
                                    shape: EButtonShape.Round,
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

export default SignInPopup;



