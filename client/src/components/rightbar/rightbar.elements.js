import styled from 'styled-components'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
    itemName: {
        fontSize: '16px !important',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
            color: 'blue',
        }
    }
})

export const RightbarCom = styled.div`
    padding: 20px;
    position: absolute;
    top: 64px;
    right: 0;

    width: 25%;
    padding: 20px;
    position: fixed;
    overflow-y: scroll;
    height: calc(100vh - 64px);
    &::-webkit-scrollbar{
        display: none;
    }

    .img-box{
        margin: 13px 0;
        border-radius: 20px;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
`