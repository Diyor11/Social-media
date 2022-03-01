import React, {useState, useEffect} from 'react'
import { Layout, LayoutMain } from '../../globalStyles'
import Navbar from '../../components/navbar/Navbar'
import {Grid, Box, Typography, Backdrop} from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import Avatar from '../../components/avatar/Avatar2'
import { InfoCard, Container } from '../profile/profile.elements'
import Post from '../../components/post/Post'
import { LocationOn, PriorityHigh, Favorite, AlternateEmail } from '@mui/icons-material'
import Photos from '../../components/photos/Photos'
import { useParams, NavLink } from 'react-router-dom'
import { getUserById, getFollow, getUnFollow } from '../../apis/api'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAvatar } from '../../features/slices/userSlice'

const User = () => {

    const [navOpen, setNavOpen] = useState(false)
    const [user, setUser] = useState({username: '', profilePicture: '', email: '', info: {desc: '', city: '', from: '', relationShip: ''}, posts: [], friends: []})
    const {id} = useParams()
    const myAcc = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const likeOrDistlike = (postId, userId) => {
        let {posts} = user
        const postIndex = posts.findIndex(post => post._id === postId)
        if(posts[postIndex].likes.includes(userId)){
            posts[postIndex].likes = posts[postIndex].likes.filter(id => id !== userId)
        } else {
            posts[postIndex].likes.push(userId)
        }
        setUser({...user, posts})
    }

    const dropdownItems = [
        {name: 'Follow', fn: () => {}},
        {name: 'Report', fn: () => {}},
        {name: 'Save', fn: () => {}},
        {name: 'Hide', fn: (_id) => setUser({...user, posts: user.posts.filter(post => post._id !== _id)})}
    ]

    const followOrUnFollow = async() => {
        if(user && user.friends.some(item => item._id === myAcc._id)){
            const data = await getUnFollow(user._id)
            if(data && data.success)
                setUser({...user, friends: user.friends.filter(user => user._id !== myAcc._id)})
        } else if(user){
            const data = await getFollow(user._id)
            if(data && data.success)
                setUser({...user, friends: [...user.friends, {_id: myAcc._id, username: myAcc.username, profilePicture: myAcc.picture}]})
        } else {
            console.log('Error follow')
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            const data = await getUserById(id, '?picture=true')
            if(data){
                setUser(data)
            }
        }
        fetchData()
        dispatch(fetchAvatar())
        return () => setUser({_id: '', username: '', profilePicture: '', email: '', info: {desc: '', city: '', from: '', relationShip: ''}, posts: [], friends: []})
    }, [id, dispatch])

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
                            <Avatar fn={followOrUnFollow} img={user.profilePicture} name={user.username} follow={user.friends.some(item => item._id === myAcc._id) ? 'UnFriedns':'Add Friend'} id={id}   />
                            <Grid container>
                                <Grid item md={7} sm={12}>
                                    <Container>
                                        <InfoCard>
                                            <Typography variant='h6'>User Infomation</Typography>
                                            <span>
                                                <LocationOn />
                                                <h6>from <span>{user.info.city}</span>, in <span>{user.info.from}</span></h6>
                                            </span>
                                            <span>
                                                <Favorite />
                                                <h6>{user.info.relationShip}</h6>
                                            </span>
                                            <span>
                                                <PriorityHigh />
                                                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque totam adipisci hic omnis quibusdam nostrum facere odit dolor illo nam!</h6>
                                            </span>
                                            <span>
                                                <AlternateEmail />
                                                <h6>{user.email}</h6>
                                            </span>
                                        </InfoCard>
                                        {
                                            user && user.posts && user.posts.map(({_id, createdAt, desc, img, likes, comments}, index) => <Post likes={likes} creater={{_id: user._id, username: user.username, profilePicture: user.profilePicture}} img={img} desc={desc} createdAt={createdAt} _id={_id} dropdownItems={dropdownItems} commentsId={comments} likeOrDistlikePost={likeOrDistlike}  key={index}/>)
                                        }                                        
                                    </Container>
                                </Grid>
                                <Grid item md={5} sm={12}>
                                        <Container>
                                        <Photos title='User friends'>
                                            {
                                                user && user.friends && user.friends.map(({profilePicture, _id, username}) => (
                                                    <span key={_id}>
                                                        <img alt='' src={profilePicture} />
                                                        <NavLink to={_id === myAcc._id ? '/profile' : `/user/${_id}`}>
                                                            <h6>{username}</h6>
                                                        </NavLink>
                                                    </span>
                                                ))
                                            }
                                        </Photos>
                                        <Photos title=' User photos' >
                                            {
                                                user.posts && user.posts.map(({img}, index) => (
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

export default User