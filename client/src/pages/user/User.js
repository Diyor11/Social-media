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
import { getUserById } from '../../apis/api'

const User = () => {

    const [navOpen, setNavOpen] = useState(false)
    const [user, setUser] = useState({name: '', img: '', city: '', from: '', email: '', posts: [], friends: []})
    const {id} = useParams()

    const dropdownItems = [
        {name: 'Follow', fn: () => {}},
        {name: 'Report', fn: () => {}},
        {name: 'Save', fn: () => {}},
        {name: 'Hide', fn: (_id) => setUser({...user, posts: user.posts.filter(post => post._id !== _id)})}
    ]

    const fetchData = async() => {
        const data = await getUserById(id)
        if(data){
            setUser({name: data.username, img: data.profilePicture, city: data.city, from: data.from, email: data.email, posts: data.posts, friends: data.friends})
        }
    }

    useEffect(() => {
        fetchData()
        return () => setUser({name: '', img: '', city: '', from: '', email: '', posts: [], friends: []})
    }, [id])

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
                            <Avatar img={user.img} name={user.name} />
                            <Grid container>
                                <Grid item md={7} sm={12}>
                                    <Container>
                                        <InfoCard>
                                            <Typography variant='h6'>User Infomation</Typography>
                                            <span>
                                                <LocationOn />
                                                <h6>from <span>{user.city}</span>, in <span>{user.from}</span></h6>
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
                                            user && user.posts.map(({_id, userId, createdAt, desc, img, likes, createrName, createrImg}, index) => <Post createrImg={createrImg} createrName={createrName} img={img} likes={likes} desc={desc} createdAt={createdAt} userId={userId} _id={_id} dropdownItems={dropdownItems}  key={index}/>)
                                        }                                        
                                    </Container>
                                </Grid>
                                <Grid item md={5} sm={12}>
                                        <Container>
                                        <Photos title='User friends'>
                                            {
                                                user && user.friends && user.friends.map(({profilePicture, _id, username}) => (
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
                                                user.posts && user.posts.map(({img}) => (
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

export default User