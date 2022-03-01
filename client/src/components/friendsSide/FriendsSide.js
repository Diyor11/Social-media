import React, {useEffect, useState} from 'react'
import { Container, Form, Users, Icons } from './styles'
import { Avatar, ButtonBase, IconButton } from '@mui/material'
import { useStyles } from './styles'
import { ArrowBack, Home } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import defaultImg from '../../assets/avatar'
import { StyledBadge } from '../sidebar/sidebar.elements'
import { fetchAllUsers } from '../../features/slices/usersSlice'
import socket from '../../utils/socket'
import { getOnlines, addOnline, removeOnline } from '../../features/slices/usersSlice'

const FriendsSide = ({showSide, setShowSide}) => {

  const classes = useStyles()
  const [text, setText] = useState('')
  const { users, onlines } = useSelector(state => state.users)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  console.log(user, onlines)

  useEffect(() => dispatch(fetchAllUsers()), [dispatch])

  const navigate = useNavigate()

  const handleSelect = (id) => {
    setShowSide(false)
    navigate('/messanger/' + id)
  }

  useEffect(() => {
    socket.on('allUsers', (users) => {
        dispatch(getOnlines(users))
    })
    socket.emit('addUser', user._id)

    socket.on('newUser', user => {
        dispatch(addOnline(user))
    })

    socket.on('removeUser', id => {
        dispatch(removeOnline(id))
    })
}, [user._id, dispatch])

  return (
    <Container showSide={showSide}>
      <Icons>
        <IconButton onClick={() => setShowSide(false)}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={() => navigate('/')}>
          <Home />
        </IconButton>
      </Icons>
      <Form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Search friends here" />
      </Form>
      <Users>
          {
            users && onlines && users.filter(e => onlines.some(i => i.userId === e._id))
            .map(({username, profilePicture, _id}, key) => (
              <div className="user online" key={key}>
                  <ButtonBase className={classes.buttonBase} onClick={() => handleSelect(_id)}>
                  <StyledBadge
                        delay={key * 0.4}
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt={username} src={profilePicture || defaultImg} />
                    </StyledBadge>
                    <h6>{username}</h6>
                  </ButtonBase>
              </div>
            ))
          }
          {
            (text ? users.filter(user => user.username.toLowerCase().includes(text.toLowerCase())):users).filter(e => e._id !== user._id).map(({username, profilePicture, _id}, key) => (
              <div className="user" key={key}>
                  <ButtonBase className={classes.buttonBase} onClick={() => handleSelect(_id)}>
                    <Avatar src={profilePicture || defaultImg} alt='' />
                    <h6>{username}</h6>
                  </ButtonBase>
              </div>
            ))
          }
      </Users>
    </Container>
  )
}

export default FriendsSide