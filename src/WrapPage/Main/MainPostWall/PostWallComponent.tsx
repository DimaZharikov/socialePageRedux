import React, {ChangeEvent, useState} from "react"
import {ItemPostType} from "../../../Store/postWall.reducer";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";

interface Props {
    itemsPost: Array <ItemPostType>,
    messageForNewPost: string,
    onAddNewPostHandler: (content: string) => void,
    onChangeTextPost: (content:string) => void,
    onRemovePostCreater:(id:string) => void,
    setItemPostAC: (newPosts: ItemPostType) => void
}


const PostWallComponent = (props: Props) => {

    const [error, setError] = useState<string|null>(null)

    const onChangeTextFieldHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.onChangeTextPost(event.currentTarget.value)
    }

    const onAddNewPost = (content: string) => {
        if (props.messageForNewPost.trim() !==''){
            props.onAddNewPostHandler(content)

        }


    }

    const onRemovePostHandler = (id: string) => {
        props.onRemovePostCreater(id)
    }

    const date = new Date()
    let hourse = date.getHours();
    let minutes = date.getMinutes();


    return(<div>

       <div>

           <TextField value = {props.messageForNewPost} onChange={onChangeTextFieldHandler}  id="standard-basic" label="Standard" />
           <Button onClick={()=>onAddNewPost(props.messageForNewPost)} variant="outlined" color="primary" size='small'>Send</Button>
           {error && <div>{error}</div>}
       </div>
        <div>
            {
                props.itemsPost.map( p => {
                    return(
                        <div key = {p.id}>
                            <div>
                                <div>
                                    <div><img src={p.ImgPerson} alt=""/></div>
                                    <div>
                                        <h4>{p.person.name} {p.person.secondName}</h4>
                                        <p>{`${hourse}:${minutes}`}</p>
                                    </div>
                                </div>
                                <div>
                                    <IconButton onClick = {()=> onRemovePostHandler(p.id)}>
                                        <Delete />
                                    </IconButton>
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
        </div>


    </div>)
}

export default PostWallComponent;