import Label from "@/components/label/Label";
import RowContainer from "@/components/containers/RowContainer";
import ColumnPost from "@/components/post/ColumnPost";
import {getAllPosts} from "@/utils/postUtil";

const PopularPost = () => {
    const allPosts = getAllPosts();
    return (
        <>
            <Label text={'인기 있는 글'}/>
            <RowContainer>
                {
                    allPosts?.map((value, index, array) =>
                        <ColumnPost {...value}/>
                    )
                }
            </RowContainer>
        </>
    )
}

export default PopularPost;