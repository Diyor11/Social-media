import React, { useState, useMemo, useEffect, useRef } from 'react'
import {Container, TopBar, Chat, Bottom, Form} from './chatbox.elements'
import {ArrowBack, AttachFile, SentimentSatisfiedAlt, Send} from '@mui/icons-material'
import { IconButton, Avatar } from '@mui/material'
import image from '../../assets/1.jpg'
import Message from './Message'
import emojes from '../../assets/emojes'
import { HTML5_FMT } from 'moment'

const Chatbox = ({setShowSide}) => {
  
  const [messages, setMessages] = useState([])
  const renderMessages = useMemo(() => mapMessages(messages), [messages])
  const addEmoje = (emoje) => text.current.value = `${text.current.value}${emoje}`
  const renderEmojes = useMemo(() => mapEmojes(addEmoje), [])
  const [selectedUser, setSelectedUser] = useState({})
  const scroll = useRef()
  
  const text = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!text.current.value.trim()) return null 
    setMessages([...messages, {message: text.current.value.trim().replace(/fuck/ig, '****')}])
    text.current.value = ''
  }

  useEffect(() => {
    scroll.current.scrollTop = scroll.current.scrollHeight
  }, [messages])

  return (
    <Container>
      <TopBar user={setSelectedUser?._id} >
        <IconButton className='back-icon' onClick={() => setShowSide(true)}>
          <ArrowBack />
        </IconButton>
          <Avatar src={image} alt='' className='avatar' />
          <div className="info">
            <h4 className="name">{'Conor McGregor'}</h4>
            <div className="time">{'1 hour ago'}</div>
          </div>
      </TopBar>
      <Chat ref={scroll}>
        { messages && (messages.length ? renderMessages: <h4 className='no-msg'>Please select user</h4>)}
      </Chat>
      <Bottom>
        <Form onSubmit={handleSubmit}>
          <IconButton>
            <AttachFile />
          </IconButton>
          <input type="text" ref={text} placeholder='Write a message...' />
          <IconButton className="emojes-btn">
            <SentimentSatisfiedAlt />
            <div className='emojes-list'>
              {renderEmojes}
            </div>
          </IconButton>
          <IconButton type='submit'>
            <Send />
          </IconButton>
        </Form>
      </Bottom>
    </Container>
  )
}

export default Chatbox

function mapMessages(messages) {

  return messages.map(({message}, key) => <Message key={key} message={message} own />)
}

function mapEmojes(addEmoje) {

  return emojes.map((emoje, index) => <IconButton component="div" color='primary' key={index} size='small' onClick={() => addEmoje(emoje)}>{emoje}</IconButton>)
}