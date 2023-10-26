import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { EStateGeneric, ICategory, IEditUser, IOneUser, } from '@/shared/types'
import { postUserApi, putUserDataApi } from './usersApi';
import { processImage } from '@/shared/ultis';
import { getoneUserApi } from '../dashboard/users/usersApi';

export const postUser = createAsyncThunk(
  "users/postUser",
  async ({ name, email, password, photo }: { name: string, email: string, password: string, photo: File | null }, { rejectWithValue }) => {
    try {
      let responseImage
      if (photo) {
        responseImage = await processImage(photo);
      }
      const response = await postUserApi({ name, email, password, image: responseImage?.data });
      const statusCode = response.status;
      if (statusCode === 201) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const putUser = createAsyncThunk(
  "users/putUser",
  async ({ id, email, password, image, name }: { id: string, name: string, email: string, password: string, image: File | null }, { rejectWithValue }) => {
    try {
      let responseImage
      if (image) {
        responseImage = await processImage(image);
      }

      const response = await putUserDataApi({ id, name, email, password, image: responseImage?.data })
      const statusCode = response.status;
      if (statusCode === 201) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getoneUser = createAsyncThunk(
  "users/getoneUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getoneUserApi(id)
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);





interface IUsersState {
  userStatus: EStateGeneric,
  OneUser: IOneUser
  EditUser: IEditUser
}

const initialState: IUsersState = {
  userStatus: EStateGeneric.IDLE,
  EditUser: {} as IEditUser,
  OneUser: {} as IOneUser
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},


  extraReducers(builder) {

    builder.addCase(postUser.fulfilled, (state, action) => {
      state.userStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(postUser.pending, (state, action) => {
      state.userStatus = EStateGeneric.PENDING;
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.userStatus = EStateGeneric.FAILED;
    });


    builder.addCase(putUser.fulfilled, (state, action) => {
      state.EditUser = action.payload
      state.userStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(putUser.pending, (state, action) => {
      state.userStatus = EStateGeneric.PENDING;
    });
    builder.addCase(putUser.rejected, (state, action) => {
      state.userStatus = EStateGeneric.FAILED;
    });




    builder.addCase(getoneUser.fulfilled, (state, action) => {
      state.OneUser = action.payload
      state.userStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getoneUser.pending, (state, action) => {
      state.userStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getoneUser.rejected, (state, action) => {
      state.userStatus = EStateGeneric.FAILED;
    });

  },

})


// export const {  } = usersSlice.actions

export const UserEdit = (state: RootState) => state.users.EditUser;

export const getOneUser = (state: RootState) => state.users.OneUser


export default usersSlice.reducer