import {EIcon} from "@/types/enums/common-enum";

import styles from './WriterInfo.module.scss';
import Icons from "@/components/Icons";

const WriterInfo = () => {
    return (
        <div className={styles.baseContainer}>
            <div className={styles.avatarContainer}>
                <Icons iconType={EIcon.Avatar} width={62} height={62} fill={'#C0C0C0'}/>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.username}>user</div>
                <div className={styles.desc}>desc</div>
            </div>
        </div>
    )
}

export default WriterInfo;

