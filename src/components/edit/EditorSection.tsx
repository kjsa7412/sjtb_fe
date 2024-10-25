'use client'

import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

import "@/editor/theme/common/style.css";
import "@/editor/theme/frame/style.css";
import { editorAtom } from "@/atoms/editorAtom";
import { darkModeAtom } from "@/atoms/darkModeAtom";
import {Crepe} from "@/editor";

import styles from "@/components/edit/EditorSection.module.scss";

const EditorSection = () => {
    const localCrepeRef = useRef<Crepe | null>(null);
    const [crepeRef, setCrepeRef] = useRecoilState(editorAtom);
    const [rcDarkMode] = useRecoilState(darkModeAtom);
    const [editorClassName, setEditorClassName] = useState(styles.baseContainer);
    const editorSectionRef = useRef<HTMLDivElement | null>(null);

    // 에디터 생성 useEffect
    useEffect(() => {
        const rootElement = document.getElementById('editorSection');

        if (rootElement && !localCrepeRef.current) {
            localCrepeRef.current = new Crepe({ root: rootElement });
            localCrepeRef.current.create().then(() => {
                setCrepeRef(localCrepeRef.current); // Recoil 상태 업데이트
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
