import { atom } from 'recoil';
import {IPopupData, IPopupState} from "@/types/interfaces/popup-interface";

export const popupState = atom<IPopupState>({
    key: 'popupState',
    default: {
        boardOption: false,
        confirm: false,
        editProfile: false,
        notify: false,
        profileOption: false,
        signIn: false,
        signUp: false
    },
});

export const popupData = atom<IPopupData>({
    key: 'popupData',
    default: {
        boardOption: undefined,
        confirm: undefined,
        editProfile: undefined,
        notify: undefined,
        profileOption: undefined,
        signIn: undefined,
        signUp: undefined
    },
});