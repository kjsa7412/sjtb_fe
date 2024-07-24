import styles from './ReadComment.module.scss';
import Icons from "@/components/Icons";
import {EBlank, EIcon} from "@/types/enums/common-enum";
import Blank from "@/components/blank/Blank";
import Line from "@/components/line/Line";

const ReadComment = () => {

    return (
        <div className={styles.baseContainer}>
            <Line/>
            <div className={styles.bodyContainer}>
                <div className={styles.writerInfo}>
                    <Icons iconType={EIcon.Avatar} width={'26'} height={'26'} fill={'#C0C0C0'}/>
                    <Blank type={EBlank.Row} size={10}/>
                    <p className={styles.writerInfoWriter}>
                        User
                    </p>
                    <Blank type={EBlank.Row} size={10}/>
                    <p className={styles.writerInfoDate}>
                        2024년 5월 30일
                    </p>
                </div>
                <div className={styles.comment}>
                    좋은 글 감사합니다.
                </div>
            </div>
        </div>
    )
}

export default ReadComment;