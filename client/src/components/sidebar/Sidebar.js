import React, { useEffect } from 'react'
import { SidebarCom, items, StyledBadge, useStyles, CloseBtn } from './sidebar.elements'
import { List, ListItem, ListItemButton, ListItemIcon, Typography, Button, Divider, Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { Close } from '@mui/icons-material'
import socket from '../../utils/socket'
import { useSelector, useDispatch } from 'react-redux'
import { getOnlines, addOnline, removeOnline } from '../../features/slices/usersSlice'
import defaultImg from '../../assets/avatar'

const Sidebar = ({navOpen, setNavOpen}) => {

    const classes = useStyles()

    return (
        <SidebarCom open={navOpen}>
            <List className={classes.list}>
                <CloseBtn onClick={() => setNavOpen(false)}><Close /></CloseBtn>
                {
                    items.map(({text, Icon, link, iconColor}, index) => (
                        <NavLink to={link} key={index}>
                            <ListItem disablePadding>
                                <ListItemButton className={classes.itemBtn}>
                                    <ListItemIcon>
                                        <Icon sx={{color: iconColor}} className={classes.sidebarItemText}/>
                                    </ListItemIcon>
                                    <Typography  color='black' variant='h6' fontSize="20px">{text}</Typography>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))
                }
                <ListItem>
                    <Button variant='contained' className={classes.btn}>Show more</Button>
                </ListItem>
            </List>
            <Divider />
            <List>
                <Onlines />               
            </List>
        </SidebarCom>
    )
}

export default Sidebar

function Onlines() {

    const classes = useStyles()
    const {users, onlines} = useSelector(state => state.users)
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()

    console.log(onlines)

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
    
    return onlines && users && 
        users.filter(e => onlines.some(i => i.userId === e._id)).map(({profilePicture, username, _id}, index) => (

                <ListItem key={index} className={classes.listItem}>
                    <StyledBadge
                        delay={index * 0.4}
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt={username} src={profilePicture || defaultImg} />
                    </StyledBadge>
                    <NavLink to={`/user/${_id}`}>
                        <Typography className={classes.avatarName} variant='h6'>{username}</Typography>
                    </NavLink>
                </ListItem>
        )
    )
}