import axios from 'axios'

const api = axios.create({
    baseURL: "https://enigmatic-shelf-58869.herokuapp.com/api",
    headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('profile-data'))?.token}`
    }
}) 

export const signUp = async (user) => {
    const {data} = await api.post('/auth/signup', user).catch(e => console.log('Error sign up'))
    return data
}

export const signIn = async (user) => {
    const {data} = await api.post('/auth/signin', user).catch(e => console.log('Error'))
    return data
}

export const createPost = async (postData) => {
    const {data} = await api.post('/posts/create', postData).catch(e => console.log('Error'))
    return data
}

export const updatePost = async (postData, _id) => {
    const {data} = await api.put('/posts/' + _id, postData).catch(e => console.log('Error'))
    return data
}

export const likePost = async (postId, userId) => {
    const {data} = await api.patch('/posts/like/' + postId).catch(e => console.log('Error'))
    return data
}

export const getPost = async (postId) => {
    const {data} = await api.get('/posts/' + postId).catch(e => console.log('Error'))
    return data
}

export const deletePost = async (postId, userId) => {
    const {data} = await api.delete('/posts/' + postId, {userId}).catch(e => console.log('Error'))
    return data
}

export const getAllPosts = async () => {
    const {data} = await api.get(`posts/all/posts`).catch(e => console.log('Error'))
    return data
}

export const getPostsById = async (userId) => {
    const {data} = await api.get(`posts/userposts/${userId}`).catch(e => console.log('Error'))
    return data
}

export const updateUser = async(info, _id) => {
    const {data} = await api.put('users/' + _id, info).catch(e => console.log('Error'))
    return data
}

export const getAvatar = async () => {
    const {data} = await api.get('users/image/avatar').catch(e => console.log('Error'))
    return data
}

export const suggistion = async () => {
    const {data} = await api.get('/users?select=username%20profilePicture').catch(e => console.log('Error'))
    return data
}

export const getUserById = async(_id, query) => {
    const {data} = await api.get('/users/' + _id + query).catch(e => console.log('Error'))
    return data
}

export const getFollow = async (_id) => {
    const {data} = await api.patch('/users/addfriend/' + _id).catch(e => console.log('Error'))
    return data
}

export const getUnFollow = async (_id) => {
    const {data} = await api.patch('/users/removefriend/' + _id).catch(e => console.log('Error'))
    return data
}

export const addComment = async(postId, text) => {
    const {data} = await api.post('/posts/comment/' + postId, {text}).catch(e => console.log('Error'))
    return data
}

export const getComments = async(_id) => {
    const {data} = await api.get('/posts/all/comments/' + _id).catch(e => console.log('Error get post comments'))
    return data
}

export const deleteComment = async(commentId) => {
    const {data} = await api.delete('/posts/comment/' + commentId).catch(e => console.log('Error comment delete'))
    return data
}

export const editComment = async(commentId, text) => {
    const {data} = await api.put('/posts/comment/' + commentId, {text}).catch(e => console.log('Error adit comment'))
    return data
} 

export const getMessages = async(reciverId) => {
    const {data} = await api.get('/message/' + reciverId).catch(e => console.log('Error get messages'))
    return data
}

export const sendMessage = async(msg) => {
    const {data} = await api.post('/message/add', msg).catch(e => console.log('Error send message'))
    return data
}