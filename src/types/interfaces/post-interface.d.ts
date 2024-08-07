export interface IPost {
    url: string,
    title: string,
    desc?: string,
    date: string,
    writer: string,
    slug: string
}

export interface IPostData {
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    keywords: string[];
    author: string
    datePublished: string;
    dateModified: string;
    content: string;
}