import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

import { IPostData } from "@/types/interfaces/post-interface";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): IPostData | undefined {
    if (!slug) return;

    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process the keywords field to be an array of strings
    const keywords = data.keywords && typeof data.keywords === 'string'
        ? data.keywords.split(',').map(keyword => keyword.trim())
        : [];

    return { ...data, slug: realSlug, content, keywords } as IPostData;
}

export function getAllPosts(): IPostData[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is IPostData => post !== undefined) // undefined 제거
        .sort((post1, post2) => (post1.dateModified > post2.dateModified ? -1 : 1));
    return posts;
}
