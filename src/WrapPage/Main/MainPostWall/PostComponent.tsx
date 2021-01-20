import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {ItemPostType} from "../../../Store/Reducer with Include Selector/ProfilePage/Profile.Reducer";

interface Props {
    itemsPost: ItemPostType,
    onRemovePostHandler: (id: string) => void
}

const PostComponent: React.FC<Props> = ({
                                            itemsPost,
                                            onRemovePostHandler

                                        }) => {
    const date = new Date()
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return (<div key={itemsPost.id}>
        <div>
            <div>
                <div><img src={itemsPost.ImgPerson} alt=""/></div>
                <div>
                    <h4>{itemsPost.fullName}</h4>
                    <p>{`${hours}:${minutes}`}</p>
                </div>
            </div>
            <div>
                <IconButton onClick={() => onRemovePostHandler(itemsPost.id)}>
                    <Delete/>
                </IconButton>
            </div>
        </div>
        <div>
            <p>{itemsPost.content}</p>
        </div>
        <div>
            <button><img src={itemsPost.imgLikes} alt=""/></button>
            <h3>{itemsPost.counterLikes}</h3>
        </div>
        <div><img src={itemsPost.imgShare} alt=""/>
        </div>


    </div>)

}
export default PostComponent;