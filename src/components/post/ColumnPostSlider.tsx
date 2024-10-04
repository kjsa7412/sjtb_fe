'use client';

import Image from 'next/image';
import React, {useRef, useState} from "react";

import {IPost, IPostData} from "@/types/interfaces/post-interface";
import {EBlank} from "@/types/enums/common-enum";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";

import styles from './ColumnPostSlider.module.scss';
import Blank from "@/components/blank/Blank";


const ColumnPostSlider = ({posts = []}: { posts: IPostData[] }) => {
    const actionAndNavigate = useActionAndNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const containerRef = useRef(null);


    const handleMouseDown = (e: any) => {
        setIsClick(false);
        document.body.classList.add("stop-scroll");
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        setTranslateX(diff);
    };

    const handleMouseUp = () => {
        if (Math.abs(translateX) === 0) {
            setIsClick(true);
        }

        setIsDragging(false);

        if (translateX > 50 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (translateX < -50 && currentIndex < posts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        setTranslateX(0);
        document.body.classList.remove("stop-scroll");
    };

    const handleTouchStart = (e: any) => {
        document.body.classList.add("stop-scroll");
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: any) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        setTranslateX(diff);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (translateX > 50 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (translateX < -50 && currentIndex < posts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        setTranslateX(0);
        document.body.classList.remove("stop-scroll");
    };

    const handleClick = (postData: IPostData) => {
        // 드래그가 아닌 경우에만 클릭으로 간주
        if (isClick) {
            setIsClick(false);
            actionAndNavigate.actionAndNavigate(`/board/${postData.slug}`);
        }
    };

    return (
        <div className={styles.baseContainer}>
            <button
                className={styles.sliderContainer}
                style={{
                    transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
                    transition: !isDragging ? 'transform 0.5s ease' : 'none',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                ref={containerRef}
            >
                {
                    posts.map((postData) =>
                        <button
                            key={postData.slug + postData.author + postData.datePublished}
                            className={styles.postContainer}
                            onClick={() => handleClick(postData)}
                        >
                            <div className={styles.thumbnail}>
                                <Image src={`${postData.thumbnail}`} alt='' fill style={{objectFit: 'cover'}}/>
                            </div>
                            <Blank type={EBlank.Column} size={20}/>
                            <div className={styles.title}>
                                {postData.title}
                            </div>
                        </button>
                    )
                }
            </button>
            <div className={styles.dotContainer}>
                {posts.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ColumnPostSlider;