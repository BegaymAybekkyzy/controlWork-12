import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../Users/usersSlice.ts";
import {selectFetchLoadingGroup, selectUserGroups} from "./groupsSlice.ts";
import {fetchUserGroups} from "./groupsThunks.ts";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import {Grid} from "@mui/material";
import GroupCard from "./components/GroupCard.tsx";
import { deleteGroup } from "./groupsThunks";

const UserGroups = () => {
    const dispatch = useAppDispatch();
    const user =  useAppSelector(selectUser);
    const groups = useAppSelector(selectUserGroups);
    const loading = useAppSelector(selectFetchLoadingGroup);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserGroups(user._id));
        }

    }, [dispatch]);

    const deleteOneGroup = async(groupId: string) => {
        const warning = confirm("Are you sure you want to delete this group?");
        if (warning && user) {
            await dispatch(deleteGroup(groupId)).unwrap();
            await dispatch(fetchUserGroups(user._id));
        }
    }

    let content: React.ReactNode = (
        <Typography variant={"h5"}>You haven't created any groups</Typography>
    );
    if (loading) {
        content = (
            <Typography
                component="div"
                sx={{ height: "80hv", display: "flex", justifyContent: "center" }}
            >
                <Loader />
            </Typography>
        );
    }

    if (groups.length > 0 && !loading) {
        content = (
            <Grid container spacing={2}>
                {groups.map((group) => (
                    <Grid key={group._id}>
                        <GroupCard group={group} isUser onDelete={deleteOneGroup} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <main>
            {content}
        </main>
    );
};

export default UserGroups;