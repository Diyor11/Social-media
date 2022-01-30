import React from 'react'
import styled from 'styled-components'
import img from '../../assets/ad.png'
import avatarImg from '../../assets/1.jpg'
import { Stack, Button } from '@mui/material'
import {makeStyles} from '@mui/styles'

export const Media = styled.div`
    width: 100%;
    background: url(${img}) no-repeat center;
    background-size: cover;
    height: 400px;
    position: relative;

    @media(max-width: 600px){
        height: 350px;
    }

    img{
        width: 250px;
        height: 250px;
        border-radius: 50%;
        border: 4.5px solid #fff;
        position: absolute;
        bottom: -125px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
`

export const Info = styled.div`
    width: fit-content;
    margin: 140px auto 0;
    text-align: center;

    h2{
        font-family: 'Roboto', sans-serif;
        font-size: 30px;
    }
    h5{
        font-family: sans-serif;
        color: #777;
        margin: 7px 0 12px;
    }
`

export const useStyles = makeStyles({
    btn: {
        background: '#444',
        '&:hover':{
            background: '#666'
        }
    },
    stack: {
        width: 'fit-content', 
        margin: '0 auto 10px'
    }
})

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
            <Button className={classes.btn} startIcon={<i class="fas fa-pen"></i>} variant='contained'>Edit Profile</Button>
        </Stack>
        </>
    )
}

export default Avatar
