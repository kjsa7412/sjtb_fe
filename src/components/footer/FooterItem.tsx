'use client';

import styles from "@/components/footer/FooterItem.module.scss";
import useActionAndNavigate from "@/hooks/useActionAndNavigate";

export const FooterLogo = () => {
    const actionAndNavigate = useActionAndNavigate();

    const onClick = () => {
        actionAndNavigate.actionAndNavigate(`/`);
    }
    return (
        <div className={styles.logoContainer} onClick={onClick}>
            <p>TECH BLOG</p>
        </div>
    );
};