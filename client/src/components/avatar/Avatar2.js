import React from 'react'
import { Media, Info, useStyles, AvatarWrap } from './Avatar'
import avatarImg from '../../assets/avatar'
import { Stack, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Avatar = ({name, img, follow, fn, id}) => {

    const classes = useStyles()

    return (
        <>
        <Media>
            <AvatarWrap>
                    <label >
                        <img alt='' src={img || avatarImg} />
                    </label>
            </AvatarWrap>
        </Media>
        <Info>
            <h2>{name}</h2>
            <h5>HI there i'm new</h5>
        </Info>
        <Stack className={classes.stack} direction='row' spacing={1}>
            <NavLink to={'/messanger/' + id}>
                <Button startIcon={<i className="fab fa-facebook-messenger"></i>} variant='contained'>Message</Button>
            </NavLink>
            <Button className={classes.btn} variant='contained' sx={{background: follow === 'unfollow'?'crimson !important':''}} onClick={fn}>{follow}</Button>
        </Stack>
        </>
    )
}

export default Avatar