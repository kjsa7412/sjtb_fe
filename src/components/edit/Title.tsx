'use client'

import React from "react";

import styles from './Title.module.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Title = ({ onKeyPress }) => {
    const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // textarea의 높이를 scrollHeight에 맞춰 조정
        e.target.style.height = 'auto'; // 초기화
        e.target.style.height = `${e.target.scrollHeight}px`; // 스크롤 높이에 맞추기
    };

    return (
        <div className={styles.baseContainer}>
            <textarea
                rows={1}
                className={styles.inputBox}
                placeholder="Title"
                onKeyPress={onKeyPress}
                onChange={handleResizeHeight} // 높이 자동 조정 호출
                style={{ resize: 'none', overflow: 'hidden' }} // 수동 크기 조정을 비활성화하고 overflow 숨김 처리
            />
        </div>
    );
}

export default Title;
