import markdownStyles from '@/styles/_markdown.module.scss';

import styles from './ReadPost.module.scss';

type Props = {
    content: string;
};

const ReadPost = ({ content }: Props) => {

    const processHtmlContent = (htmlContent: any) => {
        // 1. <p> 태그로 감싸진 <img> 태그를 찾아서 <p> 태그를 제거
        // 2. <img> 태그에 width: 100%; 스타일을 추가
        return htmlContent
            .replace(/<p>(<img[^>]+>)<\/p>/g, '$1')  // p 태그 제거
            .replace(/<img([^>]+)>/g, '<img$1 style="width: 100%;">'); // img 태그에 스타일 추가
    }

    return (
        <div className={styles.baseContainer} >
            <div
                className={markdownStyles.markdown}
                style={{color: `var(--color-text-1)`}}
                dangerouslySetInnerHTML={{ __html: processHtmlContent(content) }}
            />
        </div>
    );
}

export default ReadPost