import {atom} from 'recoil';
import {IOptionPopup} from "@/types/interfaces/popup-interface";

export const signUpPopupAtom = atom<IOptionPopup>({
    key: 'signUpPopupAtom',
    default: {
        isOpen: false
    },
});
