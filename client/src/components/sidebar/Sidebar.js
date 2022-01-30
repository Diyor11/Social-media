import React from 'react'
import { SidebarCom, items, StyledBadge, useStyles, CloseBtn } from './sidebar.elements'
import { List, ListItem, ListItemButton, ListItemIcon, Typography, Button, Divider, Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { Close } from '@mui/icons-material'

const Sidebar = ({navOpen, setNavOpen}) => {

    
    const users = [
        {
            name: 'Jhon Conor',
            img: '/images/1.jpg'
        },
        {
            name: 'Emma Watson',
            img: '/images/2.jpg'
        },
        {
            name: 'Sunny Leoni',
            img: '/images/3.jpg'
        }
    ]

    const classes = useStyles()

    return (
        <SidebarCom open={navOpen}>
            <List className={classes.list}>
                <CloseBtn onClick={() => setNavOpen(false)}><Close /></CloseBtn>
                {
                    items.map(({text, Icon, link, iconColor}, index) => (
                        <NavLink to={link} key={index}>
                            <ListItem disablePadding>
                                <ListItemButton className={classes.itemBtn}>
                                    <ListItemIcon>
                                        <Icon sx={{color: iconColor}} className={classes.sidebarItemText}/>
                                    </ListItemIcon>
                                    <Typography  color='black' variant='h6' fontSize="20px">{text}</Typography>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))
                }
                <ListItem>
                    <Button variant='contained' className={classes.btn}>Show more</Button>
                </ListItem>
            </List>
            <Divider />
            <List>
                {
                    users.length && users.map((item, index) => (
                        <ListItem key={index} className={classes.listItem}>
                            <StyledBadge
                                delay={index * 0.4}
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt={item.name} src={item.img} />
                            </StyledBadge>
                            <Typography className={classes.avatarName} variant='h6'>{item.name}</Typography>
                        </ListItem>
                    ))
                }                
            </List>
        </SidebarCom>
    )
}

export default Sidebar
