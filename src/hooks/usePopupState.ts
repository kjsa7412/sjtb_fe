'use client';

import {EPopup} from "@/types/enums/common-enum";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {profileOptionPopupAtom} from "@/atoms/profileOptionPopupAtom";
import {signInPopupAtom} from "@/atoms/signInPopupAtom";
import {useRecoilState, useResetRecoilState} from "recoil";
import {boardOptionPopupAtom} from "@/atoms/boardOptionPopupAtom";
import {confirmPopupAtom} from "@/atoms/confirmPopupAtom";
import {editProfilePopupAtom} from "@/atoms/editProfilePopupAtom";
import {notifyPopupAtom} from "@/atoms/notifyPopupAtom";
import {signUpPopupAtom} from "@/atoms/signUpPopupAtom";
import {useEffect} from "react";

interface Props {
    open?: EPopup,
    openList?: EPopup[],
    close?: EPopup,
    closeList?: EPopup[],
    closeAll?: boolean
}

const usePopupState = (props: Props) => {
    const [rcBoardOptionPopup, setRcBoardOptionPopup] = useRecoilState<IOptionPopup>(boardOptionPopupAtom);
    const [rcConfirmPopup, setRcConfirmPopup] = useRecoilState<IOptionPopup>(confirmPopupAtom);
    const [rcEditProfilePopup, setRcEditProfilePopup] = useRecoilState<IOptionPopup>(editProfilePopupAtom);
    const [rcNotifyPopup, setRcNotifyPopup] = useRecoilState<IOptionPopup>(notifyPopupAtom);
    const [rcProfileOptionPopup, setRcProfileOptionPopup] = useRecoilState<IOptionPopup>(profileOptionPopupAtom);
    const [rcSignInPopup, setRcSignInPopup] = useRecoilState<IOptionPopup>(signInPopupAtom);
    const [rcSignUpPopup, setRcSignUpPopup] = useRecoilState<IOptionPopup>(signUpPopupAtom);

    const resetBoardOptionPopup = useResetRecoilState(boardOptionPopupAtom);
    const resetConfirmPopup = useResetRecoilState(confirmPopupAtom);
    const resetEditProfilePopup = useResetRecoilState(editProfilePopupAtom);
    const resetNotifyPopup = useResetRecoilState(notifyPopupAtom);
    const resetProfileOptionPopup = useResetRecoilState(profileOptionPopupAtom);
    const resetSignInPopup = useResetRecoilState(signInPopupAtom);
    const resetSignUpPopup = useResetRecoilState(signUpPopupAtom);

    const setPopupState = (popup: EPopup, state: boolean) => {
        switch (popup) {
            case EPopup.BoardOption:
                setRcBoardOptionPopup({isOpen: state});
                break;
            case EPopup.Confirm:
                setRcConfirmPopup({isOpen: state});
                break;
            case EPopup.EditProfile:
                setRcEditProfilePopup({isOpen: state});
                break;
            case EPopup.Notify:
                setRcNotifyPopup({isOpen: state});
                break;
            case EPopup.ProfileOption:
                setRcProfileOptionPopup({isOpen: state});
                break;
            case EPopup.SignIn:
                setRcSignInPopup({isOpen: state});
                break;
            case EPopup.SignUp:
                setRcSignUpPopup({isOpen: state});
                break;
            default:
                break;
        }
    };

    const resetPopupState = (popup: EPopup) => {
        switch (popup) {
            case EPopup.BoardOption:
                resetBoardOptionPopup();
                break;
            case EPopup.Confirm:
                resetConfirmPopup();
                break;
            case EPopup.EditProfile:
                resetEditProfilePopup();
                break;
            case EPopup.Notify:
                resetNotifyPopup();
                break;
            case EPopup.ProfileOption:
                resetProfileOptionPopup();
                break;
            case EPopup.SignIn:
                resetSignInPopup();
                break;
            case EPopup.SignUp:
                resetSignUpPopup();
                break;
            default:
                break;
        }
    };

    if (props.closeAll) {
        // Close all popups
        resetPopupState(EPopup.BoardOption);
        resetPopupState(EPopup.Confirm);
        resetPopupState(EPopup.EditProfile);
        resetPopupState(EPopup.Notify);
        resetPopupState(EPopup.ProfileOption);
        resetPopupState(EPopup.SignIn);
        resetPopupState(EPopup.SignUp);
    } else {
        if (props.open) {
            setPopupState(props.open, true);
        }
        if (props.openList) {
            props.openList.forEach((popup) => setPopupState(popup, true));
        }
        if (props.close) {
            resetPopupState(props.close);
        }
        if (props.closeList) {
            props.closeList.forEach((popup) => resetPopupState(popup));
        }
    }
};

export default usePopupState;
