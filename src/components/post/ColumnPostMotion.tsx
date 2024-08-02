'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import {IPostData} from "@/types/interfaces/post-interface";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";

import styles from './ColumnPostMotion.module.scss';

const ColumnPostMotion = (props: IPostData) => {
    const actionAndNavigate = useActionAndNavigate();
    const onClick = () => actionAndNavigate.actionAndNavigate(`/board/${props.slug}`)


    const [activeIndex, setActiveIndex] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setActiveIndex(true);
    };

    const handleMouseLeave = () => {
        setActiveIndex(false);
    };

    useEffect(() => {
        // Set CSS variable --post-count based on the number of posts
        document.documentElement.style.setProperty('--post-count', `${props.totalPosts}`);
    }, [props.totalPosts]);

    return (
        <button
            className={styles.postContainer}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <Image src={`${!!props.coverImage ? props.coverImage : "/images/banner.jpg"}`} alt='' fill
                   style={{objectFit: 'cover', borderRadius: '10px'}}/>
            <div className={styles.overlay}/>
            <div className={styles.infoContainer}>
                <p className={styles.title}>{props.title}</p>
                <p>{`${props.date} | ${props.writer}`}</p>
                {
                    activeIndex === true &&
                    <p className={styles.excerpt}>
                        {props.excerpt}
                    </p>
                }
            </div>
        </button>
    );
};

export default ColumnPostMotion;
