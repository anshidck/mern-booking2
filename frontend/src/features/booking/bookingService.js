import axios from 'axios'

const API_URL = '/api/booking/'

// Create new product
const createBooking = async (placeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, placeData, config)
    return response.data
}


const getBookingByUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
};

 



const bookingService = {
    createBooking,
    getBookingByUser
}
export default bookingService