'use client';

import Link from "next/link";
import PageContainer from "@/components/containers/PageContainer";
import Blank from "@/components/blank/Blank";
import {EBlank, EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";
import Banner from "@/components/banner/Banner";
import FooterBase from "@/components/footer/FooterBase";
import TextButton from "@/components/button/TextButton";
import {IOptionPopup} from "@/types/interfaces/popup-interface";
import {confirmPopupAtom} from "@/atoms/confirmPopupAtom";
import {useRecoilState} from "recoil";
import {notifyPopupAtom} from "@/atoms/notifyPopupAtom";
import {editProfilePopupAtom} from "@/atoms/editProfilePopupAtom";
import {signInPopupAtom} from "@/atoms/signInPopupAtom";
import {signUpPopupAtom} from "@/atoms/signUpPopupAtom";
import ColumnPost from "@/components/post/ColumnPost";
import RowPost from "@/components/post/RowPost";
import BodyContainer from "@/components/containers/BodyContainer";
import ContentsContainer from "@/components/containers/ContentsContainer";
import Label from "@/components/label/Label";
import RowContainer from "@/components/containers/RowContainer";
import Input from "@/components/input/Input";

const Index = () => {
    const [rcConfirmOptionPopup, setRcConfirmOptionPopup] = useRecoilState<IOptionPopup>(confirmPopupAtom);
    const [rcNotifyOptionPopup, setRcNotifyOptionPopup] = useRecoilState<IOptionPopup>(notifyPopupAtom);
    const [rcEditProfilePopupAtom, setRcEditProfilePopupAtom] = useRecoilState<IOptionPopup>(editProfilePopupAtom);
    const [rcSignInPopupAtom, setRcSignInPopupAtom] = useRecoilState<IOptionPopup>(signInPopupAtom);
    const [rcSignUpPopupAtom, setRcSignUpPopupAtom] = useRecoilState<IOptionPopup>(signUpPopupAtom);

    return (
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <Banner/>
            <BodyContainer>
                <ContentsContainer>
                    <Label text={'인기 있는 글'}/>
                    <RowContainer>
                        <ColumnPost url={'/images/banner.jpg'} title={'Dynamic Routing and Static Generation'} date={'2024. 6. 1'} writer={'KJSA'}/>
                        <ColumnPost url={'/images/banner.jpg'} title={'Dynamic Routing and Static Generation'} date={'2024. 6. 1'} writer={'KJSA'}/>
                        <ColumnPost url={'/images/banner.jpg'} title={'Dynamic Routing and Static Generation'} date={'2024. 6. 1'} writer={'KJSA'}/>
                    </RowContainer>
                    <Blank type={EBlank.Column} size={30}/>
                    <Label text={'전체 게시글'}/>
                    <RowPost url={'/images/banner.jpg'} title={'Dynamic Routing and Static Generation'} date={'2024. 6. 1'} writer={'KJSA'}
                             desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
                                 'Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi \n' +
                                 'tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra\n' +
                                 ' pharetra massa massa ultricies.'}/>
                    <Blank type={EBlank.Column} size={60}/>
                    <RowPost url={'/images/banner.jpg'} title={'Dynamic Routing and Static Generation'} date={'2024. 6. 1'} writer={'KJSA'}
                             desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
                                 'Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi \n' +
                                 'tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra\n' +
                                 ' pharetra massa massa ultricies.'}/>
                    <Blank type={EBlank.Column} size={60}/>
                    <RowPost url={'/images/banner.jpg'} title={'Dynamic Routing and Static Generation'} date={'2024. 6. 1'} writer={'KJSA'}
                             desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
                                 'Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi \n' +
                                 'tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra\n' +
                                 ' pharetra massa massa ultricies.'}/>
                    <Blank type={EBlank.Column} size={60}/>
                    <RowPost url={'/images/banner.jpg'} title={'Dynamic Routing and Static Generation'} date={'2024. 6. 1'} writer={'KJSA'}
                             desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
                                 'Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi \n' +
                                 'tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra\n' +
                                 ' pharetra massa massa ultricies.'}/>
                    <Blank type={EBlank.Column} size={60}/>
                    <RowPost url={'/images/banner.jpg'} title={'Dynamic Routing and Static Generation'} date={'2024. 6. 1'} writer={'KJSA'}
                             desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n' +
                                 'Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi \n' +
                                 'tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra\n' +
                                 ' pharetra massa massa ultricies.'}/>
                    <Blank type={EBlank.Column} size={60}/>
                    <Blank type={EBlank.Column} size={100}/>
                    <TextButton controller={{
                        isOpen: true, onClick: () => {
                            setRcConfirmOptionPopup((prev) => ({
                                ...prev,
                                isOpen: !prev.isOpen
                            }));
                        }, label: "Confirm Popup"
                    }} styles={{size: EButtonSize.Large, shape: EButtonShape.Round, type: EButtonType.Stroke}}/>
                    <TextButton controller={{
                        isOpen: true, onClick: () => {
                            setRcNotifyOptionPopup((prev) => ({
                                ...prev,
                                isOpen: !prev.isOpen
                            }));
                        }, label: "Notify Popup"
                    }} styles={{size: EButtonSize.Large, shape: EButtonShape.Round, type: EButtonType.Red}}/>
                    <TextButton controller={{
                        isOpen: true, onClick: () => {
                            setRcEditProfilePopupAtom((prev) => ({
                                ...prev,
                                isOpen: !prev.isOpen
                            }));
                        }, label: "Edit Profile Popup"
                    }} styles={{size: EButtonSize.Large, shape: EButtonShape.Round, type: EButtonType.Black}}/>
                    <TextButton controller={{
                        isOpen: true, onClick: () => {
                            setRcSignInPopupAtom((prev) => ({
                                ...prev,
                                isOpen: !prev.isOpen
                            }));
                        }, label: "Sign In"
                    }} styles={{size: EButtonSize.Large, shape: EButtonShape.Square, type: EButtonType.None}}/>
                    <TextButton controller={{
                        isOpen: true, onClick: () => {
                            setRcSignUpPopupAtom((prev) => ({
                                ...prev,
                                isOpen: !prev.isOpen
                            }));
                        }, label: "Sign Up"
                    }} styles={{size: EButtonSize.Large, shape: EButtonShape.Square, type: EButtonType.Black}}/>
                    <Link href={`/board/new`}><p style={{fontSize: '50px'}}>new</p></Link>
                </ContentsContainer>
            </BodyContainer>
            <FooterBase/>
        </PageContainer>
    );
}

export default Index;