import {atom} from 'recoil';
import {IOptionPopup} from "@/types/interfaces/popup-interface";

export const signInPopupAtom = atom<IOptionPopup>({
    key: 'signInPopupAtom',
    default: {
        isOpen: false
    },
});
