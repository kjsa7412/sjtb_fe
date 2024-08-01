import {EBlank} from "@/types/enums/common-enum";

import styles from './Reaction.module.scss';
import Like from "@/components/read/Like";
import Blank from "@/components/blank/Blank";
import CommentCount from "@/components/read/CommentCount";

const Reaction = () => {
    return(
        <div className={styles.baseContainer}>
            <Like/>
            <Blank type={EBlank.Row} size={20}/>
            <CommentCount/>
        </div>
    )
}

export default Reaction;