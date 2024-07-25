import markdownStyles from '@/styles/_markdown.module.scss';
import styles from './ReadPost.module.scss';

type Props = {
    content: string;
};

const ReadPost = ({ content }: Props) => {
    return (
        <div className={styles.baseContainer}>
            <div
                className={markdownStyles.markdown}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}

export default ReadPost