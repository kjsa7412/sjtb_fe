'use client';

import useActionAndNavigate from "@/hooks/useActionAndNavigate";

import styles from "@/components/footer/FooterItem.module.scss";

export const FooterLogo = () => {
    const actionAndNavigate = useActionAndNavigate();

    const onClick = () => {
        actionAndNavigate.actionAndNavigate(`/`);
    }
    return (
        <button className={styles.logoContainer} onClick={onClick}>
            <p>TECH BLOG</p>
        </button>
    );
};