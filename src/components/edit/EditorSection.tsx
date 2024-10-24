'use client'

import React, { useRef, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
import { Crepe } from '@/editor/core/crepe.ts';

import "@/editor/theme/common/style.css";
import "@/editor/theme/frame/style.css";
import styles from "@/components/edit/EditorSection.module.scss";

const EditorSection = () => {
    const crepeRef = useRef<Crepe | null>(null);

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

    const onClick = () => {
        if (crepeRef.current) {
            console.log(crepeRef.current.getMarkdown());
        }
    };

    return (
        <div id='editorSection' className={styles.baseContainer}/>
    );
};

export default EditorSection;
