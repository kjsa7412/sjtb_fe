'use client';

import {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {AxiosResponse} from "axios";

import {EBannerType, EBlank} from '@/types/enums/common-enum';
import markdownToHtml from '@/utils/markdownToHtml';
import {IPostData} from "@/types/interfaces/post-interface";
import axiosClient from "@/libs/axiosClient";

import Blank from '@/components/blank/Blank';
import PageContainer from '@/components/containers/PageContainer';
import Banner from '@/components/banner/Banner';
import WriterInfo from '@/components/read/WriterInfo';
import ContentsContainer from '@/components/containers/ContentsContainer';
import BodyContainer from '@/components/containers/BodyContainer';
import TagList from '@/components/read/TagList';
import ReadPost from '@/components/read/ReadPost';
import ActivityBox from '@/components/read/ActivityBox';


interface Props {
    params: {
        slug: string;
    };
}

const getPostBySlugAPI = (slug: string): Promise<AxiosResponse<IPostData>> => {
    return axiosClient.get('/api/getPostBySlug', {
        params: {slug: slug}
    });
};

const Post = (props: Props) => {
    const [post, setPost] = useState<IPostData | undefined>();
    const [content, setContent] = useState<string>('');

    const result_getPostBySlugAPI = useQuery(
        ["result_getPostBySlugAPI"],
        () => getPostBySlugAPI(props.params.slug),
        {
            onSuccess: (data) => {
                setPost(data.data);
            }
        }
    );

    useEffect(() => {
        result_getPostBySlugAPI.refetch();
    }, [])

    useEffect(() => {
        const convertMarkdown = async () => {
            post?.content && setContent(await markdownToHtml(post.content));
        };
        convertMarkdown();
    }, [post]);

    return (
        <PageContainer>
            <Blank type={EBlank.Header}/>
            {
                !post ?
                    <Banner type={EBannerType.Home} title={""}/>
                    :
                    <>
                        <Banner type={EBannerType.Read} title={post.title} author={post.author}
                                dateModified={post.dateModified}/>
                        <BodyContainer>
                            <ContentsContainer>
                                <ReadPost content={content}/>
                                <WriterInfo author={post.author}/>
                                <TagList tags={post.keywords}/>
                                <ActivityBox slug={post.slug}/>
                            </ContentsContainer>
                        </BodyContainer>
                    </>
            }
        </PageContainer>
    );
};

export default Post;
