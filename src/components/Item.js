import React from 'react'

const Item = ({url,imageUrl,name,episodes,type}) => {

    return (
        <div className="item">
            <div className="left">
                <img src={imageUrl} alt="" />
            </div>
            <div className="right">
                <h1><a href={url} target="_blank" rel="noreferrer">{name}</a></h1>
                <h5>Episodes: {episodes} | Type: {type}</h5> 
            </div>
        </div>
    )
}

export default Item;