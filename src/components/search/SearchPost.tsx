import Label from "@/components/label/Label";
import {getAllPosts} from "@/utils/postUtil";
import RowPost from "@/components/post/RowPost";
import Blank from "@/components/blank/Blank";
import {EBlank} from "@/types/enums/common-enum";

const SearchPost = () => {
    const allPosts = getAllPosts();
    return (
        <>
            <Label text={'검색 결과'}/>
            {
                allPosts?.map((value, index, array) =>
                    <>
                        <RowPost {...value}/>
                        <Blank type={EBlank.Column} size={60}/>
                    </>
                )
            }
        </>
    )
}

export default SearchPost;