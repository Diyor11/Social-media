import styled, { keyframes } from 'styled-components'
import { makeStyles } from '@mui/styles'
import { Badge, IconButton } from '@mui/material'
import {RssFeed, Chat as ChatIcon, PlayCircleOutline, Group as GroupIcon, Bookmarks, HelpOutline, BusinessCenter, EventNote, School } from '@mui/icons-material';

export const SidebarCom = styled.div`
    width: 25%;
    padding: 20px;
    position: fixed;
    top: 64px;
    left: 0;
    overflow-y: scroll;
    height: calc(100vh - 64px);
    transition: 0.2s;
    &::-webkit-scrollbar{
        width: 6px;
    }
    &::-webkit-scrollbar-track{
        background-color: #EEEDED
    }
    &::-webkit-scrollbar-thumb{
        background-color: #C4C4C4;
        border-radius: 6px;
    }
    @media (max-width: 900px){
        width: 33.3%;
        padding: 12px;
    }
    @media(max-width: 600px){
        top: 0;
        width: 280px;
        left: 0;
        z-index: 1500;
        transform: translateX(${({open}) => (open ? '0':'-100%')});
        height: 100vh;
        background-color: #fff;
    }
`

const ripple = keyframes`
    0%{
      transform: scale(.8);
      opacity: 1;
    }
    100%{
      transform: scale(2.4);
      opacity: 0;
    }
`

export const StyledBadge = styled(Badge)`
  .MuiBadge-badge{
    background-color: #44b700;
    color: #44b700;
    box-shadow: 0 0 0 2px #333;
    &:after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: ${ripple} 1.2s infinite ease-in-out;
      animation-delay: ${({delay}) => delay + 's' || '0s' };
      border: 1px solid currentColor;
    }
}`

export const items = [
    {
        text: 'Feed',
        Icon: RssFeed,
        link: '/',
        iconColor: '#1A81F4'
    },
    {
        text: 'Chats',
        Icon: ChatIcon,
        link: '/messanger',
        iconColor: '#379BE9'
    },
    {
        text: 'Videos',
        Icon: PlayCircleOutline,
        link: '/',
        iconColor: '#379BE9'
    },
    {
        text: 'Group',
        Icon: GroupIcon,
        link: '/',
        iconColor: '#379BE9'
    },
    {
        text: 'Bookmarks',
        Icon: Bookmarks,
        link: '/',
        iconColor: '#379BE9'
    },
    {
        text: 'Questions',
        Icon: HelpOutline,
        link: '/',
        iconColor: '#9D37C9'
    },
    {
        text: 'Jobs',
        Icon: BusinessCenter,
        link: '/',
        iconColor: '#EA582A'
    },
    {
        text: 'Events',
        Icon: EventNote,
        link: '/',
        iconColor: '#E52243'
    },
    {
        text: 'Courses',
        Icon: School,
        link: '/',
        iconColor: '#E38427'
    }
]

export const useStyles = makeStyles({
    sidebarItemText: {
        fontSize: '25px !important',
    },
    btn: {
        backgroundColor: 'rgba(150, 150, 150, 0.4) !important',
        color: '#000',
        '&:hover': {
            backgroundColor: 'rgba(150, 150, 150, 0.6) !important',
        }
    },
    itemBtn: {
        borderRadius: '12px !important'
    },
    avatarName: {
        marginLeft: '13px !important',
        fontSize: '14px !important',
        userSelect: 'none !important',
    },
    listItem: {
        cursor: 'pointer !important'
    },
    list: {
        position: 'relative'
    }
})

export const CloseBtn = styled(IconButton)`
    position: absolute !important;
    right: -12px;
    top: -14px;
    padding: 4px 8px;

    @media(min-width: 600px){
        display: none !important;
    }
`