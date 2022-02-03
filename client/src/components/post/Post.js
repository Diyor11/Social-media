import React, {useState} from 'react'
import { PostCom, LikeIcon, SaveIcon, HeartIcon, CommetnIcon, CommnetArea, CommentRow, WriteComment } from './post.elements'
import { Avatar, Typography, IconButton, ClickAwayListener } from '@mui/material'
import { MoreVert, SentimentSatisfiedAlt, CameraAlt, Send } from '@mui/icons-material'
import { Dropdown, DropdownItems, DropdownItem } from '../navbar/navbar.elements'
import { ButtonBase } from '@mui/material'
import moment from 'moment'
import { useSelector } from 'react-redux'
import avatarImg from '../../assets/avatar'

const Post = ({dropdownItems, _id, img, desc, createdAt}) => {

    const [dropdown, setDropdown] = useState(false)
    
    const [commentsShow, setCommentsShow] = useState(false)
    const [comment, setComment] = useState('')
    const user = useSelector(state => state.user.user)

    const closeDropdown = () => setDropdown(false)
    const emojes = ['😀', '😄', '😅', '🤣','😂', '🙂', '🥰', '😍', '😘','😜','🤫','🤔','🤐','🤨','😔','🤮','🥺','😡','👿','💔','❤️','💯','🖤','🤍','🤚','🖐','👌','👈','👉','👆','🖕','👇','☝','👍','👊','👏','🤲','💪','🤝','🙅','🙅‍♀️','🐵','🐒','🐖','🐇','🦒','🐢', '🤑', '🤕', '🥶', '🙏', '🙋‍♂️', '🙋‍♀️', '🤦‍♂️']                   
    const addEmoje = (emoje) => setComment(p => p + emoje)

    const handleSubmit = e => {
        e.preventDefault()

        alert(comment)
        setComment('')
    }


    return (
        <PostCom>
            <div className="top">
                <div className='info'>
                    <Avatar src='/images/3.jpg' alt='Name' />
                    <div className='name'>
                        <Typography variant='h5'>Lana Rhoades</Typography>
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
                    <IconButton>
                        <LikeIcon />
                    </IconButton>
                    <IconButton>
                        <SaveIcon />
                    </IconButton>
                    <IconButton>
                        <HeartIcon />
                    </IconButton>
                    <Typography variant='h6'>32 <span>people like it</span></Typography>
                </div>
                <div className="comment" onClick={() => setCommentsShow(p => !p)}>
                    <IconButton>
                        <CommetnIcon />
                    </IconButton>
                    <Typography variant='h6'>9 <span>Comment</span></Typography>
                </div>
            </div>
            <CommnetArea d={commentsShow ?'block':'none'}>

                <CommentRow>
                    <Avatar src='/images/4.jpg' />
                    <p>
                        <b>Mike Jons</b>
                        Lorem ipsum dolor sit amet.
                    </p>
                </CommentRow>
                <CommentRow>
                    <Avatar src='/images/4.jpg' />
                    <p>
                        <b>Sardor Rahimxon</b>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non accusantium repudiandae molestiae nam, sunt autem numquam qui sint obcaecati ex facilis earum dicta ipsum neque soluta, officiis aspernatur iusto molestias!
                    </p>
                </CommentRow>
                <CommentRow send>
                    <Avatar src='/images/2.jpg' />
                    <p>
                        <b>Umidov Sardor</b>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non accusantium repudiandae molestiae nam, sunt autem numquam qui sint obcaecati ex facilis earum dicta ipsum neque soluta, officiis aspernatur iusto molestias!
                    </p>
                </CommentRow>
                <WriteComment>
                    <Avatar src={user.img || avatarImg} alt='Jhon' />
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
                        <div className="icons">
                            <IconButton className='emojes-btn' size='small'>
                                <SentimentSatisfiedAlt />
                                <div className='emojes-list'>
                                {
                                    emojes.map((emoje, index) => <IconButton key={index} size='small' onClick={() => addEmoje(emoje)}>{emoje}</IconButton>)
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