// Import
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' }
});

// Request interceptor for authentication
API.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config; 
    },
    (error) => {
        return Promise.reject(error)
    }
);

// Authentication service
export const authService = {

    // Registering user
    registerUser: async (userData) => {
        try {
            const res = await API.post('/user/register', userData)
            if(res.data.token) {
                localStorage.setItem('jwtToken', res.data.token),
                localStorage.setItem('user', JSON.stringify(res.data.user))
            }
            return res.data;
        } catch (error) {
            console.error('Error registering user:', error.response?.data || error.message);
            throw error;
        }
    },

    // Login user
    loginUser: async (userData) => {
        try {
            const res = await API.post('/user/login', userData);
            if(res.data.token) {
                localStorage.setItem('jwtToken', res.data.token),
                localStorage.setItem('user', JSON.stringify(res.data.user))
            }
            return res.data
        } catch (error) {
            console.error('Error login in user:', error.response?.data || error.message);
            throw error; 
        }
    },

    // Logout User
    logoutUser: () => {
        localStorage.removeItem('jwtToken'),
        localStorage.removeItem('user')
    }
}

export const categoryService = {
    
    // Create category
    createCategory: async(categoryData) => {
        try {
            const res = await API.post('/category', categoryData);
            return res.data;
        } catch (error) {
            console.error('Error creating category', error.response?.data || error.message);
            throw error;
        }
    },

    // Get all categories
    getCategories: async(page = 1, limit = 10) => {
        try {
            const url = `/category?page=${page}&limit=${limit}`
            const res = await API.get(url);
            return res.data
        } catch (error) {
           console.error('Error fetching categories:', error.response?.data || error.message);
           throw error; 
        }
    },

    // Get category by id
    getCategoryById: async(categoryId) => {
        try {
            const res = await API.get(`/category/${categoryId}`);
            return res.data;
        } catch (error) {
            console.error(`Error fetching category with id-${categoryId}`, error.response?.data || error.message);
            throw error;
        }
    },

    // Update by id
    updateCategory: async(categoryId, updatedCategory) => {
        try {
            const res = await API.put(`/category/${categoryId}`, updatedCategory);
            return res.data;
        } catch (error) {
           console.error(`Error updating category with id-${categoryId}`, error.response?.data || error.message);
           throw error; 
        }
    },

    // Delete category by id
    deleteCategory: async(categoryId) => {
        try {
            const res = await API.delete(`/category/${categoryId}`);
            return res.data;
        } catch (error) {
           console.error(`Error deleting category with id-${categoryId}`, error.response?.data || error.message);
           throw error; 
        }
    },
};

export const postService = {

    // Create blogPost
    createPost: async(postData) =>{
        try {
            const res = await API.post('/post', postData);
            return res.data
        } catch (error) {
            console.error('Error creating post:', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch all posts
    getAllPosts: async(page = 1, limit = 10, category = null) =>{
        try {
            let url = `/post?page=${page}&limit=${limit}`;
            if (category) {
                url += `&category=${category}`;
            }
            const res = await API.get(url);
            return res.data;
        } catch (error) {
            console.error('Error fetching posts', error.response?.data || error.message);
            throw error;
        }
    },

    // Fetch by id
    getPostById: async(postId) =>{
        try {
            const res = await API.get(`/post/${postId}`);
            return res.data
        } catch (error) {
            console.log(`Error fetching post with id-${postId}`, error.response?.data || error.message);
            throw error;
        }
    },

    // Update by id
    updatePost: async(postId, updatedData) =>{
        try {
            const res = await API.put(`/post/${postId}`, updatedData);
            return res.data
        } catch (error) {
            console.error(`Error updating blog post with id-${postId}`, error.response?.data || error.message);
            throw error;
        }
    },

    // Delete post by id
    deletePost: async(postId) =>{
        try {
            const res = await API.delete(`/post/${postId}`);
            return res.data
        } catch (error) {
            console.log(`Error deleting post with id-${postId}`, error.response?.data || error.message);
            throw error;
        }
    }
};

export default API;