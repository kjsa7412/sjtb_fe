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
