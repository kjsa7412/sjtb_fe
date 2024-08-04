import styles from "@/components/footer/FooterBase.module.scss";
import {DarkMode, FooterLogo} from "@/components/footer/FooterItem";
import Toggle from "@/components/toggle/Toggle";


const FooterBase = () => {
    return (
        <div className={styles.baseContainer}>
            <div className={styles.content}>
                <FooterLogo/>
                <Toggle/>
            </div>
        </div>
    )
};

export default FooterBase;