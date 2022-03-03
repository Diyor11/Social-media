import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Box } from './styles'

const Verify = () => {

    const {email} = useParams()

  return (
    <Container>
        <Box>
            <h1 className="title">We already send link</h1>
            <h4 className="comment">
                We are already send link to your email <br /> 
                <b>{email}</b>
            </h4>
            <h4 className='comment'>
                Just click on  the link  in that to complete your signup
                if you don't see it you may need check your spam folder.
            </h4>
            <div class="contact">
                <h6>Need help? <a href="https://t.me/Diyor1023" target={'blank'}>Contact Us</a></h6>
            </div>
        </Box>
    </Container>
  )
}

export default Verify