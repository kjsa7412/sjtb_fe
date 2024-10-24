'use client';

import React, {useRef, useEffect, useState} from "react";
import { useRecoilState } from "recoil";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions,import/order
import { Crepe } from '@/editor/core/crepe.ts';

import "@/editor/theme/common/style.css";
import "@/editor/theme/frame/style.css";
import { darkModeAtom } from "@/atoms/darkModeAtom";

import styles from "@/components/edit/EditorSection.module.scss";

const EditorSection = () => {
    const crepeRef = useRef<Crepe | null>(null);
    const [rcDarkMode] = useRecoilState(darkModeAtom);
    const [editorClassName, setEditorClassName] = useState(styles.baseContainer);

    useEffect(() => {
        const rootElement = document.getElementById('editorSection');

        if (rootElement && !crepeRef.current) { // crepeRef가 null일 때만 생성
            crepeRef.current = new Crepe({
                root: rootElement
            });

            // 에디터 생성
            crepeRef.current.create().then(() => {
                console.log('Editor created');
            });
        }
    }, []);

    useEffect(() => {
        // 다크 모드에 따라 클래스 변경
        if (rcDarkMode.isDark) {
            setEditorClassName(`${styles.baseContainer} ${styles.frameDark}`);
        } else {
            setEditorClassName(`${styles.baseContainer} ${styles.frame}`);
        }
    }, [rcDarkMode]);


    // const toMarkDown = () => {
    //     if (crepeRef.current) {
    //         console.log(crepeRef.current.getMarkdown());
    //     }
    // };

    return (
        <div
            id="editorSection"
            className={editorClassName}
        />
    );
};

export default EditorSection;
