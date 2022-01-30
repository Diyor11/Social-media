import styled from 'styled-components'

export const MyContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ddd;
    padding: 0 170px;

    @media(max-width: 1100px){
        padding: 0 60px;
    }
    @media(max-width: 800px){
        background-color: #fff;
        justify-content: center;
    }
`
export const TextBox = styled.div`
    flex-basis: 50%;
    padding: 0 25px;

    @media(max-width: 800px){
        display: none;
    }

    h1{
        color: #4D86F5;
        font-family: 'Roboto', sans-serif;
        font-size: 63px;
    }
    h5{
        font-family: sans-serif;
        font-size: 23px;
        margin: 14px 0 30px;
    }
`

export const Form = styled.form` 
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;

    span.password{
        position: relative;
        input[type="password"]{
            padding-right: 47px;
        }
         .eye-icon{
             position: absolute;
             right: 10px;
             top: 0;
             bottom: 0;
             margin: auto 0;
             font-size: 22px;
             color: #222;
             cursor: pointer;
         }
    }
    button{
        border-radius: 6px;
        color: #fff;
        border: none;
        margin: 5px 0;
        width: 100%;
    }
    button.login{
        padding: 8px 0;
        background-color: #4D86F5;
        font-size: 19px;
    }
    button.google-btn{
        display: flex;
        align-items: center;
        background-color: #2B2B2C;
        font-size: 16px;
        justify-content: center;
        padding: 6px 0;

        img{
            width: 25px;
            margin-right: 13px;
        }
    }
    .remember{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 6px 0;

        span{
            display: flex;
            align-items: center;
            input{
                min-width: initial;
                margin: 0 7px 0 0;
            }
            label{
                font-family: sans-serif;
                font-family: sans-serif;
                font-weight: 540;
                font-size: 12px;
            }
        }
        h5{
            font-size: 12px;
            color: #4D86F5;
            font-family: sans-serif;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    .under-text{
        display: flex;
        align-items: center;
        font-size: 13px;
        font-family: sans-serif;
        width: fit-content;
        margin: 13px auto 0;
        h5{
            color: #566;
        }
        a{
            font-weight: 600;
            margin-left: 5px;
            color: #4D86F5;
            &:hover{
                text-decoration: underline;
            }
        }
    }
`

export const Input = styled.input`
    margin: 10px 0;
    padding: 8px 12px;
    border: 1px solid ${({error}) => (error ? 'red': '#777')};
    border-radius: 7px;
    font-size: 15px;
    min-width: 300px;
    &::placeholder{
        font-size: 14px;
    }

    @media(max-width: 340px){
        min-width: initial;
    }
`

export const ErrMessage = styled.div`
    color: red;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    max-width: 300px;
`

export const Form2 = styled(Form)`

`