import styles from './Like.module.scss';
import Icons from "@/components/Icons";
import {EBlank, EIcon} from "@/types/enums/common-enum";
import Blank from "@/components/blank/Blank";

const Like = () => {
    return(
        <div className={styles.baseContainer}>
            <Icons iconType={EIcon.Like1} width={"24"} height={"24"} fill={'#C0C0C0'}/>
            <Blank type={EBlank.Row} size={10}/>
            4,954
        </div>
    )
}

export default Like;