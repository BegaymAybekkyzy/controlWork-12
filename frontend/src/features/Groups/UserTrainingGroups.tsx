import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../Users/usersSlice.ts";
import {selectFetchLoadingGroup, selectUserTrainingGroups} from "./groupsSlice.ts";
import { fetchUserTrainingGroups} from "./groupsThunks.ts";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import {Grid} from "@mui/material";
import GroupCard from "./components/GroupCard.tsx";

const UserTrainingGroups = () => {
    const dispatch = useAppDispatch();
    const user =  useAppSelector(selectUser);
    const groups = useAppSelector(selectUserTrainingGroups);
    const loading = useAppSelector(selectFetchLoadingGroup);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserTrainingGroups(user._id));
        }

    }, [dispatch]);

    let content: React.ReactNode = (
        <Typography variant={"h5"}>You haven't joined any groups</Typography>
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
                        <GroupCard group={group}/>
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

export default UserTrainingGroups;