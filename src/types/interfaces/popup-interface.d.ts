import {EPopup} from "@/types/enums/common-enum";

export interface IOptionPopup {
    isOpen: boolean;
    contents?: {
        title: string,
        desc: string
    }
    position?: {
        top: number;
        left: number;
    };
}

export interface IPopupState {
    open?: EPopup,
    openList?: EPopup[],
    close?: EPopup,
    closeList?: EPopup[],
    closeAll?: boolean
}

interface IPopupState {
    [key: EPopup]: boolean;
}

interface IPopupData {
    [key: EPopup]: IPopupDataDetail | undefined; // 특정 타입을 원하면 any 대신 특정 타입으로 변경 가능
}

export interface IPopupDataDetail {
    contents?: {
        title: string,
        desc: string
    }
    position?: {
        top: number;
        left: number;
    };
}

