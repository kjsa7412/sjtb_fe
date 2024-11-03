import { atom } from 'recoil';

export const editTitleAtom = atom<string | null>({
    key: 'editTitleAtom',
    default: null,
});