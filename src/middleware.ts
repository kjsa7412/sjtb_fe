import { NextResponse, type NextRequest } from "next/server";

import { EJWT } from "@/types/enums/common-enum";

// 프록시 조건
export const config = {
    matcher: "/APICALL/:path*", // Match all requests under /APICALL
};

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get(EJWT.AccessToken)?.value || '';


    console.log('authToken ++++ ' + authToken)

    const originalPathname = request.nextUrl.pathname;
    const newPathname = originalPathname.startsWith('/APICALL')
        ? originalPathname.substring('/APICALL'.length)
        : originalPathname;



    // 새로운 요청 헤더 설정
    const requestHeaders = new Headers(request.headers);

    // Authorization 헤더 추가
    if (authToken) {
        requestHeaders.set('Authorization', `Bearer ${authToken}`);
    }

    // API 주소로 프록시하면서 새로운 요청 헤더 설정
    const response = NextResponse.rewrite(
        new URL(`${process.env.NEXT_PUBLIC_REAL_SVR_BASE_URL}${newPathname}${request.nextUrl.search}`, request.url),
        {
            request: {
                headers: requestHeaders,
            },
        }
    );

    console.log('response___________')
    console.log(response)

    // // AccessToken이 있는 경우 할당
    // if (authToken) {
    //     response.headers.set('Authorization', `Bearer ${authToken}`);
    // }


    console.log('response__________22222222222222_')
    console.log(response)

    return response;
}