import styles from "@/components/footer/FooterBase.module.scss";
import {FooterLogo} from "@/components/footer/FooterItem";


const FooterBase = () => {
    return (
        <div className={styles.baseContainer}>
            <div className={styles.content}>
                <FooterLogo/>
            </div>
        </div>
    )
};

export default FooterBase;