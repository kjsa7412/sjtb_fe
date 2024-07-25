import React from "react";
import type {Metadata} from "next";
import "@/styles/globals.scss";
import HeaderBase from "@/components/header/HeaderBase";
import {HeaderAction, HeaderLogo, HeaderProfile} from "@/components/header/HeaderItem";
import MainContainer from "@/components/containers/MainContainer";
import ProfileOptionPopup from "@/components/popup/ProfileOptionPopup";
import RecoilRootWrapper from "@/providers/RecoilWrapper";
import ConfirmPopup from "@/components/popup/ConfirmPopup";
import NotifyPopup from "@/components/popup/NotifyPopup";
import EditProfilePopup from "@/components/popup/EditProfilePopup";
import SignInPopup from "@/components/popup/SignInPopup";
import SignUpPopup from "@/components/popup/SignUpPopup";
import BoardOptionPopup from "@/components/popup/BoardOptionPopup";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({children}: Props) {
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
        <body>
            <MainContainer>
                <RecoilRootWrapper>
                    <HeaderBase left={[<HeaderLogo/>]} right={[<HeaderAction/>, <HeaderProfile/>]}/>
                    {children}
                    <BoardOptionPopup/>
                    <ProfileOptionPopup/>
                    <EditProfilePopup/>
                    <SignInPopup/>
                    <SignUpPopup/>
                    <ConfirmPopup/>
                    <NotifyPopup/>
                </RecoilRootWrapper>
            </MainContainer>
        </body>
        </html>
    );
}
