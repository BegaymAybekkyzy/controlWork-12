import React, { useState } from 'react';
import type {IGroupForm} from "../../../types";
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectErrorGroup, selectGroupCreateLoading} from "../groupsSlice.ts";
import {useNavigate} from 'react-router-dom';
import {addNewGroup, fetchAllGroups} from "../groupsThunks.ts";
import {Button, Grid, TextField } from '@mui/material';
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";

const GroupFrom = () => {
    const loading = useAppSelector(selectGroupCreateLoading);
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectErrorGroup);
    const navigate = useNavigate();

    const [form, setForm] = useState<IGroupForm>({
        name: "",
        image: null,
        description: "",
    });

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(addNewGroup(form)).unwrap();
        await dispatch(fetchAllGroups()).unwrap();
        navigate("/");
    };

    const fileInputChangeHandler = (
        eFile: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const {files} = eFile.target;

        if (files) {
            setForm((prev) => ({...prev, image: files[0]}));
        }
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const getErrors = (fieldName: string) => {
        try {
            if (error && "errors" in error) {
                return error.errors[fieldName].message;
            }
        } catch (e) {
            return undefined;
        }
    };

    return (
        <form onSubmit={onSubmitForm}>
            <Grid container spacing={2} marginBottom={3} justifyContent="center">
                <Grid size={9}>
                    <TextField
                        fullWidth
                        label="Name group"
                        name="name"
                        disabled={loading}
                        onChange={onChangeInput}
                        variant="outlined"
                        helperText={getErrors("name")}
                        error={Boolean(getErrors("name"))}
                    />
                </Grid>
                <Grid size={9}>
                    <TextField
                        fullWidth
                        label="Description"
                        disabled={loading}
                        name="description"
                        helperText={getErrors("description")}
                        error={Boolean(getErrors("description"))}
                        onChange={onChangeInput}
                        variant="outlined"
                    />
                </Grid>
                <Grid size={9}>
                    <FileInput
                        name="image"
                        label="Image"
                        onChange={fileInputChangeHandler}
                        errors={Boolean(getErrors("image"))}
                    />
                </Grid>

                <Grid size={9}>
                    <Button
                        variant="contained"
                        sx={{backgroundColor: "#483D8B"}}
                        type="submit"
                        disabled={loading}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default GroupFrom;