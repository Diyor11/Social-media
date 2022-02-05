import React, {useState, useEffect} from 'react'
import { RightbarCom, useStyles } from './rightbar.elements'
import { Typography, List, ListItem, ListItemAvatar, Avatar } from '@mui/material'
import img from '../../assets/ad.png'
import {suggistion} from '../../apis/api'

const Rightbar = () => {

    const classes = useStyles()
    const [users, setUsers] = useState([])
    console.log(users)

    const fetchUsers = async() => {
        const data = await suggistion()
        console.log(data)
        if(data){
            setUsers(data)
        }
    }

    useEffect(() => {
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
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src='/images/2.jpg' />
                    </ListItemAvatar>
                    <Typography variant='h6' component='h2' className={classes.itemName}>James Conor</Typography> 
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src='/images/2.jpg' />
                    </ListItemAvatar>
                    <Typography variant='h6' component='h2' fontSize='18px'>James Conor</Typography> 
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src='/images/2.jpg' />
                    </ListItemAvatar>
                    <Typography variant='h6' component='h2' fontSize='18px'>James Conor</Typography> 
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src='/images/2.jpg' />
                    </ListItemAvatar>
                    <Typography variant='h6' component='h2' fontSize='18px'>James Conor</Typography> 
                </ListItem>
            </List>
        </RightbarCom>
    )
}

export default Rightbar
