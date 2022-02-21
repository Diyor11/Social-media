import styled from 'styled-components'

export const CommentRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({send}) => (send ? 'flex-end':'flex-start')};
    margin-top: 8px;
    transform: translateX(${({send}) => send ? '40px':'0'});
    transition: 0.5s;

    &:hover{
        transform: translateX(0);
        .menu{
            opacity: 1;
        }
    }

    div.comment-main{
        background-color: ${({send}) => (send ? '#8ab2ff':'#c4c4c4')};
        border-radius: 11px;
        max-width: 70%;
        min-width: 170px;
        padding: 7px;
        margin: 0 5px;
        display: flex;
        flex-direction: column;
        .comment-top{
            display: flex;
            padding-bottom: 4px;
            justify-content: space-between;

            .user-name{
                text-transform: capitalize;
            }
        }
        .comment-text{
            font-size: 12px;
            font-family: sans-serif;
            margin-top: 3px;
        }
    }
    .menu{
        opacity: 0;
        transition: 0.3s;
        transition-delay: 0.2s;
        display: flex;
        flex-direction: column;
        .edit-btn{
            color: #202085;
        }
        .delete-btn{
            color: #f53131;
        }
    }
`