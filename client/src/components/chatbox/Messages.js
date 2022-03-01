import React, { memo } from 'react'
import {useSelector} from 'react-redux'
import {MessageRow, Msg} from './chatbox.elements'
import moment from 'moment'

const Message = ({message, time, reciver, }) => {

  const user = useSelector(state => state.user.user)

  return (
    <MessageRow own={user._id !== reciver}>
        <Msg own={user._id !== reciver}>
            <div className="text">{message}</div>
            <div className="time">{moment(time).fromNow().replace('an', '1').replace('a few seconds', 'seconds')}</div>
        </Msg>
    </MessageRow>
  )
}

// export default Message

function Messages({messages}) {

  return messages.map(({text, createdAt, reciver}, key) => <Message key={key} message={text} time={createdAt} reciver={reciver} />)
}

export default memo(Messages)