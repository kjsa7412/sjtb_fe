'use client';

import styles from './ColumnPost.module.scss';
import Image from 'next/image';
import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";
import {IPostData} from "@/types/interfaces/post-interface";
import {IPostAtom, postAtom} from "@/atoms/postAtom";
import {useRecoilState} from "recoil";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";
import {userAtom} from "@/atoms/userAtom";
import {IUser} from "@/types/interfaces/common-interface";

const ColumnPost = (props: IPostData) => {
    const actionAndNavigate = useActionAndNavigate();
    const [rcPost, setRcPost] = useRecoilState<IPostAtom>(postAtom);
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);

    const onClick = () => {
        actionAndNavigate.actionAndNavigate(
            `/board/${props.slug}`,
            setRcPost({
                slug: props.slug,
                isMe: props.writer === rcUser.userId
            })
        )
    }

    return (
        <div className={styles.baseContainer} onClick={onClick}>
            <div className={styles.thumbnail}>
                <Image src={`${!!props.coverImage ? props.coverImage : "/images/banner.jpg"}`} alt='' fill
                       style={{objectFit: 'cover'}}/>
            </div>
            <Blank type={EBlank.Column} size={20}/>
            <div className={styles.title}>
                {props.title}
            </div>
            <div className={styles.info}>
                {`${props.date} | ${props.writer}`}
            </div>
        </div>
    )
}


export default ColumnPost;