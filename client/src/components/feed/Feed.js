import React from 'react'
import { FeedCom } from './feed.elements.js'
import CreatePost from '../createPost/CreatePost'
import Post from '../post/Post'
import { useSelector, useDispatch } from 'react-redux'
import { hidePost } from '../../features/slices/postSlice'

const Feed = () => {

    const posts = useSelector(state => state.posts.posts)
    const dispatch = useDispatch()   

    const dropdownItems = [
        {name: 'Follow', fn: () => {}},
        {name: 'Report', fn: () => {}},
        {name: 'Save', fn: () => {}},
        {name: 'Hide', fn: (_id) => dispatch(hidePost(_id))}
    ]

    return (
        <FeedCom>
            <CreatePost />
            {
                posts.map(({_id, userId, createdAt, desc, img, likes}, index) => <Post img={img} likes={likes} desc={desc} createdAt={createdAt} userId={userId} _id={_id} dropdownItems={dropdownItems}  key={index}/>)
            }
        </FeedCom>
    )
}

export default Feed
