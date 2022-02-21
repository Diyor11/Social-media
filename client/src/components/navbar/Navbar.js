import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Stack, IconButton, Badge, Avatar, ClickAwayListener, Divider, ButtonBase } from '@mui/material'
import { useStyles, Form, Dropdown, DropdownItems, DropdownItem, IconBtn } from './navbar.elements'
import { Search, Notifications, Message, Person, AccountCircle, BookmarkBorder, Settings, Help, Logout, Menu } from '@mui/icons-material'
import {logOut} from '../../features/slices/userSlice'
import {filterPost} from '../../features/slices/postSlice'
import {useDispatch, useSelector} from 'react-redux'
import avatarImg from '../../assets/avatar'

const Navbar = ({setNavOpen}) => {

    const classes = useStyles()
    const [dropdown, setDropdown] = useState(false)
    const [avatarDropdown, setAvatarDropdown] = useState(false)
    const dispatch = useDispatch()
    const {user: {user}, posts: {posts}} = useSelector(state => state)

    
    const handleChange = ({target: {value}}) => {
        let matchPosts = []
        if(posts && posts.length && value && window.location.pathname === '/'){
            posts.forEach((post) => {
                const {creater, desc} = post
                if(creater.username.toLowerCase().includes(value.toLowerCase()) || desc.toLowerCase().includes(value.toLowerCase())){
                    matchPosts.push(post)
                }
            })  
        }
        if(matchPosts.length) {
            dispatch(filterPost(matchPosts))
        } else {
            dispatch(filterPost(posts))
        }
    }

    useEffect(() => {

        return () => dispatch(filterPost([]))
    }, [dispatch])

    return (
        <div>
            <AppBar sx={{background: '#4D86F5'}}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant='h3' className={classes.brand}>
                        <IconButton onClick={() => setNavOpen(p => !p)} sx={{color: '#fff', display: {xs: 'inline-flex', sm: 'none', md: 'none', lg: 'none'}}} ><Menu /></IconButton>
                        <NavLink to='/'>
                            Messanger
                        </NavLink>
                    </Typography>
                    <Form autoComplete="off" onSubmit={e => e.preventDefault()}>
                        <label htmlFor="search">
                            <Search className={classes.searchIcon}/>
                        </label>
                        <input type='text' placeholder='Search for  friends, posts or video...' id='search' onChange={handleChange} />
                    </Form>
                    <Stack direction='row'>
                        <ClickAwayListener onClickAway={() => setDropdown(false)}>
                            <IconButton onClick={() => setDropdown(!dropdown)}>
                                <Badge badgeContent={4} color="error">
                                    <Notifications className={classes.icons} />
                                </Badge>
                                <Dropdown dropdown={dropdown}>
                                    <DropdownItems>
                                        <li>Somebody like your post</li>
                                        <Divider />
                                        <li>Amanada Leo create new post</li>
                                        <Divider />
                                        <li>Semmi Joe unfollow you</li>
                                        <Divider />
                                        <li>Jemi Doe write comment your post</li>
                                    </DropdownItems>
                                </Dropdown>
                            </IconButton>
                        </ClickAwayListener>
                        <IconBtn>
                            <Message className={classes.icons} />
                        </IconBtn>
                        <IconBtn>
                            <NavLink to='/profile'>
                                <Person className={classes.icons} />
                            </NavLink>
                        </IconBtn>
                        <ClickAwayListener onClickAway={() => setAvatarDropdown(false)}>
                            <div className={classes.notificateBtn}>
                                <Avatar src={user.picture || avatarImg} alt='saoem' className={classes.avatar} onClick={() => setAvatarDropdown(p => !p)} />
                                <Dropdown dropdown={avatarDropdown} w='150px'>
                                    <DropdownItems>
                                        <NavLink to='/profile'>
                                            <DropdownItem>
                                                <ButtonBase className={classes.buttonBase}>
                                                    <AccountCircle />
                                                    <h6>Profile</h6>
                                                </ButtonBase>
                                            </DropdownItem>
                                        </NavLink>
                                        <DropdownItem>
                                            <ButtonBase className={classes.buttonBase}>
                                                <BookmarkBorder />
                                                <h6>Saved</h6>
                                            </ButtonBase>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <ButtonBase className={classes.buttonBase}>
                                                <Settings />
                                                <h6>Settings</h6>
                                            </ButtonBase>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <ButtonBase className={classes.buttonBase}>
                                                <Help />
                                                <h6>Help</h6>
                                            </ButtonBase>
                                        </DropdownItem>
                                        <Divider />
                                        <DropdownItem onClick={() => dispatch(logOut())}>
                                            <ButtonBase className={classes.buttonBase}>
                                                <Logout />
                                                <h6>Log out</h6>
                                            </ButtonBase>
                                        </DropdownItem>
                                    </DropdownItems>
                                </Dropdown>
                            </div>
                        </ClickAwayListener>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
