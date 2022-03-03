import React, { useState, useMemo, useEffect, useRef, memo } from 'react'
import {Container, TopBar, Chat, Bottom, Form} from './chatbox.elements'
import {ArrowBack, AttachFile, SentimentSatisfiedAlt, Send} from '@mui/icons-material'
import { IconButton, Avatar } from '@mui/material'
import Messages from './Messages'
import emojes from '../../assets/emojes'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import avatarImg from '../../assets/avatar'
import { getMessages, sendMessage } from '../../apis/api'
import socket from '../../utils/socket'

const Chatbox = ({setShowSide, setOnlines}) => {
  
  const [messages, setMessages] = useState([])
  const addEmoje = (emoje) => text.current.value = `${text.current.value}${emoje}`
  const renderEmojes = useMemo(() => mapEmojes(addEmoje), [])
  const {id} = useParams()
  const { users } = useSelector(state => state.users)
  const [selected, setSelected] = useState({})
  
  const text = useRef()
  const scroll = useRef()


  const saveMessage = async(d) => {
    const data = await sendMessage(d)
    if(data){
      setMessages([...messages, data])
      socket.emit('sendMessage', data)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!text.current.value.trim()) return null 
    saveMessage({text: text.current.value.trim(), reciver: selected._id})
    text.current.value = ''
  }

  useEffect(() => {
      const getMsgs = async (id) => {
        const data = await getMessages(id)
        if(data)
          setMessages(data)
      }

      const user = users.find(c => c._id === id)
      if(user){
        setSelected(user)
        getMsgs(user._id)
      }

  }, [id, users])

  useEffect(() => {
    socket.on('reciveMessage', msg => {
      if(msg.sender === id){
        setMessages([...messages, msg])
      }
    })
  }, [id, messages])

  useEffect(() => {
    scroll.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  return (
    <Container>
      <TopBar user={selected?._id} >
        <IconButton className='back-icon' onClick={() => setShowSide(true)}>
          <ArrowBack />
        </IconButton>
          <Avatar src={selected.profilePicture || avatarImg} alt='' className='avatar' />
          <div className="info">
            <h4 className="name">{selected?.username}</h4>
            <div className="time">last seen recently</div>
          </div>
      </TopBar>
      <Chat>
        { selected?._id ? (messages ? <Messages messages={messages} />: <h4 className='no-msg'>No messages</h4>): <h4 className='no-msg'>Please select user</h4>}
        <div ref={scroll}></div>
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

export default memo(Chatbox)

// function MapMessages(messages, scroll) {

//   return messages.map(({text, createdAt, reciver}, key) => <Message ref={scroll} key={key} message={text} time={createdAt} reciver={reciver} />)
// }

function mapEmojes(addEmoje) {

  return emojes.map((emoje, index) => <IconButton component="div" color='primary' key={index} size='small' onClick={() => addEmoje(emoje)}>{emoje}</IconButton>)
}