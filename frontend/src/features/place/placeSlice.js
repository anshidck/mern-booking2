import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import placeService from './placeService'

const initialState = {
    places: [],
    item: [],
    items:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new product
export const createPlaces = createAsyncThunk(
    'places/create',
    async (placeData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await placeService.createPlaces(placeData, token)
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

export const fetchAll = createAsyncThunk(
    'place/getAll',
    async (_, thunkAPI) => {
        try {          
            return await placeService.fetchAll()
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

export const fetchItem = createAsyncThunk(
    'places/getAll',
    async ({ search }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await placeService.fetchitem(search, token)
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
export const getPlaceByUser = createAsyncThunk(
    'place/getByUser',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await placeService.getPlaceByUser(token);
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

export const getPlaceById = createAsyncThunk(
    'place/getById',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await placeService.getPlaceById(id, token);
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

export const searchPlaces = createAsyncThunk(
    'places/search',
    async ({ search }, thunkAPI) => {
        try {
            const response = await placeService.fetchitem({ search })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updatePlace = createAsyncThunk(
    'places/update',
    async ({ id, placeData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await placeService.updatePlace(id, placeData, token);
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


// Delete vehicle
export const deletePlace = createAsyncThunk(
    'places/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await placeService.deletePlace(id, token)
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

export const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPlaces.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPlaces.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.places.push(action.payload)
            })
            .addCase(createPlaces.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = action.payload
            })
            .addCase(fetchItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchAll.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.places = action.payload
            })
            .addCase(fetchAll.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPlaceById.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(getPlaceById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.item = action.payload;
            })
            .addCase(getPlaceById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(getPlaceByUser.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(getPlaceByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = action.payload;
            })
            .addCase(getPlaceByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(updatePlace.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePlace.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = state.places.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                );
            })
            .addCase(updatePlace.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePlace.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePlace.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = state.places.filter(
                    (product) => product._id !== action.payload.id
                )
            })
            .addCase(deletePlace.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = placeSlice.actions
export default placeSlice.reducer