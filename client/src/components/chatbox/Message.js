import React from 'react'
import {MessageRow, Msg} from './chatbox.elements'

const Message = ({message, own, time}) => {


  return (
    <MessageRow own={own}>
        <Msg own={own}>
            <div className="text">{message}</div>
            <div className="time">1 hour ago</div>
        </Msg>
    </MessageRow>
  )
}

export default Message