'use client'

import {useState} from "react";

import {EBlank} from "@/types/enums/common-enum";

import PageContainer from "@/components/containers/PageContainer";
import Blank from "@/components/blank/Blank";
import BodyContainer from "@/components/containers/BodyContainer";
import ContentsContainer from "@/components/containers/ContentsContainer";


const TitleInput = ({title, setTitle}: { title: string; setTitle: (value: string) => void }) => {
    return (
        <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
                width: "100%",
                fontSize: "42px",
                marginTop: "20px",
                boxSizing: "border-box",
            }}
        />
    );
};

const New = () => {
    const [title, setTitle] = useState("");


    return (
        <PageContainer>
            <Blank type={EBlank.Header}/>
            <BodyContainer>
                <ContentsContainer>
                    <Blank type={EBlank.Column} size={60}/>
                    <TitleInput title={title} setTitle={setTitle}/>
                </ContentsContainer>
            </BodyContainer>
        </PageContainer>
    );
};

export default New;
