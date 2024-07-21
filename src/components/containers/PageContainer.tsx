import styles from "./PageContainer.module.scss";


type Props = {
    children: string | React.ReactNode;
}

const PageContainer = ({children}: Props) =>
    <div className={styles.baseContainer}>{children}</div>

export default PageContainer;
