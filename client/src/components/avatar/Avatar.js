import React from 'react'
import styled from 'styled-components'
import img from '../../assets/ad.png'
import avatarImg from '../../assets/avatar'
import { Stack, Button } from '@mui/material'
import {makeStyles} from '@mui/styles'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { updateImage } from '../../features/slices/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from '../../apis/api'

export const Media = styled.div`
    width: 100%;
    background: url(${img}) no-repeat center;
    background-size: cover;
    height: 400px;
    position: relative;

    @media(max-width: 600px){
        height: 350px;
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

export const AvatarWrap = styled.div`
    width: 250px;
    height: 250px;
    overflow: hidden;
    border-radius: 50%;
    border: 4.5px solid #fff;
    position: absolute;
    bottom: -125px;
    left: 0;
    right: 0;
    margin: 0 auto;
    label{
        position: relative;
        img{
            width: 100%;        
            cursor: cell;
        }
        svg{
            position: absolute;
            bottom: 40px;
            right: 40px;
            font-size: 37px;
            color: #fff;
        }
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

const Avatar = ({name}) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const saveImg = async(info) => {
        const data = await updateUser(info, user._id)
        if(data){
            dispatch(updateImage(data.profilePicture))
        }
    }

    const imageChange = ({target: {files}}) => {
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = () => saveImg({profilePicture: reader.result})
    }

    return (
        <>
        <Media>
            <AvatarWrap>
                <label htmlFor='choose-avtaar'>
                    <img alt='' src={user.picture || avatarImg} />
                    <input type='file' id='choose-avtaar' hidden onChange={imageChange} />
                    <CameraAltIcon />
                </label>
            </AvatarWrap>
        </Media>
        <Info>
            <h2>{name}</h2>
            <h5>HI there i'm new</h5>
        </Info>
        <Stack className={classes.stack} direction='row' spacing={1}>
            <Button startIcon={<i className="fab fa-facebook-messenger"></i>} variant='contained'>Message</Button>
            <Button className={classes.btn} startIcon={<i className="fas fa-pen"></i>} variant='contained'>Edit Profile</Button>
        </Stack>
        </>
    )
}

export default Avatar
