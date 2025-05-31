import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import type {IDetailGroupApi, IGroupApi, IGroupForm, IValidationError} from "../../types";
import {isAxiosError} from "axios";

export const fetchAllGroups = createAsyncThunk<IGroupApi[], void>(
    "groups/fetchAllGroups",
    async () => {
        const response = await axiosAPI("groups");
        return response.data;
    }
);

export const fetchByUser = createAsyncThunk<IGroupApi[], string>(
    "groups/fetchByUser",
    async (id) => {
        console.log(id)
        const response = await axiosAPI(`groups?author=${id}`);
        return response.data;
    }
);

export const fetchUserGroups = createAsyncThunk<IGroupApi[], string>(
    "groups/fetchUserGroups",
    async (idUser) => {
        const response = await axiosAPI(`groups/user/${idUser}`);
        return response.data;
    }
);

export const fetchUserTrainingGroups = createAsyncThunk<IGroupApi[], string>(
    "groups/fetchUserTrainingGroups",
    async (idUser) => {
        const response = await axiosAPI(`groups/user/${idUser}`);
        return response.data;
    }
);

export const fetchOneGroup = createAsyncThunk<IDetailGroupApi, string>(
    "groups/fetchOneGroup",
    async (id) => {
        const response = await axiosAPI(`groups/${id}`);
        return response.data;
    }
);

export const addNewGroup = createAsyncThunk<
    void,
    IGroupForm,
    { rejectValue: IValidationError }
>(
    "groups/addNewGroup",
    async (newGroup, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(newGroup) as (keyof IGroupForm)[];

            keys.forEach((key) => {
                const value = newGroup[key] as string;
                if (value !== null) {
                    formData.append(key, value);
                }
            });

            await axiosAPI.post('groups', formData);
        }catch (error) {
            if (
                isAxiosError(error) &&
                error.response &&
                error.response.status === 400
            ) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);

export const deleteGroup = createAsyncThunk<void, string>(
    "groups/deleteGroup",
    async (id) => {
        await axiosAPI.delete(`groups/${id}`);
    }
)