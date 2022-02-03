import React from 'react'
import { Media, Info, useStyles } from './Avatar'
import avatarImg from '../../assets/avatar'
import { Stack, Button } from '@mui/material'

const Avatar = () => {


    const classes = useStyles()

    return (
        <>
        <Media>
            <img alt='' src={avatarImg} />
        </Media>
        <Info>
            <h2>Emma Watson</h2>
            <h5>HI there i'm new</h5>
        </Info>
        <Stack className={classes.stack} direction='row' spacing={1}>
            <Button startIcon={<i class="fab fa-facebook-messenger"></i>} variant='contained'>Message</Button>
            <Button className={classes.btn} variant='contained'>Follow</Button>
        </Stack>
        </>
    )
}

export default Avatar