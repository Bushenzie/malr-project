import React from 'react'

const Item = ({url,imageUrl,name,episodes,type,score}) => {

    console.log(url,imageUrl,name,episodes,type,score);
    return (

        <div className="item">
            <div className="left">
                <img src={imageUrl} alt="" />
            </div>
            <div className="right">
                <h1><a href={url} target="_blank" rel="noreferrer noopener">{name}</a></h1>
                <h5>Episodes: {episodes} | Type: {type} | Score: {score}</h5> 
            </div>
        </div>
    )
}

export default Item;