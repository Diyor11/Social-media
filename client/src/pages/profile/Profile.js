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
import { deletePost } from '../../apis/api'
import { deletePost as removePost, fetchMyPosts } from '../../features/slices/postSlice'
import { fetchAvatar } from '../../features/slices/userSlice'
import { NavLink } from 'react-router-dom'

const Photo = ({img}) => (
    <span>
        <img alt='' src={img} />
    </span>
)

const UserPhoto = ({profilePicture, name, _id}) => (
    <span>
        <img alt='' src={profilePicture} />
        <NavLink to={`/user/${_id}`}>
            <h6>{name}</h6>
        </NavLink>
    </span>
)

const Profile = () => {

    const [navOpen, setNavOpen] = useState(false)
    const {user: {user}, posts: {myposts}} = useSelector((state) => state)
    const dispatch = useDispatch()
    
    const deletePostFn = async(_id) => {
        const data = await deletePost(_id, user._id)
        if(data){
            dispatch(removePost(_id))
        }
    }

    const dropdownItems = [
        {name: 'Delete', fn: deletePostFn},
        {name: 'Embed', fn: () => {}},
    ]

    useEffect(() => {
        if(user){
            dispatch(fetchMyPosts(user._id))
            dispatch((fetchAvatar()))
        }
    }, [])

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
                                        <CreatePost />
                                        <InfoCard>
                                            <Typography variant='h6'>User Infomation</Typography>
                                            <span>
                                                <LocationOn />
                                                <h6>
                                                    from <span>{user.city}</span>, in <span>{user.from}</span>
                                                </h6>
                                            </span>
                                            <span>
                                                <Favorite />
                                                <h6>Single</h6>
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
                                            myposts.map(({_id, userId, createdAt, desc, img, likes, createrName, createrImg}, index) => <Post createrName={createrName} createrImg={createrImg} img={img} likes={likes} desc={desc} createdAt={createdAt} userId={userId} _id={_id} dropdownItems={dropdownItems}  key={index}/>)
                                        }
                                    </Container>
                                </Grid>
                                <Grid item md={5} sm={12}>
                                    <Container>
                                        <Photos title='User friends'>
                                            {
                                                user.allUsers && user.allUsers.map(({profilePicture, _id, username}) => (
                                                    <span>
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
                                                myposts && myposts.map(({img}) => (
                                                    <span>
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