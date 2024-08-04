import markdownStyles from '@/styles/_markdown.module.scss';

import styles from './ReadPost.module.scss';

type Props = {
    content: string;
};

const ReadPost = ({ content }: Props) => {
    return (
        <div className={styles.baseContainer} >
            <div
                className={markdownStyles.markdown}
                style={{color: `var(--color-text-1)`}}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}

export default ReadPost