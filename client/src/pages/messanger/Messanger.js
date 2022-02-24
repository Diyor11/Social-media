import React from 'react'
import { Layout, LayoutMain } from '../../globalStyles'
import Navbar from '../../components/navbar/Navbar'
import { Grid } from '@mui/material'
import { Max600 } from './messanger.elements'
import FriendsSide from '../../components/friendsSide/FriendsSide'
import Chatbox from '../../components/chatbox/Chatbox'

const Messanger = () => {

  return (
    <Layout fullHeight>
        <Max600>
            <Navbar />
        </Max600>
            
        <LayoutMain>
            <Grid container>
                <Grid item sx={{background: 'green', display: {md: 'block', sm: 'block', xs: 'none'}}} md={3} sm={3} xs={0} >
                    <FriendsSide />
                </Grid>
                <Grid item sx={{background: 'red'}} md={9} sm={9} xs={12} >
                    <Chatbox />
                </Grid>
            </Grid>
        </LayoutMain>
    </Layout>
  )
}

export default Messanger