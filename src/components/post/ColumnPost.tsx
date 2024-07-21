import styles from './ColumnPost.module.scss';
import Image from 'next/image';
import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";
import {IPost} from "@/types/interfaces/post-interface";

const ColumnPost = (props: IPost) => {
    return(
        <div className={styles.baseContainer}>
            <div className={styles.thumbnail}>
                <Image src={`${props.url}`} alt='' fill style={{ objectFit: 'cover' }}/>
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