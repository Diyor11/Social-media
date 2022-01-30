import React, {useState, useEffect} from 'react'
import { Layout, LayoutMain } from '../../globalStyles'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Grid, Box, Backdrop } from '@mui/material'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllPosts } from '../../features/slices/postSlice'

const Home = () => {

    const [navOpen, setNavOpen] = useState(false)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllPosts(user._id))
    }, [user, dispatch])

    return (
        <Layout>
            <Backdrop open={navOpen}  sx={{ zIndex: 1400 }} />
            <Navbar setNavOpen={setNavOpen}/>
            <LayoutMain>
                <Grid sx={{background: 'coral'}} container>
                    <Grid item md={3} sm={4}>
                        <Box height='100%' bgcolor='#fff' >
                            <Sidebar setNavOpen={setNavOpen} navOpen={navOpen} />
                        </Box>
                    </Grid>
                    <Grid item md={6} sm={8} xs={12} px={{md: '16px', sm: '8px', xs: '0'}}>
                        <Box height='100%' bgcolor='#fff'>
                            <Feed />
                        </Box>
                    </Grid>
                    <Grid item md={3} sx={{display: {md: 'block', sm: 'none', xs: 'none'}}}>
                        <Box height='100%' bgcolor='#fff'>
                            <Rightbar />
                        </Box>
                    </Grid>
                </Grid>
            </LayoutMain>
        </Layout>
    )
}

export default Home
