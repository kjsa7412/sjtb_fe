import {getAllPosts} from "@/utils/postUtil";

import Label from "@/components/label/Label";
import RowContainer from "@/components/containers/RowContainer";
import ColumnPost from "@/components/post/ColumnPost";
import ColumnPostMotion from "@/components/post/ColumnPostMotion";

const PopularPost = () => {
    const allPosts = getAllPosts();
    return (
        <>
            <Label text={'인기 있는 글'}/>
            <RowContainer>
                {
                    allPosts?.map((value, index, array) =>
                        //<ColumnPost key={value.writer + value.slug + value.date} {...value}/>
                        <ColumnPostMotion key={value.writer + value.slug + value.date} {...value}  totalPosts={allPosts.length}/>
                    )
                }
            </RowContainer>
        </>
    )
}

export default PopularPost;