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
    userAuth: string
}

export interface IAPIResponse<T> {
    IsError: boolean;
    IsSessionError: boolean;
    IsWarning: boolean;
    ErrorMsg: string;
    WarningMsg: string;
    Content: [T];
}

