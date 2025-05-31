import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store";
import type {IDetailGroupApi, IGroupApi, IValidationError} from "../../types";
import {addNewGroup, deleteGroup, fetchAllGroups, fetchByUser, fetchOneGroup, fetchUserGroups} from "./groupsThunks";

interface GroupsState {
    allGroups: IGroupApi[];
    groupByUser: IGroupApi[];
    userGroups: IGroupApi[];
    groupDetailedInfo: IDetailGroupApi | null;
    fetchLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean;
    authorName: string;
    error: IValidationError | null,
}

export const initialState: GroupsState = {
    allGroups: [],
    groupByUser: [],
    fetchLoading: false,
    groupDetailedInfo: null,
    userGroups: [],
    createLoading: false,
    deleteLoading: false,
    authorName: '',
    error: null,
};

export const selectAuthorName = (state: RootState) => state.groups.authorName;
export const selectAllGroups = (state: RootState) => state.groups.allGroups;
export const selectGroupByUser = (state: RootState) => state.groups.groupByUser;
export const selectUserGroups = (state: RootState) => state.groups.userGroups;
export const selectGroupDetailedInfo = (state: RootState) => state.groups.groupDetailedInfo;
export const selectGroupCreateLoading = (state: RootState) => state.groups.createLoading;
export const selectGroupDeleteLoading = (state: RootState) => state.groups.deleteLoading;
export const selectFetchLoadingGroup = (state: RootState) => state.groups.fetchLoading;
export const selectErrorGroup = (state: RootState) => state.groups.error;

export const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        nameRetention: (state, action) => {
            state.authorName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllGroups.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllGroups.fulfilled, (state, {payload}) => {
                state.fetchLoading = false;
                state.allGroups = payload;
            })
            .addCase(fetchAllGroups.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchByUser.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchByUser.fulfilled, (state, {payload}) => {
                state.fetchLoading = false;
                state.groupByUser = payload;
            })
            .addCase(fetchByUser.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchUserGroups.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchUserGroups.fulfilled, (state, {payload}) => {
                state.fetchLoading = false;
                state.userGroups = payload;
            })
            .addCase(fetchUserGroups.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchOneGroup.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchOneGroup.fulfilled, (state, {payload}) => {
                state.fetchLoading = false;
                state.groupDetailedInfo = payload;
            })
            .addCase(fetchOneGroup.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(addNewGroup.pending, (state) => {
                state.createLoading = true;
                state.error = null;
            })
            .addCase(addNewGroup.fulfilled, (state) => {
                state.createLoading = false;
                state.error = null;
            })
            .addCase(addNewGroup.rejected, (state, {payload}) => {
                state.createLoading = false;
                state.error = payload || null;
            })

            .addCase(deleteGroup.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteGroup.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteGroup.rejected, (state) => {
                state.deleteLoading = false;
            })

    },
});

export const groupsReducer = groupsSlice.reducer;
export const { nameRetention } = groupsSlice.actions;
