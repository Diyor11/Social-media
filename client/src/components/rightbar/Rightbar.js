import React, {useEffect} from 'react'
import { RightbarCom, useStyles } from './rightbar.elements'
import { Typography, List, ListItem, ListItemAvatar, Avatar } from '@mui/material'
import img from '../../assets/ad.png'
import defaultImg from '../../assets/avatar'
import { NavLink } from 'react-router-dom'
import { fetchAllUsers } from '../../features/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const Rightbar = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        dispatch(fetchAllUsers())
    },[])

    return (
        <RightbarCom>
            <Typography variant='h5' component='h2'>Sponsored</Typography>
            <div className="img-box">
                <img  src={img} alt='advert' />
            </div>
            <Typography variant='h6' component='h2'>Suggestion</Typography>
            <List>
                {
                    user.allUsers && user.allUsers.map(({profilePicture, username, _id}, index) => (
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
            </List>
        </RightbarCom>
    )
}

export default Rightbar
