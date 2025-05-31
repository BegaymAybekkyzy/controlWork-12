import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    Box,
    IconButton, Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type {IGroupApi, IUser} from "../../../types";
import {BASE_URL} from "../../../constants.ts";
import {useAppDispatch} from "../../../app/hooks.ts";
import {groupJoining} from "../groupsThunks.ts";

interface Props {
    open: boolean;
    onClose: () => void;
    group: IGroupApi,
    user?: IUser | null;
}

const GroupModal: React.FC<Props> = ({ open, onClose, group, user }) => {
    const imagePath = BASE_URL + "/" + group.image;
    const dispatch = useAppDispatch()

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" component="span">{group.name}</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={4}>
                    <Grid size={12} marginBottom={7}>
                        <Box
                            component="img"
                            src={imagePath}
                            alt={group.name}
                            sx={{
                                width: "100%",
                                height: "auto",
                                maxHeight: 500,
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
                    </Grid>
                    {
                        user &&
                        <Grid size={12} marginBottom={7}>
                            <Button onClick={() => dispatch(groupJoining(group._id))}>Join</Button>
                        </Grid>
                    }

                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default GroupModal;
