'use client'

import {useRecoilState} from "recoil";

import {EBlank, EIcon, EPopup} from "@/types/enums/common-enum";
import {IResult_CmmtList} from "@/types/interfaces/post-interface";
import {IMG} from "@/contants/common";
import {IUser} from "@/types/interfaces/common-interface";
import {userAtom} from "@/atoms/userAtom";
import usePopup from "@/hooks/usePopup";

import styles from './ReadComment.module.scss';
import Icons from "@/components/Icons";
import Blank from "@/components/blank/Blank";
import Line from "@/components/line/Line";

interface Props {
    comment: IResult_CmmtList; // comment prop 추가
}

const ReadComment = ({ comment }: Props) => {
    const popupController = usePopup();
    const [rcUser, setRcUser] = useRecoilState<IUser>(userAtom);

    const handleDeleteComment = () => {
        if (true) {
            popupController.openPopup(EPopup.Confirm, {contents: {title: "댓글 삭제(미구현)", desc: "댓글을 삭제 하시겠습니까?", yesLabel: "YES", noLabel: "NO"}});
            return;
        }

        // signOut.mutate();
    };

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
                    <Blank type={EBlank.Row} size={10}/>
                    {comment.userId === rcUser.userId &&
                        <button className={styles.delButton} onClick={handleDeleteComment}>
                            delete
                        </button>
                    }
                </div>
                <div className={styles.comment}>
                    {comment.cmt}
                </div>
            </div>
        </div>
    )
}

export default ReadComment;