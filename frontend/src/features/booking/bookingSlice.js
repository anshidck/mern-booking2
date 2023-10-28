import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookingService from './bookingService'

const initialState = {
    bookings: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new product
export const createBooking = createAsyncThunk(
    'places/create',
    async (placeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await bookingService.createBooking(placeData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get product by ID
export const getBookingByUser = createAsyncThunk(
    'place/getByUser',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await bookingService.getBookingByUser(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBooking.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bookings.push(action.payload)
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBookingByUser.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(getBookingByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookings = action.payload;
            })
            .addCase(getBookingByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            
            
    }
})

export const { reset } = bookingSlice.actions
export default bookingSlice.reducer