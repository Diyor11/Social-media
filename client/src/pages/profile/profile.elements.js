import styled from 'styled-components'

export const InfoCard  = styled.div`
    border-radius: 15px;
    box-shadow: 1px 4px 9px rgba(0, 0, 0, 0.25);
    padding: 15px;
    margin-top: 20px;
    background-color: #fff;

    @media(max-wdth: 600px){
        margin-top: 0;
    }

    span{
        display: flex;
        padding: 8px 0;
        h6{
            font-family: sans-serif;
            font-size: 16px;
            padding-top: 2px;
            padding-left: 10px;
            span{
                text-transform: capitalize;
                display: inline;
            }
        }
    }
`

export const Container = styled.div`
    padding: 15px;

    @media(max-width: 600px) {
        padding: 5px 0;
        background-color: #ddd;
    }
`