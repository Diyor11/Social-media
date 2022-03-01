import React, { useState } from 'react'
import { Layout, LayoutMain } from '../../globalStyles'
import Navbar from '../../components/navbar/Navbar'
import { Grid } from '@mui/material'
import { Max600 } from './messanger.elements'
import FriendsSide from '../../components/friendsSide/FriendsSide'
import Chatbox from '../../components/chatbox/Chatbox'

const Messanger = () => {

    const [showSide, setShowSide] = useState(false)
    const [onlines, setOnlines] = useState([])        

    return (
        <Layout fullHeight>
            <Max600>
                <Navbar />
            </Max600>
                
            <LayoutMain>
                <Grid container>
                    <Grid item md={3} sm={3} xs={0} >
                        <FriendsSide showSide={showSide} setShowSide={setShowSide} onlines={onlines} />
                    </Grid>
                    <Grid item md={9} sm={9} xs={12}  >
                        <Chatbox setShowSide={setShowSide} setOnlines={setOnlines} />
                    </Grid>
                </Grid>
            </LayoutMain>
        </Layout>
    )
}

export default Messanger