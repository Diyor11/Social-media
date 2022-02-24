import styled, {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    a{
        text-decoration: none;
        color: unset;
    }
    button, input{
        outline: none;
    }
    button{
        cursor: pointer;
    }
    li{
        list-style-type: none;
    }
`
export const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 64px 1fr;
    height: 100vh;

    @media(max-width: 600px){
        grid-template-rows: ${({fullHeight}) => fullHeight ? '1fr':'56px 1fr'};
    }
`

export const LayoutMain = styled.div`
    display: grid;
    grid-template: 1fr;
`