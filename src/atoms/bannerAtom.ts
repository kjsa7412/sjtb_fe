import {atom} from "recoil";

import {IBanner} from "@/types/interfaces/common-interface";
import localStorageEffect from "@/atoms/localStorageEffect";

export const bannerAtom = atom<IBanner>({
    key: 'bannerAtom',
    default: {
        bannerUrl : '/images/building02.jpg'
    },
    effects: [localStorageEffect('bannerAtom')]
});