import axios from 'axios'

const API_URL = '/api/place/'

// Create new product
const createPlaces = async (placeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, placeData, config)
    return response.data
}

const fetchAll = async (token) => {
    const response = await axios.get(API_URL + 'fetch')
    return response.data
}

// Get product by ID
const getPlaceById = async (id) => {
    try {
        const response = await axios.get(API_URL + id);
        return response.data;
    } catch (error) {
        // Handle error here, e.g., throw an exception or return an error message
        throw error;
    }
};

const getPlaceByUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'user-places', config)
    return response.data
};

 
const fetchitem = async (search, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(`/api/place?search=${search}`, config)
    return response.data
}

const updatePlace = async (placeId, placeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + placeId, placeData, config)
    return response.data
}

// Delete user goal
const deletePlace = async (placeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + placeId, config)
    return response.data
}

const productService = {
    fetchitem,
    createPlaces,
    updatePlace,
    deletePlace,
    getPlaceById,
    fetchAll,
    getPlaceByUser
}

export default productService