import styles from './Banner.module.scss';

const Banner = () => {
    return (
        <div className={styles.baseContainer}>
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <p>Welcome</p>
                </div>
            </div>
        </div>
    )
};

export default Banner;