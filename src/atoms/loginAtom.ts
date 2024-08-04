import {atom} from "recoil";

import {ILogin} from "@/types/interfaces/common-interface";
import localStorageEffect from "@/atoms/localStorageEffect";

export const loginAtom = atom<ILogin>({
    key: 'loginAtom',
    default: {
        isLogin: false
    },
    effects: [localStorageEffect('loginAtom')]
});