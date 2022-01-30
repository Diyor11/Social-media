import React from 'react'
import {Snackbar} from '@mui/material'
import {Wifi} from '@mui/icons-material'

const Network = ({online}) => {

    return (
        <Snackbar
            open={online}
            message='You are offline'
            action={<Wifi sx={{color: 'red'}} fontSize="large" />}
        />
    )
}

export default Network
