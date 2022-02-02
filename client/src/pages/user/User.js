import React, {useState} from 'react'
import { Layout, LayoutMain } from '../../globalStyles'
import Navbar from '../../components/navbar/Navbar'
import {Grid, Box, Typography, Backdrop} from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import Avatar from '../../components/avatar/Avatar2'
import { InfoCard, Container } from '../profile/profile.elements'
import Post from '../../components/post/Post'
import { LocationOn, PriorityHigh, Favorite, AlternateEmail } from '@mui/icons-material'
import Photos from '../../components/photos/Photos'

const User = () => {

    const [navOpen, setNavOpen] = useState(false)

    return (
        <Layout>
            <Backdrop open={navOpen}  sx={{ zIndex: 1400 }} />
            <Navbar setNavOpen={setNavOpen}/>
            <LayoutMain>
                <Grid sx={{background: 'coral', }} container>
                    <Grid item md={3} sm={4}>
                        <Box height='100%' bgcolor='#fff' >
                            <Sidebar setNavOpen={setNavOpen} navOpen={navOpen} />
                        </Box>
                    </Grid>
                    <Grid item md={9} sm={8} xs={12} px={{md: '16px', sm: '8px', xs: '0'}}>
                        <Box height='100%' bgcolor='#fff'>
                            <Avatar />
                            <Grid container>
                                {/* <Grid item md={5} sm={12}>
                                        <Container>
                                            <Photos title='User friends' />
                                            <Photos title=' User photos' />
                                        </Container>
                                    </Grid>
                                </Grid> */}
                                <Grid item md={7} sm={12}>
                                    <Container>
                                        <InfoCard>
                                            <Typography variant='h6'>User Infomation</Typography>
                                            <span>
                                                <LocationOn />
                                                <h6>from Tashkent, in Uzbekistan</h6>
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
                                                <h6>diyorjsdev@gmail.com</h6>
                                            </span>
                                        </InfoCard>
                                        <Post my />
                                        <Post />
                                        <Post />
                                        <Post />
                                    </Container>
                                </Grid>
                                <Grid item md={5} sm={12}>
                                        <Container>
                                            <Photos title='User friends' />
                                            <Photos title=' User photos' />
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