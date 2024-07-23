import {atom} from 'recoil';
import {IOptionPopup} from "@/types/interfaces/popup-interface";

export const confirmPopupAtom = atom<IOptionPopup>({
    key: 'confirmPopupAtom',
    default: {
        isOpen: false,
        title: "",
        desc: ""
    },
});
