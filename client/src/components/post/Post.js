import React, {useState, useRef, useMemo, useEffect} from 'react'
import { PostCom, LikeIcon, SaveIcon, HeartIcon, CommetnIcon, CommnetArea, WriteComment } from './post.elements'
import { Avatar, Typography, IconButton, ClickAwayListener } from '@mui/material'
import { MoreVert, SentimentSatisfiedAlt, CameraAlt, Send } from '@mui/icons-material'
import { Dropdown, DropdownItems, DropdownItem } from '../navbar/navbar.elements'
import { ButtonBase } from '@mui/material'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import avatarImg from '../../assets/avatar'
import { NavLink } from 'react-router-dom'
import { likePost } from '../../features/slices/postSlice'
import { likePost as likeApi, getComments, addComment, deleteComment, editComment } from '../../apis/api'
import Comment from '../comment/Comment'
import Loader from '../../components/loader/Loader2'

const Post = ({dropdownItems, _id, img, desc, createdAt, creater, likes, likeOrDistlikePost, commentsId}) => {

    const [dropdown, setDropdown] = useState(false)
    
    const [commentsShow, setCommentsShow] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [editingId, setEditingId] = useState('')
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user.user)
    const closeDropdown = () => setDropdown(false)
    const addEmoje = (emoje) => setComment(p => p + emoje)

    const renderedComments = useMemo(() => {
        const removeComment = async(commentId) => {
            const data = await deleteComment(commentId)
            if(data && data._id){
                setComments(comments.filter(c => c._id !== data._id))
            }
        }

        return mapComments(comments, user._id, removeComment, setEditingId)
    }, [comments, user._id])
    
    const renderDropdowns = useMemo(() => mapDropdowns(dropdownItems, closeDropdown, _id), [_id ,dropdownItems])
    const renderEmojes = useMemo(() => mapEmojes(addEmoje), [])
    const dispatch = useDispatch()
    const commetnAreaRef = useRef()

    const fetchComments = async() => {
        setLoading(true)
        const data = await getComments(_id)
        setLoading(false)
        if(data){
            setComments(data)
        }
    }

    const editCommentText = async() => {
        const data = await editComment(editingId, comment)
        const cIndex = comments.findIndex(c => c._id === editingId)
        if(data && data._id && cIndex + 1){
            setComments(comments.map((c) => c._id === editingId ? {...comments[cIndex], text: comment}:c))
            setEditingId('')
            setComment('')
        }
    }

    const saveComment = async() => {
        const data = await addComment(_id, comment)
        setComment('')
        if(data && data?._id){
            setComments([...comments, {...data, creater: {_id: data.creater, profilePicture: user.picture, username: user.username}}])
            window.scrollTo({left: 0, top: window.scrollY + 80, behavior: 'smooth'})
        } else {
            console.log('Comment not saved')
        }

    }

    const handleSubmit = e => {
        e.preventDefault()

        if(!comment) return alert('Comment required')
        if(editingId) editCommentText()
        else saveComment()
    }

    const likeOrDistLike = async() => {
        const data = await likeApi(_id)
        if(data && data.success){
            if(likeOrDistlikePost)
                likeOrDistlikePost(_id, user._id)
            else
                dispatch(likePost({postId: _id, userId: user._id}))
        }
    }

    const commentVisib = () => {
        if(commentsShow){
            setCommentsShow(false)
        } else {
            setCommentsShow(true)
            fetchComments()
            window.scrollTo({left: 0, top: window.scrollY + 200, behavior: 'smooth'})
        }
    } 

    useEffect(() => {
        if(editingId){
            const targetComment = comments.find(c => c._id === editingId)
            if(targetComment)
                setComment(targetComment.text || '')
        }
    }, [editingId])
    
    return (
        <PostCom>
            <div className="top">
                <div className='info'>
                    <Avatar src={creater.profilePicture} alt='Name' />
                    <div className='name'>
                        <NavLink to={creater._id === user._id ?`/profile`:`/user/${creater._id}`}>
                            <Typography variant='h5'>{creater.username}</Typography>
                        </NavLink>
                        <h6>{moment().to(createdAt)}</h6>
                    </div>
                </div>
                <ClickAwayListener onClickAway={() => setDropdown(false)}>
                    <div style={{position: 'relative'}}>
                        <IconButton onClick={() => setDropdown(p => !p)}>
                            <MoreVert />
                        </IconButton>
                        <Dropdown dropdown={dropdown} w='120px'>
                            <DropdownItems>
                                {renderDropdowns}
                                <ButtonBase onClick={closeDropdown} sx={{width: '100%', borderRadius: '5px'}}>
                                    <DropdownItem >
                                        <h6>Cencel</h6>
                                    </DropdownItem>
                                </ButtonBase>
                            </DropdownItems>
                        </Dropdown>
                    </div>
                </ClickAwayListener>
            </div>
            <div className="media">
                <h4 className="title">{desc}</h4>
                <img src={img} alt="saome" />
            </div>
            <div className="bottom">
                <div className="postIcons">
                    <IconButton onClick={likeOrDistLike}>
                        <LikeIcon />
                    </IconButton>
                    <IconButton>
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={likeOrDistLike}>
                        <HeartIcon />
                    </IconButton>
                    <Typography variant='h6'>{likes.length} <span>people like it</span></Typography>
                </div>
                <div className="comment" onClick={commentVisib}>
                    <IconButton>
                        <CommetnIcon />
                    </IconButton>
                    <Typography variant='h6'>{commentsId?.length} <span>Comment</span></Typography>
                </div>
            </div>
            <CommnetArea ref={commetnAreaRef} d={commentsShow ?'block':'none'}>
                {loading ? <Loader /> : renderedComments}
                <WriteComment>
                    <Avatar src={user.picture || avatarImg} alt='' />
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
                        <div className="icons">
                            <IconButton className='emojes-btn' size='small'>
                                <SentimentSatisfiedAlt />
                                <div className='emojes-list'>
                                {renderEmojes}
                            </div>
                            </IconButton>
                            <IconButton size='small'>
                                <CameraAlt />
                            </IconButton>
                            <IconButton size='small' onClick={handleSubmit}>
                                <Send />
                            </IconButton>
                        </div>
                    </form>
                </WriteComment>
            </CommnetArea>
        </PostCom>
    )
}

export default Post

function mapComments(comments, userId, removeComment, setEditingId) {

    return comments && (comments.length ? (
        comments.map(({_id, text, creater, createdAt}, index) => <Comment send={creater._id === userId} key={index} _id={_id} text={text} creater={creater} createdAt={createdAt} removeComment={removeComment} setEditingId={setEditingId} />)
    ):<h4>No comment</h4>)
}

function mapDropdowns(items, close, _id) {
    return items && items.map(({name, fn}, index) => (
        <ButtonBase key={index} sx={{width: '100%', borderRadius: '5px'}} onClick={close}>
            <DropdownItem onClick={() => fn(_id)}>
                <h6>{name}</h6>
            </DropdownItem>
        </ButtonBase>
    ))
}

function mapEmojes(addEmoje) {
    const emojes = ['😀', '😄', '😅', '🤣','😂', '🙂', '🥰', '😍', '😘','😜','🤫','🤔','🤐','🤨','😔','🤮','🥺','😡','👿','💔','❤️','💯','🖤','🤍','🤚','🖐','👌','👈','👉','👆','🖕','👇','☝','👍','👊','👏','🤲','💪','🤝','🙅','🙅‍♀️','🐵','🐒','🐖','🐇','🦒','🐢', '🤑', '🤕', '🥶', '🙏', '🙋‍♂️', '🙋‍♀️', '🤦‍♂️']

    return emojes.map((emoje, index) => <IconButton component="div" color='primary' key={index} size='small' onClick={() => addEmoje(emoje)}>{emoje}</IconButton>)
}