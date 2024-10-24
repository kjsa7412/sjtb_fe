import "@/styles/globals.scss";
import {Viewport} from "next";
import React from "react";

import RecoilRootWrapper from "@/providers/RecoilWrapper";
import ReactQueryWrapper from "@/providers/ReactQueryWrapper";
import {getMetadata} from "@/seo/metadata/getMetadata";

import HeaderBase from "@/components/header/HeaderBase";
import {HeaderAction, HeaderLogo, HeaderProfile, HeaderSearch} from "@/components/header/HeaderItem";
import MainContainer from "@/components/containers/MainContainer";
import ProfileOptionPopup from "@/components/popup/ProfileOptionPopup";
import ConfirmPopup from "@/components/popup/ConfirmPopup";
import NotifyPopup from "@/components/popup/NotifyPopup";
import EditProfilePopup from "@/components/popup/EditProfilePopup";
import SignInPopup from "@/components/popup/SignInPopup";
import SignUpPopup from "@/components/popup/SignUpPopup";
import BoardOptionPopup from "@/components/popup/BoardOptionPopup";
import SearchPopup from "@/components/popup/SearchPopup";

export async function generateMetadata() {
    return getMetadata();
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({children}: Props) {
    //todo: footer를 페이지별로가 아닌 여기서 추가해야 하는지 여쭤봐야함
    //todo: new 페이지 로그인 안되어있으면 못들어가게
    //todo: 에디터에서 사진은 글 작성할 때 한번에 보내는걸로, 해시태그 작성하는 input 만들어줘야함
    //todo: 에디터 스크롤 자동 옮겨지는거 구현해야함
    
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
            <link href="https://cdn.jsdelivr.net/gh/sunn-us/SUITE/fonts/static/woff2/SUITE.css" rel="stylesheet"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700&family=Roboto:wght@100;400;700&display=swap"
                rel="stylesheet"/>
        </head>
        <body style={{backgroundColor: `var(--color-background-1)`}}>
        <ReactQueryWrapper>
            <RecoilRootWrapper>
                <MainContainer>
                    {/* eslint-disable-next-line react/jsx-key */}
                    <HeaderBase left={[<HeaderLogo/>, <HeaderSearch/>]} right={[<HeaderAction/>, <HeaderProfile/>]}/>
                    {children}
                    <BoardOptionPopup/>
                    <ProfileOptionPopup/>
                    <EditProfilePopup/>
                    <SignInPopup/>
                    <SignUpPopup/>
                    <ConfirmPopup/>
                    <NotifyPopup/>
                    <SearchPopup/>
                </MainContainer>
            </RecoilRootWrapper>
        </ReactQueryWrapper>
        </body>
        </html>
    );
}
