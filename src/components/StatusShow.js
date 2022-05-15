import React from 'react'

const StatusShow = ({status}) => {
  return (
    <div className="item">
            <div className="left">
                <div className='questionMark'>?</div>
            </div>
            <div className="right">
                <h1>{status}</h1>
            </div>
        </div>
  )
}

export default StatusShow