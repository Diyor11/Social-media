import React, {useState, useEffect} from 'react'
import { Layout, LayoutMain } from '../../globalStyles'
import Navbar from '../../components/navbar/Navbar'
import {Grid, Box, Typography, Backdrop} from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import Avatar from '../../components/avatar/Avatar'
import CreatePost from '../../components/createPost/CreatePost'
import { InfoCard, Container } from './profile.elements'
import Post from '../../components/post/Post'
import { LocationOn, PriorityHigh, Favorite, AlternateEmail } from '@mui/icons-material'
import Photos from '../../components/photos/Photos'
import { useSelector, useDispatch } from 'react-redux'
import { deletePost, getUserById } from '../../apis/api'
import { deletePost as removePost } from '../../features/slices/postSlice'
import { fetchAvatar } from '../../features/slices/userSlice'
import { NavLink } from 'react-router-dom'

const Profile = () => {

    const [navOpen, setNavOpen] = useState(false)
    const {user: {user}} = useSelector((state) => state)
    const [myData, setMyData] = useState({username: '', email: '', posts: [], friends: [], info: {desc: '', city: '', from: '', relationShip: ''}})
    const dispatch = useDispatch()
    
    const deletePostFn = async(_id) => {
        const data = await deletePost(_id, user._id)
        if(data){
            dispatch(removePost(_id))
            setMyData({...myData, posts: myData.posts.filter(post => post._id !== _id)})
        }
    }

    const dropdownItems = [
        {name: 'Delete', fn: deletePostFn},
        {name: 'Embed', fn: () => {}},
    ]

    const addMyposts = (d) => setMyData({...myData, posts: [d, ...myData.posts]})

    const likeOrDistlike = (postId, userId) => {
        let {posts} = myData
        const postIndex = posts.findIndex(post => post._id === postId)
        if(posts[postIndex].likes.includes(userId)){
            posts[postIndex].likes = posts[postIndex].likes.filter(id => id !== userId)
        } else {
            posts[postIndex].likes.push(userId)
        }
        setMyData({...myData, posts})
    }

    useEffect(() => {
        dispatch((fetchAvatar()))

        const fetchMyData = async() => {
            const data = await getUserById(user._id, '')
            if(data){
                setMyData(data)
            }
        }

        fetchMyData()
    }, [dispatch, user._id])

    return (
        <Layout>
            <Backdrop open={navOpen}  sx={{ zIndex: 1400 }} />
            <Navbar setNavOpen={setNavOpen}/>
            <LayoutMain>
                <Grid container>
                    <Grid item md={3} sm={4}>
                        <Box height='100%' bgcolor='#fff' >
                            <Sidebar setNavOpen={setNavOpen} navOpen={navOpen} />
                        </Box>
                    </Grid>
                    <Grid item md={9} sm={8} xs={12} px={{md: '16px', sm: '8px', xs: '0'}}>
                        <Box height='100%' bgcolor='#fff'>
                            <Avatar name={user.username} />
                            <Grid container>
                                <Grid item md={7} sm={12}>
                                    <Container>
                                        <CreatePost addMyposts={addMyposts} />
                                        <InfoCard>
                                            <Typography variant='h6'>User Infomation</Typography>
                                            <span>
                                                <LocationOn />
                                                <h6>
                                                    from <span>{myData.info.city}</span>, in <span>{myData.info.from}</span>
                                                </h6>
                                            </span>
                                            <span>
                                                <Favorite />
                                                <h6>{myData.info.relationShip}</h6>
                                            </span>
                                            <span>
                                                <PriorityHigh />
                                                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque totam adipisci hic omnis quibusdam nostrum facere odit dolor illo nam!</h6>
                                            </span>
                                            <span>
                                                <AlternateEmail />
                                                <h6>{myData.email}</h6>
                                            </span>
                                        </InfoCard>
                                        {
                                            myData && myData.posts && myData.posts.map(({_id, createdAt, desc, img, likes, comments}, index) => <Post likes={likes} img={img} desc={desc} createdAt={createdAt} _id={_id} dropdownItems={dropdownItems} commentsId={comments} creater={{_id: user._id, profilePicture: user.picture, username: user.username}} likeOrDistlikePost={likeOrDistlike}  key={index}/>)
                                        }
                                    </Container>
                                </Grid>
                                <Grid item md={5} sm={12}>
                                    <Container>
                                        <Photos title='User friends'>
                                            {
                                                myData && myData.friends && myData.friends.map(({profilePicture, _id, username}) => (
                                                    <span key={_id}>
                                                        <img alt='' src={profilePicture} />
                                                        <NavLink to={`/user/${_id}`}>
                                                            <h6>{username}</h6>
                                                        </NavLink>
                                                    </span>
                                                ))
                                            }
                                        </Photos>
                                        <Photos title=' User photos' >
                                            {
                                                myData?.posts && myData.posts.map(({img}, index) => (
                                                    <span key={index}>
                                                        <img src={img} alt={''} />
                                                    </span>
                                                ))
                                            }
                                        </Photos>
                                    </Container>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </LayoutMain>
        </Layout>
    )
}

export default Profile