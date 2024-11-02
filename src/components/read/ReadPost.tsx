import markdownStyles from '@/styles/_markdown.module.scss';

import styles from './ReadPost.module.scss';

type Props = {
    content: string;
};

const ReadPost = ({ content }: Props) => {

    const processHtmlContent = (htmlContent: string) => {
        // 리스트 아이템이 있는 경우 사전 가공 (줄별로 체크)
        const lines: string[] = htmlContent.split('\n');
        let formattedContent = '';

        for (let i = 0; i < lines.length; i++) {
            const temp: string = lines[i]
                .replace(/<li>\s*<\/li>/g, '<li><p>&nbsp;</p></li>') // <li></li>에 대해 처리
                .replace(/<li>(?!<p>)([^<]*)<\/li>/g, (match, text) => {
                    // 내용이 있는 <li> 태그 처리
                    return `<li><p>${text}</p></li>`;
                })
                .replace(/<li>(.*?)$/, (match) => {
                    // 두 번째 replace가 실행된 경우 무시하도록 플래그 설정
                    if (match.includes('<p>')) {
                        return match; // <p>가 포함되어 있으면 그대로 반환
                    }

                    // <li> 태그만 있을 경우 처리
                    if (match === '<li>' && lines[i + 1] === '<ul>') {
                        return `<li><p>&nbsp;</p>`; // 다음 태그가 <ul>인 경우 줄바꿈이 필요하여 태그 변환
                    } else if (match === '<li>' ) {
                        return '<li>' // <li> 태그만 있는 경우 변환 X
                    }

                    // <li> 태그와 내용이 같이 있는 케이스
                    // ex) <li>내용 --> 이런식의 케이스
                    return `<li><p>${match.slice(4)}</p>`;
                });

            if (lines[i] !== temp) {
                formattedContent += temp; // 교체된 태그값 추가
            } else {
                formattedContent += lines[i]; // 기존 태그값 추가
            }
            formattedContent += '\n'; // 각 줄 끝에 줄바꿈 추가
        }

        return formattedContent
            // <p> 태그로 감싸진 <img> 태그에서 <p> 태그 제거
            .replace(/<p>(<img[^>]+>)<\/p>/g, '$1')
        
            /// 아래의 이미지 변환은 일부 코드 수정이 필요
            // // alt 속성 값을 기반으로 width 스타일을 동적으로 추가, alt 값 * 100 적용
            // .replace(/<img([^>]+alt="([\d.]+)"[^>]*)>/g, (_, attributes, altValue) => {
            //     const width = parseFloat(altValue) * 100;
            //     return `<img${attributes} style="width: ${width}%; margin: auto; display: block">`;
            // })
            // // alt 속성이 없거나 다른 텍스트인 경우 기본 width를 100%로 설정
            // .replace(/<img((?!style)[^>]*)>/g, '<img$1 style="width: 100%;">')
    };

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