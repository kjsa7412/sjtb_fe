import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

import axiosServer from "@/libs/axiosServer";
import {IAPIResponse, IUser} from "@/types/interfaces/common-interface";
import {IParam_UserJoin} from "@/types/interfaces/user-interface";

async function fetchJoin(param: IParam_UserJoin): Promise<AxiosResponse<IAPIResponse<IUser>>> {
    return await axiosServer.post('/public/post/auth/signIn', param);
}

export async function POST(req: NextRequest) {
    try {
        const param: IParam_UserJoin = await req.json();
        const response = await fetchJoin(param);

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