import {getAllPosts} from "@/utils/postUtil";
import {EBlank} from "@/types/enums/common-enum";

import Label from "@/components/label/Label";
import RowPost from "@/components/post/RowPost";
import Blank from "@/components/blank/Blank";


const AllPost = () => {
    const allPosts = getAllPosts();
    return (
        <>
            <Label text={'전체 게시글'}/>
            {
                allPosts?.map((value, index, array) =>
                    <>
                        <RowPost key={value.slug + value.author + value.datePublished} postData={value}/>
                        <Blank type={EBlank.Column} size={60}/>
                    </>
                )
            }
        </>
    )
}

export default AllPost;