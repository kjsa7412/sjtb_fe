'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import {IPostData} from "@/types/interfaces/post-interface";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";

import styles from './ColumnPostMotion.module.scss';

const ColumnPostMotion = ({postData, postCount}: {postData: IPostData, postCount: number}) => {
    const actionAndNavigate = useActionAndNavigate();
    const onClick = () => actionAndNavigate.actionAndNavigate(`/board/${postData.slug}`)


    const [activeIndex, setActiveIndex] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setActiveIndex(true);
    };

    const handleMouseLeave = () => {
        setActiveIndex(false);
    };

    useEffect(() => {
        document.documentElement.style.setProperty('--post-count', `${postCount}`);
    }, [postCount]);

    return (
        <button
            className={styles.postContainer}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <Image src={`${postData.thumbnail ? postData.thumbnail : "/images/banner.jpg"}`} alt='' fill
                   style={{objectFit: 'cover', borderRadius: '10px'}}/>
            <div className={styles.overlay}/>
            <div className={styles.infoContainer}>
                <p className={styles.title}>{postData.title}</p>
                <p>{`${postData.dateModified} | ${postData.author}`}</p>
                {
                    activeIndex === true &&
                    <p className={styles.excerpt}>
                        {postData.description}
                    </p>
                }
            </div>
        </button>
    );
};

export default ColumnPostMotion;
