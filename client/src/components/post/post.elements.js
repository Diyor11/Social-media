import styled from "styled-components"
import { ThumbUp, BookmarkBorder, Favorite, Message } from '@mui/icons-material'

export const PostCom = styled.div`
    border-radius: 15px;
    box-shadow: 1px 4px 9px rgba(0, 0, 0, 0.25);
    padding: 15px;
    margin-top: 20px;
    background-color: #fff;
    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info{
            display: flex;
            align-items: center;
            .name{
                margin-left: 15px;
                .MuiTypography-h5{
                    font-size: 15px;
                    font-weight: 600;
                    &:hover{
                        cursor: pointer;
                        color: #333;
                        text-decoration: underline;
                    }
                }
                h6{
                    font-family: sans-serif;
                    color: #777;
                    text-transform: capitalize;
                }
            }
        }
    }
    .media{
        h4.title{
            font-family: sans-serif;
            color: #111;
            margin: 15px 0 5px 0;
        }
        img{
            width: 100%;
            object-fit: cover;
        }
    }
    .bottom{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .postIcons{
            display: flex;
            align-items: center;
            h6.MuiTypography-h6{
                font-weight: 600;
                font-size: 14px;
                margin-left: 12px;
                @media(max-width: 600px){
                    margin-left: 0;
                    span{
                        display: none;
                    }
                }
            }
        }
        .comment{
            display: flex;
            align-items: center;
            h6.MuiTypography-h6{
                font-weight: 600;
                font-size: 17px;
                text-decoration: underline;
                color: #444;
                margin-left: 12px;
                cursor: pointer;
                @media(max-width: 600px){
                    margin-left: 0;
                    span{
                        display: none;
                    }
                }
            }
        }
    }
    @media(max-width: 600px){
        border-radius: 0;
        box-shadow: none;
    }
`

export const LikeIcon = styled(ThumbUp)`
    background-color: #658FFB;
    border-radius: 50%;
    padding: 5px;
    font-size: 25px;
    color: #fff;
`

export const HeartIcon = styled(Favorite)`
    background-color: #FF4444;
    color: #fff;
    font-size: 27px;
    padding: 3px;
    border-radius: 50%;
`

export const SaveIcon = styled(BookmarkBorder)`
    font-size: 30px;
    color: #21DF57;
`

export const CommetnIcon = styled(Message)`
    color: #774AA4;
    font-size: 30px;
`

export const CommnetArea = styled.div` 
    display: ${({d}) => d};
    padding: 10px 0;
    &::before{
        width: 100%;
        height: 2px;
        background-color: rgba(0, 0, 0, 0.3);
        content: '';
        display: block;
        margin: 12px 0;
    }
`

export const CommentRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({send}) => (send ? 'flex-end':'flex-start')};
    margin-top: 8px;

    p{
        b{display: block;}
        margin-left: 5px;
        background-color: ${({send}) => (send ? '#8ab2ff':'#c4c4c4')};
        border-radius: 11px;
        max-width: 70%;
        font-family: sans-serif;
        font-size: 12px;
        padding: 7px;
    }
`

export const WriteComment = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    form{
        padding: 0 15px;
        margin-left: 8px;
        border: 1px solid #686666;
        border-radius: 13px;
        display: flex;
        align-items: center;
        position: relative;
        flex-grow: 1;
        border-radius: 17px;
        input{
            width: 100%;
            border: none;
        }
        .icons{
            display: flex;
            align-items: center;
            position: relative;
            svg{
                color: #686666;
            }
            .emojes-btn{
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
                    grid-template-columns: repeat(6, 1fr);
                    position: absolute;
                    bottom: 90%;
                    right: -20px;
                    background-color: #fff;

                    button{
                        color: #fff;
                    }
                }
            }
        }
    }
`


