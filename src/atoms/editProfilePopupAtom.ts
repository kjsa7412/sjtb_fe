import {atom} from 'recoil';
import {IOptionPopup} from "@/types/interfaces/popup-interface";

export const editProfilePopupAtom = atom<IOptionPopup>({
    key: 'editProfilePopupAtom',
    default: {
        isOpen: false
    },
});
