import React, {useState, useRef} from 'react'
import { MyContainer, TextBox, Form2, Input, ErrMessage } from './styles'
import gImg from '../../assets/google.png'
import { NavLink } from 'react-router-dom'
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import {ButtonBase} from '@mui/material'
import { signUp } from '../../apis/api'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'

const SignUp = () => {

    const [inputErr, setInputErr] = useState({username: false, email: false, password: false, confirmPassword: false, city: false, country: false})
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const countryRef = useRef(null)
    const cityRef  = useRef(null)

    const navigate = useNavigate()

    const fetchData = async(userData) => {
        if(!navigator.onLine)
             return alert('You offline please check network connect')

        setLoading(true)
        const data = await signUp(userData)
        setLoading(false)
        
        if(!data){
            console.log('data error ' + data)
        }
        else if(data.error){
            setErrMsg(data.error)
        } else {
            navigate('/')
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        const username = usernameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        const country = countryRef.current.value
        const city = cityRef.current.value

        if(username.length < 3){
            setInputErr({username: true, email: false, password: false, confirmPassword: false, city: false, country: false})
            setErrMsg('Username must be min 3 charector')
            usernameRef.current.focus()
        } else if(email.length <  10 || !email.match(/^\w{5,15}@(gmail.com|mail.ru|outlook.com)$/i)){
            setInputErr({username: false, email: true, password: false, confirmPassword: false, city: false, country: false})
            setErrMsg('Email must be min 10 charector and consist of [a-z] [0-9] @ sybmles')
            emailRef.current.focus()
        } else if(password.length < 7){
            setInputErr({username: false, email: false, password: true, confirmPassword: false, city: false, country: false})
            setErrMsg('Password must be min 7 charector')
            passwordRef.current.focus()
        } else if(confirmPassword !== password){
            setInputErr({username: false, email: false, password: false, confirmPassword: true, city: false, country: false})
            setErrMsg('Confirm password not match to password')
            confirmPasswordRef.current.focus()
        } else if(country.length < 3){
            setInputErr({username: false, email: false, password: false, confirmPassword: false, city: false, country: true})
            setErrMsg('Country must be min 3 charector')
            countryRef.current.focus()
        } else if(city.length < 3){
            setInputErr({username: false, email: false, password: false, confirmPassword: false, city: true, country: false})
            setErrMsg('City must be min 3 charector')
            cityRef.current.focus()
        } else {
            setInputErr({username: false, email: false, password: false, confirmPassword: false, city: false, country: false})
            setErrMsg('')
            fetchData({username, email, password, info: { city, from: country }})
        }
    }

    return (
        <MyContainer>
            <TextBox>
                <h1>Messanger</h1>
                <h5>
                    Connect with your friends and the world arround you on Messanger
                </h5>
            </TextBox>
            <Form2 onSubmit={handleSubmit} >
                <Input type='text' placeholder='Username' ref={usernameRef} error={inputErr.username} />
                <Input type='text' placeholder='E-mail' error={inputErr.email} ref={emailRef} />
                <span className="password">
                    <Input type={showPassword ? 'text': 'password'} placeholder='Password' error={inputErr.password} ref={passwordRef} />
                    {
                        showPassword ? <VisibilityOff className='eye-icon' onClick={() => setShowPassword(false)} /> : <RemoveRedEye className='eye-icon' onClick={() => setShowPassword(true)} />
                    }
                </span>
                <Input type={showPassword ? 'text': 'password'} placeholder='Confirm password' error={inputErr.confirmPassword} ref={confirmPasswordRef} />
                <Input type='text' placeholder='Country' ref={countryRef} error={inputErr.country} />
                <Input type='text' placeholder='City' ref={cityRef} error={inputErr.city} />
                <ErrMessage >
                    {errorMsg}
                </ErrMessage>
                <ButtonBase component='div'>
                    <button className='login'>{loading ? <Loader /> : 'Sign up'}</button>
                </ButtonBase>
                <ButtonBase component='div'>
                    <button className='google-btn'>
                        <img alt='Google' src={gImg} /><span>Sign up with Google</span>
                    </button>
                </ButtonBase>
                <div className="under-text">
                    <h5>Do you have already account? </h5>
                    <NavLink to='/login/signin'>Sign in now</NavLink>
                </div>
            </Form2>
        </MyContainer>
    )
}

export default SignUp
