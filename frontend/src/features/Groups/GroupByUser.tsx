import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import Typography from "@mui/material/Typography";
import Loader from "../../components/UI/Loader/Loader.tsx";
import { Grid } from "@mui/material";
import {selectAuthorName, selectFetchLoadingGroup, selectGroupByUser} from "./groupsSlice.ts";
import {fetchByUser} from "./groupsThunks.ts";
import GroupCard from "./components/GroupCard.tsx";
import { selectUser } from "../Users/usersSlice.ts";
import {useParams} from "react-router-dom";

const GroupsByUser = () => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const user =  useAppSelector(selectUser);
    const groups = useAppSelector(selectGroupByUser);
    const loading = useAppSelector(selectFetchLoadingGroup);
    const author = useAppSelector(selectAuthorName);

    useEffect(() => {
        if(userId) {
            dispatch(fetchByUser(userId));
        }

    }, [dispatch, userId]);

    let content: React.ReactNode = (
        <Typography variant={"h5"}>This user has no groups</Typography>
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
                        <GroupCard group={group} user={user}/>
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <main>
            <h1>{author}</h1>
            {content}
        </main>
    );
};

export default GroupsByUser;
