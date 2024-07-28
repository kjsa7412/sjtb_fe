import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(req: NextRequest) {
    const searchTerm = req.nextUrl.searchParams.get('q');

    if (!searchTerm || typeof searchTerm !== 'string') {
        return NextResponse.json({ error: 'Query parameter "q" is required and should be a string' }, { status: 400 });
    }

    const files = fs.readdirSync(path.join(process.cwd(), '_posts'));  // MD 파일들이 있는 디렉토리

    const results = files.map(file => {
        const filePath = path.join(process.cwd(), '_posts', file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { data, content: mdContent } = matter(content);

        // 제목, 발췌문, 본문 내용에서 검색어를 찾습니다.
        if (
            data.title.includes(searchTerm) ||
            data.excerpt.includes(searchTerm) ||
            mdContent.includes(searchTerm)
        ) {
            return { slug: file.replace('.md', '')};
        }
        return null;
    }).filter(result => result !== null);

    return NextResponse.json(results, { status: 200 });
}
