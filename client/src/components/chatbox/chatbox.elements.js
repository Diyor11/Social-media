import styled from 'styled-components'
import chatImg from '../../assets/chat1.jpg'

export const Container = styled.div`
    display: grid;
    grid-template-rows: 60px 1fr 50px;
    height: calc(100vh - 64px);

    @media(max-width: 600px){
        height: 100vh;
    }
`

export const TopBar = styled.div`
    background-color: #4c4c4c;
    display: flex;
    align-items: center;
    padding: 0 15px;

    .back-icon{
        color: #fff;
        display: none;
        svg{
            font-size: 30px;
        }

        @media(max-width: 600px){
            display: flex;
        }
    }
    .avatar{
        margin-right: 10px;
        opacity: ${({user}) => user ? 1:0};
    }
    .info{
        color: #fff;
        font-family: sans-serif;
        opacity: ${({user}) => user ? 1:0};
        .name{
            text-transform: capitalize;
        }

        .time{
            font-size: 14px;
        }
    }
`

export const Chat = styled.div`
    background-image: url(${chatImg});
    background-size: cover;
    padding: 15px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scroll-behavior: smooth;
    position: relative;

    .no-msg{
        color: #fff;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @media(max-width: 600px){
            font-size: 15px;
        }
    }
`

export const Bottom = styled.div`
    background-color: #4c4c4c;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Form = styled.form`
    background-color: #fff;
    display: flex;
    align-items: center;
    width: 85%;
    border-radius: 20px;

    @media(max-width: 600px) {
        width: 90%;
    }

    input{
        background: transparent;
        border: none;
        flex: 1;
    }

    .emojes-btn{
        position: relative;
        &:hover{
            .emojes-list{
                visibility: visible;
            }
        }

        .emojes-list{
            visibility: hidden;
            border-radius: 15px;
            box-shadow: 1px 4px 9px rgba(0, 0, 0, 0.25);
            padding: 15px;
            display: grid;
            grid-template-columns: repeat(6, 1fr) !important;
            position: absolute;
            bottom: 70%;
            right: -20px;
            background-color: #fff;
            max-height: 400px;
            overflow-y: scroll;

            @media(max-width: 600px){
                max-height: 300px;
            }

            button{
                color: #fff;
            }
        }
    }
`

export const MessageRow = styled.div`
    display: flex;
    justify-content: ${({own}) => own ? 'flex-end':'flex-start'};
    margin-top: 14px;
`
export const Msg = styled.div`
    .text{
        background-color: ${({own}) => own ? '#2075ED':'#D0CDCD'};
        padding: 8px;
        border-radius: 18px;
        user-select: auto;
        font-family: cursive;
        color: ${({own}) => own ? '#fff': '#2E2E2E'};
        &::selection{
            background: #27bf5a;
            color: #fff;
        } 
    }
    .time{
        color: #fff;
        text-align: end;
        margin: 7px;
        font-family: sans-serif;
        font-size: 13px;
    }
`