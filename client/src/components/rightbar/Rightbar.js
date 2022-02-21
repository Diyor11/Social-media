import React, {useEffect, useState, useMemo} from 'react'
import { RightbarCom, useStyles } from './rightbar.elements'
import { Typography, List, ListItem, ListItemAvatar, Avatar } from '@mui/material'
import img from '../../assets/ad.png'
import defaultImg from '../../assets/avatar'
import { NavLink } from 'react-router-dom'
import { suggistion } from '../../apis/api'
import {useSelector} from 'react-redux'

const Rightbar = () => {

    const classes = useStyles()
    const [users, setUsers] = useState([])

    const user = useSelector(state => state.user.user)
    const renderUsers = useMemo(() => mapUsers(users, user._id, classes), [users, user._id, classes])

    useEffect(() => {
        const fetchUsers = async() => {
            const data = await suggistion()
            if(data)
                setUsers(data)
        }
        fetchUsers()
    },[])

    return (
        <RightbarCom>
            <Typography variant='h5' component='h2'>Sponsored</Typography>
            <div className="img-box">
                <img  src={img} alt='advert' />
            </div>
            <Typography variant='h6' component='h2'>Suggestion</Typography>
            <List>
                {renderUsers}
            </List>
        </RightbarCom>
    )
}

export default Rightbar

function mapUsers(users, userId, classes) {

    return users && users.filter(item => item._id !== userId).map(({profilePicture, username, _id}, index) => (
        <ListItem key={index}>
            <ListItemAvatar>
                <Avatar src={profilePicture || defaultImg} />
            </ListItemAvatar>
            <NavLink to={`/user/${_id}`}>
                <Typography variant='h6' component='h2' className={classes.itemName}>{username}</Typography> 
            </NavLink>
        </ListItem>
    ))
}
