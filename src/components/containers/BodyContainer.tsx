import styles from "./BodyContainer.module.scss";


type Props = {
    children: string | React.ReactNode;
}

const BodyContainer = ({children}: Props) =>
    <div className={styles.baseContainer}>{children}</div>

export default BodyContainer;
