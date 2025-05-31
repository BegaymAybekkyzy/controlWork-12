import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchOneGroup } from "./groupsThunks";
import {Card, CardMedia, CardContent, Typography, Grid, Box} from "@mui/material";
import Loader from "../../components/UI/Loader/Loader";
import { BASE_URL } from "../../constants";
import {selectFetchLoadingGroup, selectGroupDetailedInfo} from "./groupsSlice.ts";

const GroupDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const group = useAppSelector(selectGroupDetailedInfo);
    const loading = useAppSelector(selectFetchLoadingGroup);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneGroup(id));
        }
    }, [dispatch, id]);

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

    if (!loading && group) {
        const imagePath = BASE_URL + "/" + group.image;

        content = (
            <Grid container direction="column" alignItems="center" sx={{ mt: 3 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    {group.name}
                </Typography>

                <Grid container spacing={4} justifyContent="center" alignItems="flex-start" sx={{ maxWidth: 900 }}>
                    <Grid size={12} marginBottom={7}>
                        <Box
                            component="img"
                            src={imagePath}
                            alt={group.name}
                            sx={{
                                width: "100%",
                                height: "auto",
                                maxHeight: 600,
                                objectFit: "cover",
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    </Grid>

                    <Grid size={12} marginBottom={7}>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Author: {group.author.displayName}
                        </Typography>
                        <Typography variant="body1">
                            {group.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Status: {group.isPublished ? "Published" : "Under consideration"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Members: {group.members}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    return (
        <>
            {content}
        </>
    );
};

export default GroupDetail;
