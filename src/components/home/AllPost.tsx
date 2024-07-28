import Label from "@/components/label/Label";
import {getAllPosts} from "@/utils/postUtil";
import RowPost from "@/components/post/RowPost";
import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";

const AllPost = () => {
    const allPosts = getAllPosts();
    return (
        <>
            <Label text={'전체 게시글'}/>
            {
                allPosts?.map((value, index, array) =>
                    <>
                        <RowPost key={value.writer + value.slug + value.date} {...value}/>
                        <Blank type={EBlank.Column} size={60}/>
                    </>
                )
            }
        </>
    )
}

export default AllPost;