import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/api",
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
    const {data} = await api.post('/posts', postData).catch(e => console.log('Error'))
    return data
}

export const updatePost = async (postData, _id) => {
    const {data} = await api.put('/posts/' + _id, postData).catch(e => console.log('Error'))
    return data
}

export const likePost = async (postId, userId) => {
    const {data} = await api.patch('/posts/like' + postId, {userId}).catch(e => console.log('Error'))
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

export const getAllPosts = async (userId) => {
    const {data} = await api.get(`posts/allposts/${userId}`).catch(e => console.log('Error'))
    return data
}

export const getPostsById = async (userId) => {
    const {data} = await api.get(`posts/userposts/${userId}`).catch(e => console.log('Error'))
    return data
}

export const updateUser = async(info, _id) => {
    const {data} = await api.put('users/' + _id, info)
    return data
}

