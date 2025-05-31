import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    Box,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type {IGroupApi} from "../../../types";
import {BASE_URL} from "../../../constants.ts";

interface Props {
    open: boolean;
    onClose: () => void;
    group: IGroupApi,
}

const GroupModal: React.FC<Props> = ({ open, onClose, group }) => {
    const imagePath = BASE_URL + "/" + group.image;
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5">{group.name}</Typography>
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
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default GroupModal;
