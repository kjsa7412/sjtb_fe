import React from "react";

import "@/styles/globals.scss";
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
import SearchBar from "@/components/searchBar/SearchBar";
import SearchPopup from "@/components/popup/SearchPopup";

export async function generateMetadata() {
    return getMetadata();
}

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
        <body style={{backgroundColor: `var(--color-background-1)`}}>
        <ReactQueryWrapper>
            <RecoilRootWrapper>
                <MainContainer>
                    {/* eslint-disable-next-line react/jsx-key */}
                    <HeaderBase left={[<HeaderLogo/>, <HeaderSearch/>, <SearchBar/>]} right={[<HeaderAction/>, <HeaderProfile/>]}/>
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
