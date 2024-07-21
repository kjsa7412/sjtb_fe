import styles from "@/components/footer/FooterItem.module.scss";
import Link from "next/link";

export const FooterLogo = () => {
    return (
        <div className={styles.logoContainer}>
            <Link href={`/`}>
                <p>TECH BLOG</p>
            </Link>
        </div>
    );
};