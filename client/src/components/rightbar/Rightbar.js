import React from 'react'
import { RightbarCom, useStyles } from './rightbar.elements'
import { Typography, List, ListItem, ListItemAvatar, Avatar } from '@mui/material'
import img from '../../assets/ad.png'

const Rightbar = () => {

    const classes = useStyles()

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
