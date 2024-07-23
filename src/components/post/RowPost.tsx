import styles from './RowPost.module.scss';
import Image from 'next/image';
import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";
import {IPost} from "@/types/interfaces/post-interface";
import Link from "next/link";

const RowPost = (props: IPost) => {
    return(
        <Link href={`/board/${props.slug}`}>
            <div className={styles.baseContainer}>
                <div className={styles.thumbnail}>
                    <Image src={`${props.url}`} alt='' fill style={{ objectFit: 'cover' }}/>
                </div>
                <Blank type={EBlank.Row} size={20}/>
                <div className={styles.contentsContainer}>
                    <div className={styles.title}>
                        {props.title}
                    </div>
                    <div className={styles.desc}>
                        {props.desc}
                    </div>
                    <div className={styles.info}>
                        {`${props.date} | ${props.writer}`}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RowPost;