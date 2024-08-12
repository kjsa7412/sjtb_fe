import {atom} from "recoil";

import {IUser} from "@/types/interfaces/common-interface";

import localStorageEffect from './localStorageEffect';

export const userAtom = atom<IUser>({
    key: 'userAtom',
    default: {
        userId: "",
        userName: "",
        profileCont: "",
        profilePic: "",
        loginToken: "",
        userAuth: ""
    },
    effects: [localStorageEffect('userAtom')],
});