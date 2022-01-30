import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import { Avatar, Divider } from '@mui/material'
import { InsertPhoto, LocalOffer, LocationOn, EmojiEmotions, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../apis/api'
import {addPost} from '../../features/slices/postSlice'

const Post = styled.div`
    padding: 15px;
    border-radius: 15px;
    box-shadow: 1px 4px 9px rgba(0, 0, 0, 0.25);
    background-color: #fff;

    .top{
        display: flex;
        align-items: center;
        input{
            border: none;
            margin-left: 15px;
            width: 100%;
        }
    }
    .bottom{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item{
            display: flex;
            align-items: center;
            cursor: pointer;
            user-select: none;
            h6{
                font-size: 15px;
                color: #444;
                margin-left: 8px;
                font-family: 'Roboto', sans-serif;
            }
        }
        button.share{
            color: #fff;
            font-family: sans-serif;
            background: #12B723;
            border-radius: 4px;
            padding: 6px 10px;
            border: none;
        }
    }

    @media(max-width: 600px){
        border-radius: 0;
        box-shadow: none;

         .bottom{
             .item{
                 h6{display: none;}
             }
         }
    }
`

const ImageBox = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 15px;
    display: ${({img}) => !img && 'none'};
    
    img{
        width: 100%;
    }
    .clearBtn{
        position: absolute;
        top: 15px;
        right: 15px;
        color: #fff;
        display: ${({img}) => img ? 'block':'none'};
        padding: 2px;
        box-sizing: initial;
        background: rgba(0,0,0,0.7);
        border-radius: 50%;
        cursor: pointer;
    }
`

const CreatePost = () => {

    const [img, setImg] = useState('')
    const title = useRef('')

    const imageChange = ({target: {files}}) => {
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = () => setImg(reader.result)
      }

      const user = useSelector(state => state.user.user)
      const dispatch = useDispatch()

    const sharePost = async () => {
        const desc = title.current.value
        if(!desc || !img)
            return alert("Description and Image required")
        const post = {img, desc, userId: user._id}
        const data = await createPost(post)  
        if(data)
            dispatch(addPost(data))
    }

    return(
        <Post>
            <div className='top'>
                <Avatar src={user.picture} alt='joht doe' />
                <input type="text" placeholder={`${user.username} whats your mine today`} ref={title} />
            </div>
            <Divider sx={{my: '15px'}} />
            <ImageBox img={img}>
                <Close className='clearBtn' onClick={() => setImg('')} />
                <img src={img} alt='' />
            </ImageBox>
            <div className="bottom">
                <label htmlFor="choose-file" className="item">
                    <input type='file' id='choose-file' hidden onChange={imageChange} />
                    <InsertPhoto sx={{color: '#EC5829'}} />
                    <h6>Insert Photo or video</h6>
                </label>
                <div className="item">
                    <LocalOffer sx={{color: '#1D19F0'}} />
                    <h6>Tags</h6>
                </div>
                <div className="item">
                    <LocationOn sx={{color: '#21DF57'}} />
                    <h6>Location</h6>
                </div>
                <div className="item">
                    <EmojiEmotions sx={{color: '#DEE129'}} />
                    <h6>Feelings</h6>
                </div>
                <button className='share' onClick={sharePost}>Share</button>
            </div>
        </Post>
    )
}

export default CreatePost