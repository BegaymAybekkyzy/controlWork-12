import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export const fetchAllGroups = createAsyncThunk(
    "groupsAdmin/fetchAll",
    async () => {
        const response = await axiosAPI.get("admin/groups");
        return response.data;
    }
);

export const togglePublishGroup = createAsyncThunk(
    "groupsAdmin/togglePublish",
    async (id: string) => {
        const response = await axiosAPI.patch(`/groups-admin/${id}`);
        return response.data;
    }
);

export const deleteGroupById = createAsyncThunk(
    "groupsAdmin/deleteGroup",
    async (id: string) => {
        await axiosAPI.delete(`/groups-admin/${id}`);
    }
);
