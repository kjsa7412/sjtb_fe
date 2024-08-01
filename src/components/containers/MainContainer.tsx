import React from "react";

import styles from "./MainContainer.module.scss";

type Props = {
    children: string | React.ReactNode;
}

const MainContainer = ({children}: Props) =>
    <main className={styles.baseContainer}>{children}</main>

export default MainContainer;
