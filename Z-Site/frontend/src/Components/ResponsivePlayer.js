import React from "react";
import ReactPlayer from "react-player";
import './ResponsivePlayer.css'
const ResponsivePlayer = ({ url , onProgress}) => {
    return(
        <div className="player-container">
            <ReactPlayer
                url={url}
                onProgress={onProgress}
                playing={true}
                muted={true}
                width="100%"
                height="100%"
                className="react-player"
                />
        </div>
    )
}

export default ResponsivePlayer