import {atom} from 'recoil';
import {IOptionPopup} from "@/types/interfaces/popup-interface";

export const profileOptionPopupAtom = atom<IOptionPopup>({
    key: 'profileOptionPopupAtom',
    default: {
        isOpen: false,
        position: {
            top: 0,
            left: 0
        }
    },
});
