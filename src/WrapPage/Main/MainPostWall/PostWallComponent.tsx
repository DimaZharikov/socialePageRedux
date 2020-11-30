import React from 'react'
import {ItemPostType} from "../../../Store/postWall.reducer";

interface Props {
    itemsPost: Array <ItemPostType>,
    messageForNewPost: string,
    onAddNewPostHandler: (content: string) => void,
    onChangeTextPost: (content:string) => void,
    onRemovePostCreater:(id:string) => void,
    setItemPostAC: (newPosts: ItemPostType) => void


}

const PostWallComponent = (props: Props) => {
    return(<div>
        {
            props.itemsPost.map( p => {
                return(
                    <div key = {p.id}>
                        <div>
                            <div>
                                <div>{p.ImgPerson}</div>
                                <div>
                                    <h4>{p.person.name} {p.person.secondName}</h4>
                                    <p>{p.time}</p>
                                </div>
                            </div>
                            <div>
                                <button><img src={p.imgBtnDeletePost} alt=""/></button>
                            </div>
                        </div>
                        <div>
                            <p>{p.content}</p>
                        </div>
                        <div>
                            <button><img src={p.imgLikes} alt=""/></button>
                            <h3>{p.counterLikes}</h3>
                        </div>
                        <div><img src={p.imgShare} alt=""/>
                        </div>


                    </div>
                )
            })
        }
    </div>)
}

export default PostWallComponent;