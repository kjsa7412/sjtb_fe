import {atom} from 'recoil';
import {IOptionPopup} from "@/types/interfaces/popup-interface";

export const boardOptionPopupAtom = atom<IOptionPopup>({
    key: 'boardOptionPopupAtom',
    default: {
        isOpen: false,
        position: {
            top: 0,
            left: 0
        }
    },
});
