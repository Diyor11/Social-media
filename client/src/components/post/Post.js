import React, {useState, useRef} from 'react'
import { PostCom, LikeIcon, SaveIcon, HeartIcon, CommetnIcon, CommnetArea, CommentRow, WriteComment } from './post.elements'
import { Avatar, Typography, IconButton, ClickAwayListener } from '@mui/material'
import { MoreVert, SentimentSatisfiedAlt, CameraAlt, Send } from '@mui/icons-material'
import { Dropdown, DropdownItems, DropdownItem } from '../navbar/navbar.elements'
import { ButtonBase } from '@mui/material'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import avatarImg from '../../assets/avatar'
import { NavLink } from 'react-router-dom'
import { likePost } from '../../features/slices/postSlice'
import { likePost as likeApi } from '../../apis/api'

const Post = ({dropdownItems, _id, img, userId, desc, createdAt, createrName, createrImg, likes, comments}) => {

    const [dropdown, setDropdown] = useState(false)
    
    const [commentsShow, setCommentsShow] = useState(false)
    const [comment, setComment] = useState('')
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const commetnAreaRef = useRef()

    const closeDropdown = () => setDropdown(false)
    const emojes = ['😀', '😄', '😅', '🤣','😂', '🙂', '🥰', '😍', '😘','😜','🤫','🤔','🤐','🤨','😔','🤮','🥺','😡','👿','💔','❤️','💯','🖤','🤍','🤚','🖐','👌','👈','👉','👆','🖕','👇','☝','👍','👊','👏','🤲','💪','🤝','🙅','🙅‍♀️','🐵','🐒','🐖','🐇','🦒','🐢', '🤑', '🤕', '🥶', '🙏', '🙋‍♂️', '🙋‍♀️', '🤦‍♂️']                   
    const addEmoje = (emoje) => setComment(p => p + emoje)

    const handleSubmit = e => {
        e.preventDefault()

        alert(comment)
        setComment('')
    }

    const likeOrDistLike = async() => {
        const data = await likeApi(_id)
        if(data && data.success)
            dispatch(likePost({postId: _id, userId: user._id}))
    }

    const commentVisib = () => {
        if(commentsShow){
            window.scrollTo({left: 0, top: window.scrollY - 200, behavior: 'smooth'})
            setCommentsShow(false)
        } else {
            setCommentsShow(true)
            window.scrollTo({left: 0, top: window.scrollY + 200, behavior: 'smooth'})
        }
    } 
    
    return (
        <PostCom>
            <div className="top">
                <div className='info'>
                    <Avatar src={createrImg} alt='Name' />
                    <div className='name'>
                        <NavLink to={userId === user._id ?`/profile`:`/user/${userId}`}>
                            <Typography variant='h5'>{createrName}</Typography>
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
                                {
                                    dropdownItems?.length && dropdownItems.map(({name, fn}, index) => (
                                        <ButtonBase key={index} sx={{width: '100%', borderRadius: '5px'}} onClick={closeDropdown}>
                                            <DropdownItem onClick={() => fn(_id)}>
                                                <h6>{name}</h6>
                                            </DropdownItem>
                                        </ButtonBase>
                                    ))
                                }
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
                    <Typography variant='h6'>9 <span>Comment</span></Typography>
                </div>
            </div>
            <CommnetArea ref={commetnAreaRef} d={commentsShow ?'block':'none'}>
                {
                    comments && comments.map(({comment, createdAt, userId}) => (
                        <CommentRow send={false}>
                            <Avatar src='/images/4.jpg' />
                            <p>
                                <span>
                                    <b>Sardor Rahimxon</b>
                                    <div>{}</div>
                                </span>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non accusantium repudiandae molestiae nam, sunt autem numquam qui sint obcaecati ex facilis earum dicta ipsum neque soluta, officiis aspernatur iusto molestias!
                            </p>
                        </CommentRow>
                    ))
                }
                <WriteComment>
                    <Avatar src={user.picture || avatarImg} alt='' />
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
                        <div className="icons">
                            <IconButton className='emojes-btn' size='small'>
                                <SentimentSatisfiedAlt />
                                <div className='emojes-list'>
                                {
                                    emojes.map((emoje, index) => <IconButton component="div" color='primary' key={index} size='small' onClick={() => addEmoje(emoje)}>{emoje}</IconButton>)
                                }
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