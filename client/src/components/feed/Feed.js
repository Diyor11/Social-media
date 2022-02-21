import React from 'react'
import { FeedCom } from './feed.elements.js'
import CreatePost from '../createPost/CreatePost'
import Post from '../post/Post'
import { useSelector, useDispatch } from 'react-redux'
import { hidePost } from '../../features/slices/postSlice'

const Feed = () => {

    const {posts, filteredPosts} = useSelector(state => state.posts)
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
                (filteredPosts?.length ? filteredPosts:posts)?.map(({_id, creater, createdAt, desc, img, likes, comments}, index) => <Post likes={likes} creater={creater} img={img} desc={desc} createdAt={createdAt} _id={_id} dropdownItems={dropdownItems} commentsId={comments}  key={index}/>)
            }
        </FeedCom>
    )
}

export default Feed
