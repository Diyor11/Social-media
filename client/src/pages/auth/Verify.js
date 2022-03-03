import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Box } from './styles'

const Verify = () => {

    const {email} = useParams()
    const navigate = useNavigate()

  return (
    <Container>
        <Box>
            <h1 className="title">Please verify your email</h1>
            <h4 className="comment">
                You're almost there! We sent an email to <br /> 
                <b>{email}</b>
            </h4>
            <h4 className='comment'>
                Just click on  the link  in that to complete your signup
                if you don't see it you may need check your spam folder.
            </h4>
            <h5 className="noEmail">Still can't find the email?</h5>
            <button id="btn" onClick={() => navigate('/verify/exist/' + email)}>Resend Eamil</button>

            <div class="contact">
                <h6>Need help? <a href="https://t.me/Diyor1023" target={'blank'}>Contact Us</a></h6>
            </div>
        </Box>
    </Container>
  )
}

export default Verify