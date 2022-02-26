import styled from 'styled-components'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
    buttonBase: {
        padding: '5px !important',
        borderRadius: '7px !important'
    }
})

export const Container = styled.div`

    padding: 20px;
    height: calc(100vh - 64px);
    overflow-y: scroll;
    background-color: #323030;
    transition: 0.3s;
    z-index: 1;

    @media(max-width: 600px){
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(${({showSide}) => showSide ? 0:'-100%'});
    }

    &::-webkit-scrollbar{
        width: 6px;
        display: none;
    }
`

export const Form = styled.form`
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');
    
    input{
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1.5px solid #fff;
        color: #fff;
        font-family: 'Lato', sans-serif;
        font-size: 17px;
        padding: 5px
    }
`

export const Users = styled.div` 
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');
    margin-top: 2px;

    .user{
        display: flex;
        align-items: center;
        margin-top: 15px;
        h6{
            font-size: 15px;
            color: #fff;
            font-family: 'Lato', sans-serif;
            margin-left: 7px;
        }
    }
    .user.online{
        
        .MuiAvatar-root{
            position: relative;
            border: 1.8px solid #00e700;

            &:after{
                position: absolute;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: red;
            }
        }

    }
`

export const Icons = styled.div`
    display: flex;
    align-items: center;

    svg{
        color: #fff;
        font-size: 25px;
    }

    @media(min-width: 600px){
        display: none;
    }
`