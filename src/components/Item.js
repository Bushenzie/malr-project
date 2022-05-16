import React from 'react'

const Item = ({url,imageUrl,name,episodes,type,score}) => {

    return (

        <div className="item">
            <div className="left">
                <img src={imageUrl} alt="" />
            </div>
            <div className="right">
                <h1><a href={url} target="_blank" rel="noreferrer noopener">{name}</a></h1>
                <p>Episodes: <span id="episodes">{episodes}</span></p>
                <p>Type: <span id="type">{type}</span></p>
                <p>Score: <span id="score">{score}</span></p>
            </div>
        </div>
    )
}

export default Item;