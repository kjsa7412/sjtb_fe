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
    date: string;
    coverImage: string;
    author: {
        name: string;
        picture: string;
    };
    writer: string;
    excerpt: string;
    ogImage: {
        url: string;
    };
    content: string;
    preview?: boolean;
}