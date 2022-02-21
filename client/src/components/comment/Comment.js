import React from 'react'
import { CommentRow } from './comment.styles'
import {Avatar, IconButton} from '@mui/material'
import { ModeEdit, Delete } from '@mui/icons-material'
import avatarImg from '../../assets/avatar'
import moment from 'moment'

const Comment = ({send, createdAt, _id, creater, text}) => {

    return (
            <CommentRow send={send}>
                <Avatar src={creater?.profilePicture || avatarImg} />
                <div className='comment-main'>
                    <span className='comment-top'>
                        <b className='user-name'>{creater?.username}</b>
                        <div className="time">
                            {moment().format('HH:mm')}
                        </div>
                    </span>
                    <p className="comment-text">{text}</p>
                </div>
                <div className="menu">
                    <IconButton className='edit-btn'>
                        <ModeEdit />
                    </IconButton>
                    <IconButton className="delete-btn">
                        <Delete />
                    </IconButton>
                </div>
            </CommentRow>
    )
}

export default Comment