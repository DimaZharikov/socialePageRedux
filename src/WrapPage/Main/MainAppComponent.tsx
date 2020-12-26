import React from 'react'
import PostWallConteiner from "./MainPostWall/PostWallConteiner";
import ProfileContainer from "./MainInfoBlock/ProfileContainer";




interface Props {

}


const MainPageConteiner: React.FunctionComponent<Props> = (props) => {
    return(
        <div>
        <ProfileContainer />
        <PostWallConteiner />
    </div>

    )
}

export default MainPageConteiner;