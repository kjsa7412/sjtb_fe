import styles from './WriteComment.module.scss';
import TextButton from "@/components/button/TextButton";
import {EButtonShape, EButtonSize, EButtonType} from "@/types/enums/common-enum";

const WriteComment = () => {
    return (
        <div className={styles.baseContainer}>
            <textarea className={styles.textBox}>

            </textarea>
            <div className={styles.buttonContainer}>
                <TextButton controller={{label: "등록"}} styles={{
                    size: EButtonSize.Small,
                    shape: EButtonShape.Round,
                    type: EButtonType.Black
                }}/>
            </div>
        </div>
    )
}

export default WriteComment;