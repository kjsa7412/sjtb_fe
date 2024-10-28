export interface IPost {
    url: string,
    title: string,
    desc?: string,
    date: string,
    writer: string,
    slug: string
}

export interface IPostData {
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    keywords: string[];
    author: string
    datePublished: string;
    dateModified: string;
    content: string;
}

export interface IParam_CreatePost {
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    keywords: string[];
    author: string
    datePublished: string;
    dateModified: string;
    content: string;
}

export interface IResult_CreatePost {
    success: boolean;
    message: string;
    filePath?: string; // 성공 시에만 포함
}

// 좋아요 및 조회수 조회
export interface IParam_CountList {
    boadId: number;
}

export interface IResult_CountList {
    viewCnt: string;
    likeCnt: string;
}

// 좋아요 클릭
export interface IParam_UpdateLike {
    boadid: number;
}

export interface IResult_UpdateLike {
    viewCnt: string;
    likeCnt: string;
}

// 댓글 목록 조회
export interface IParam_CmmtList {
    boadId: number;
}

export interface IResult_CmmtList {
    cmtId: number;
    boadId: number;
    userId: string;
    userName: string;
    profilePicPath: string;
    cmt: string;
    writeDate: string;
}
