import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const Main = styled.div`
    border-radius: 15px;
    box-shadow: 1px 4px 9px rgba(0, 0, 0, 0.25);
    padding: 15px;
    background-color: #fff;
    margin-top: 20px;

    @media(max-width: 600px) {
        border-radius: 0;
        box-shadow: none;
        
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;

    span{
        img{
            width: 100%;
            height: 88%;
            object-fit: cover;
        }
        h6{
            text-align: center;
            font-family: 'Roboto', sans-serif;
            &:hover{
                color: blue;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
`

const Title = styled.h4`
    font-family: sans-serif;
    margin-bottom: 7px;
`

const Photos = ({title, children}) => {


    return (
        <Main>
            <Title>{title}</Title>
            <Grid>
                {children}
            </Grid>
        </Main>
    )
}

export default Photos
