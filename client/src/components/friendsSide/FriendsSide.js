import React, {useState} from 'react'
import { Container, Form, Users, Icons } from './styles'
import { Avatar, ButtonBase, IconButton } from '@mui/material'
import image from '../../assets/1.jpg'
import { useStyles } from './styles'
import { ArrowBack, Home } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const FriendsSide = ({showSide, setShowSide}) => {

  const classes = useStyles()
  const [text, setText] = useState('')
  const [users, setUsers] = useState([{name: 'Amanda Leoa'}, {name: 'Jenifer Lopes'}, {name: 'Nina Safarova'}])

  const navigate = useNavigate()

  const handleSelect = () => {
    setShowSide(false)
  }

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
            (text ? users.filter(user => user.name.toLowerCase().includes(text.toLowerCase())):users).map(({name}, key) => (
              <div className="user online" key={key}>
                  <ButtonBase className={classes.buttonBase} onClick={handleSelect}>
                    <Avatar src={image} alt='' />
                    <h6>{name}</h6>
                  </ButtonBase>
              </div>
            ))
          }
      </Users>
    </Container>
  )
}

export default FriendsSide