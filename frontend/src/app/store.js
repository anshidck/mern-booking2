import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import placeReducer from '../features/place/placeSlice';
import bookingReducer from '../features/booking/bookingSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    place: placeReducer,
    booking: bookingReducer
  },
});
