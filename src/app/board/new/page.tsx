'use client'

import { useState, useRef, useEffect } from "react";

import { EBlank } from "@/types/enums/common-enum";

import PageContainer from "@/components/containers/PageContainer";
import Blank from "@/components/blank/Blank";
import BodyContainer from "@/components/containers/BodyContainer";
import ContentsContainer from "@/components/containers/ContentsContainer";
import Title from "@/components/edit/Title";
import PlainText from "@/components/edit/PlainText";

type PlainTextRefType = HTMLInputElement | HTMLTextAreaElement;

interface PlainText {
    id: number;
    value: string;
}

const New = () => {
    const [plainTexts, setPlainTexts] = useState<PlainText[]>([{ id: 1, value: "" }]);
    const plainTextRefs = useRef<(PlainTextRefType)[]>([]);


    useEffect(() => {
        // 새로 추가된 마지막 PlainText에 포커스 이동
        if (plainTexts.length > 0) {
            plainTextRefs.current[plainTexts.length - 1]?.focus();
        }
    }, [plainTexts]);

    const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            plainTextRefs.current[0]?.focus(); // 첫 번째 PlainText로 포커스 이동
        }
    };

    const handlePlainTextKeyPress = (index: number, e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setPlainTexts((prev) => [
                ...prev,
                { id: prev.length + 1, value: "" }
            ]);
        } else if (e.key === "Backspace" && plainTexts[index].value === "") {
            e.preventDefault();
            if (plainTexts.length > 1) {
                setPlainTexts((prev) => prev.filter((_, i) => i !== index));
            }
        }
    };

    const handlePlainTextChange = (index: number, newValue: string) => {
        setPlainTexts((prev) =>
            prev.map((plainText, i) => (i === index ? { ...plainText, value: newValue } : plainText))
        );
    };

    return (
        <PageContainer>
            <Blank type={EBlank.Header} />
            <BodyContainer>
                <ContentsContainer>
                    <Blank type={EBlank.Column} size={60} />
                    <Title onKeyPress={handleTitleKeyPress} />
                    {plainTexts.map((plainText, index) => (
                        <PlainText
                            key={plainText.id}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            value={plainText.value}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handlePlainTextChange(index, e.target.value)} // 타입 명시
                            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => handlePlainTextKeyPress(index, e)} // 타입 명시
                            ref={(el: PlainTextRefType | null) => {
                                if(el !== null) {
                                    plainTextRefs.current[index] = el; // el을 반환하지 않음
                                }
                            }}
                        />
                    ))}
                </ContentsContainer>
            </BodyContainer>
        </PageContainer>
    );
};

export default New;
