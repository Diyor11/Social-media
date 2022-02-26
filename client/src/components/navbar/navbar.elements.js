import styled from 'styled-components'
import { makeStyles } from '@mui/styles'
import { IconButton } from '@mui/material'

export const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    brand: {
        color: '#fff',
        fontSize: '26px !important',
        fontFamily: 'sans-serif',
        cursor: 'pointer'
    },
    searchIcon: {
        fontSize: '16px',
        position: 'absolute',
        left: '10px',
        top: '0',
        bottom: '0',
        margin: 'auto 0',
        color: '#777',
        cursor: 'pointer'
    },
    icons: {
        color: '#fff',
        fontSize: '30px',
    },
    avatar: {
        marginLeft: '20px',
        cursor: 'pointer'
    },
    notificateBtn: {
        position: 'relative'
    },
    buttonBase: {
        justifyContent: 'flex-start',
        width: '100%',
        borderRadius: '5px',
        padding: '3px 0'
    }
})

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    position: relative;
    padding: 9px 37px; 
    border-radius: 20px;
    width: 510px;
    input{
        border: none;
        width: 100%;
        font-size: 16px;
        &::placeholder{
            font-size: 13px;
        }
    }

    @media(max-width: 1200px){
        width: 450px;
    }
    @media(max-width: 900px){
        width: 350px;
    }
    @media(max-width: 700px){
        display: none;
    }
`

export const Dropdown = styled.div`
    transform: scale(${({dropdown}) => (dropdown ? 1:0)});
    transition: transform 0.5s ease-in-out;
    transform-origin: top right;
    width: ${({w}) => w || '200px'};
    max-width: 70vw;
    padding: 15px;
    border-radius: 13px;
    background-color: #fff;
    position: absolute;
    top: 25px;
    right: 25px;
    box-shadow: 1px 4px 9px rgba(0, 0, 0, 0.25);
`

export const DropdownItems = styled.ul`
    font-family: sans-serif;
    li{
        color: #333;
        margin: 8px 0;
        max-height: 70vh;
        font-size: 16px;
        text-align: left;
    }
`

export const DropdownItem = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    color: ${({error}) => (error ? '#d32f2f !important':'#111')};
    cursor: pointer;
    .css-10d1a0h-MuiButtonBase-root{
        justify-content: flex-start;

        h6{
            font-family: sans-serif;
            font-size: 18px;
            margin-left: 7px;
            font-weight: 500
        }
    }
`

export const IconBtn = styled(IconButton)`
    background-color: transparent;
    
    @media(max-width: 450px){
        display: none !important;
    }
`
