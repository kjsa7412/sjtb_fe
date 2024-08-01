import {MouseEventHandler} from "react";

import {EIcon} from "@/types/enums/common-enum";

import styles from "./CloseButton.module.scss";
import Icons from "@/components/Icons";


interface ICloseButton {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const CloseButton = (props : ICloseButton) => {
    return (
        <button className={styles.baseContainer} onClick={props.onClick}>
            <Icons iconType={EIcon.Close} width={24} height={24}/>
        </button>
    )
}

export default CloseButton