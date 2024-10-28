import { NextRequest, NextResponse } from "next/server";

import {createPost} from "@/utils/postUtil";
import {IParam_CreatePost, IResult_CreatePost} from "@/types/interfaces/post-interface";

export async function POST(req: NextRequest) {
    /** 파라미터 예제 => Spring 에서 넘겨줄 값
     *  content 에서 줄 바꿈에 대해 주의 해야함
     * {
     *     "slug": "4",
     *     "title": "Sample Post Title",
     *     "description": "This is a sample description for the post.",
     *     "thumbnail": "/assets/blog/dynamic-routing/cover.jpg",
     *     "keywords": ["sample", "test", "post", "data"],
     *     "author": "123@123.com",
     *     "datePublished": "2024-10-29T00:00:00Z",
     *     "dateModified": "2024-10-29T00:00:00Z",
     *     "content": "This is the main content of the sample post.\n\nIt provides detailed information on the topic discussed.\n\n**this is bold**"
     * }
    * */
    const param: IParam_CreatePost = await req.json();

    const result: IResult_CreatePost = createPost(param);

    if (result.success) {
        return NextResponse.json(result, { status: 200 });
    } else {
        return NextResponse.json(result, { status: 400 });
    }
}