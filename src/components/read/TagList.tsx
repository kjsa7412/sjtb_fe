import styles from './TagList.module.scss';
import Tag from "@/components/read/Tag";
import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";

const TagList = () => {
    return(
        <div className={styles.baseContainer}>
            <Tag/>
            <Blank type={EBlank.Row} size={20}/>
            <Tag/>
            <Blank type={EBlank.Row} size={20}/>
            <Tag/>
            <Blank type={EBlank.Row} size={20}/>
            <Tag/>
        </div>
    )
}

export default TagList;