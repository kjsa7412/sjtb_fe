import {atom} from 'recoil';
import {IOptionPopup} from "@/types/interfaces/popup-interface";

export const notifyPopupAtom = atom<IOptionPopup>({
    key: 'notifyPopupAtom',
    default: {
        isOpen: false
    },
});
