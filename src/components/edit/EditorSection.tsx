'use client'

import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

import "@/editor/theme/common/style.css";
import "@/editor/theme/frame/style.css";
import { editorAtom } from "@/atoms/editorAtom";
import { darkModeAtom } from "@/atoms/darkModeAtom";
import {Crepe} from "@/editor";
import {IPostData} from "@/types/interfaces/post-interface";

import styles from "@/components/edit/EditorSection.module.scss";

interface EditorSectionProps {
    post?: IPostData;
}

const EditorSection = (props: EditorSectionProps) => {
    const localCrepeRef = useRef<Crepe | null>(null);
    const [crepeRef, setCrepeRef] = useRecoilState(editorAtom);
    const [rcDarkMode] = useRecoilState(darkModeAtom);
    const [editorClassName, setEditorClassName] = useState(styles.baseContainer);
    const editorSectionRef = useRef<HTMLDivElement | null>(null);

    // 에디터 생성 useEffect
    useEffect(() => {
        /*
        * 현재 에디터에서 이미지 업로드 할때 브라우저 내장 함수인 crypto.randomUUID()를 사용
        * SSL이 적용된 페이지 또는 localhost의 경우 브라우저에서 crypto.randomUUID()를 정상적으로 호출 가능
        * 하지만 내부용으로 배포 예정인 10.10.20.187 서버는 SSL 적용이 어려운 상태
        * 따라서 http 환경에서 crypto.randomUUID 사용을 위한 함수 재선언
        *
        * */
        if (window.location.hostname === `${process.env.NEXT_PUBLIC_NO_HTTPS_URL}`) {
            crypto.randomUUID = function (): `${string}-${string}-${string}-${string}-${string}` {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    const r = Math.random() * 16 | 0;
                    const v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                }) as `${string}-${string}-${string}-${string}-${string}`; // 타입 단언 추가
            };
        }
        const rootElement = document.getElementById('editorSection');

        if (rootElement && !localCrepeRef.current) {
            localCrepeRef.current = new Crepe({ root: rootElement, defaultValue: props ? props.post?.content : '' });
            localCrepeRef.current.create().then(() => {
                setCrepeRef(localCrepeRef.current); // Recoil 상태 업데이트

                if (editorSectionRef.current) {
                    const walker = document.createTreeWalker(
                        editorSectionRef.current,
                        NodeFilter.SHOW_TEXT,
                        null
                    );

                    let node;
                    while ((node = walker.nextNode())) {
                        if (node.nodeValue && node.nodeValue.includes('\u00A0')) {
                            node.nodeValue = node.nodeValue.replaceAll('\u00A0', '');
                        }
                    }
                }
            });
        }
    }, []);

    // 다크모드 전환 useEffect
    useEffect(() => {
        if (rcDarkMode.isDark) {
            setEditorClassName(`${styles.baseContainer} ${styles.frameDark}`);
        } else {
            setEditorClassName(`${styles.baseContainer} ${styles.frame}`);
        }
    }, [rcDarkMode]);

    /// 이거 지금 editor 위치 땡기는게 문제가 있음
    useEffect(() => {
        const handleResize = () => {
            if (editorSectionRef.current) {
                editorSectionRef.current.scrollIntoView({ behavior: "auto", block: "end" });
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);

        if (editorSectionRef.current) {
            resizeObserver.observe(editorSectionRef.current);
        }

        handleResize();

        return () => {
            if (editorSectionRef.current) {
                resizeObserver.unobserve(editorSectionRef.current);
            }
        };
    }, []);

    return (
        <div
            id="editorSection"
            className={editorClassName}
            ref={editorSectionRef}
        />
    );
};

export default EditorSection;
