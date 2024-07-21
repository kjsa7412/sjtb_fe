import styles from "./MainContainer.module.scss";
import React from "react";


type Props = {
    children: string | React.ReactNode;
}

const MainContainer = ({children}: Props) =>
    <main className={styles.baseContainer}>{children}</main>

export default MainContainer;
