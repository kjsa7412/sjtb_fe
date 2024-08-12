import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

import axiosServer from "@/libs/axiosServer";
import { IAPIResponse } from "@/types/interfaces/common-interface";
import { IParam_UserJoin, IResult_UserJoin } from "@/types/interfaces/user-interface";

async function fetchSignUp(param: IParam_UserJoin, authToken: string): Promise<AxiosResponse<IAPIResponse<IResult_UserJoin>>> {
    return await axiosServer.post('/public/post/user/signUp', param, {
        headers: {
            Cookie: "X-AUTH-TOKEN=" + authToken // 쿠키 전달
        }
    });
}

export async function POST(req: NextRequest) {
    try {
        // 쿠키에서 'X-AUTH-TOKEN' 추출
        const authToken = req.cookies.get('X-AUTH-TOKEN')?.value || '';

        const param: IParam_UserJoin = await req.json();
        const response = await fetchSignUp(param, authToken);

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        // 오류가 발생했을 경우
        console.error('Error during the signup process:', error);

        // 오류 응답 처리
        return NextResponse.json(
            { message: 'Unknown error occurred', error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}