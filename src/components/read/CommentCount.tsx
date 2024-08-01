import {EBlank, EIcon} from "@/types/enums/common-enum";

import styles from './CommentCount.module.scss';
import Icons from "@/components/Icons";
import Blank from "@/components/blank/Blank";

const CommentCount = () => {
    return(
        <div className={styles.baseContainer}>
            <Icons iconType={EIcon.Comment} width={24} height={24} fill={'#C0C0C0'}/>
            <Blank type={EBlank.Row} size={10}/>
            40
        </div>
    )
}

export default CommentCount;