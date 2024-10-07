import {EBlank, EIcon} from "@/types/enums/common-enum";
import {IResult_CmmtList} from "@/types/interfaces/post-interface";
import {IMG} from "@/contants/common";

import styles from './ReadComment.module.scss';
import Icons from "@/components/Icons";
import Blank from "@/components/blank/Blank";
import Line from "@/components/line/Line";

interface Props {
    comment: IResult_CmmtList; // comment prop 추가
}

const ReadComment = ({ comment }: Props) => {

    return (
        <div className={styles.baseContainer}>
            <Line/>
            <div className={styles.bodyContainer}>
                <div className={styles.writerInfo}>
                    {comment.profilePicPath ? <Icons iconType={EIcon.Avatar} width={30} height={30} fill={IMG.DefaultPath + comment.profilePicPath} /> : <Icons iconType={EIcon.Avatar} width={30} height={30} fill={'#C0C0C0'} />}
                    <Blank type={EBlank.Row} size={10}/>
                    <p className={styles.writerInfoWriter}>
                        {comment.userName}
                    </p>
                    <Blank type={EBlank.Row} size={10}/>
                    <p className={styles.writerInfoDate}>
                        {comment.writeDate}
                    </p>
                </div>
                <div className={styles.comment}>
                    {comment.cmt}
                </div>
            </div>
        </div>
    )
}

export default ReadComment;