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
                (filteredPosts?.length ? filteredPosts:posts)?.map(({_id, userId, createdAt, desc, img, likes, createrName, createrImg, comments}, index) => <Post likes={likes} createrImg={createrImg} createrName={createrName} img={img} desc={desc} createdAt={createdAt} userId={userId} _id={_id} dropdownItems={dropdownItems} comments={comments}  key={index}/>)
            }
        </FeedCom>
    )
}

export default Feed
