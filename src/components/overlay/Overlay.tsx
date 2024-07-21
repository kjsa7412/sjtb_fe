import styles from "./Overlay.module.scss";
import React from "react";


type Props = {
    children: React.ReactNode;
}

const Overlay = ({children}: Props) =>
    <div className={styles.baseContainer}>{children}</div>

export default Overlay;
