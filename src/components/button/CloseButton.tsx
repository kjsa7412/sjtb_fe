import styles from "./CloseButton.module.scss";
import Icons from "@/components/Icons";
import {EIcon} from "@/types/enums/common-enum";

interface ICloseButton {
    onClick: Function
}

const CloseButton = (props : ICloseButton) => {
    return (
        <div className={styles.baseContainer} onClick={props.onClick}>
            <Icons iconType={EIcon.Close} width={"24"} height={"24"}/>
        </div>
    )
}

export default CloseButton