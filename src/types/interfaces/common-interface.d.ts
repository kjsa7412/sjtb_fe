import {EBreakPointType} from "@/types/enums/common-enum";

export interface ILogin {
    isLogin: boolean;
}

export interface IBannerAtom {
    bannerUrl: string;
    updatedAt: string;
}

export interface IUser {
    userId: string;
    userName: string;
    profileCont: string;
    profilePic: string;
    userAuth: string;
}

export interface IAPIResponse<T> {
    isError: boolean;
    isSessionError: boolean;
    isWarning: boolean;
    errorMsg: string;
    warningMsg: string;
    content: T;
}

export interface IBreakPoint {
    breakPoint: EBreakPointType;
}

