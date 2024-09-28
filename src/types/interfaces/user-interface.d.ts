// 회원가입
export interface IParam_UserSignUp {
    userId: string;
    userPw: string;
}

export interface IResult_UserSignUp {
    userId: string;
}

// 로그인
export interface IParam_UserSignIn {
    userId: string;
    userPw: string;
}

// 회원정보 수정
export interface IParam_UserEdit {
    userName: string;
    profileCont: string;
}

export interface IResult_UserEdit {
    userId: string;
}