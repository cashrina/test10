import {NewsMutation} from "../../../../types";
import React, {useState} from "react";
import {Grid, TextField} from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';

interface Props {
    onSubmit: (product: NewsMutation) => void;
    isLoading: boolean;
}

const NewsForm:React.FC<Props> = ({onSubmit, isLoading}) => {
    const [state, setState] = useState<NewsMutation>({
        title: '',
        description: '',
        image: null,
    });

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ ...state });
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
              <Grid item>
                <TextField
                    required
                    multiline
                    minRows={3}
                    label="Title"
                    id="title"
                    name="title"
                    value={state.title}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <TextField
                    required
                    label="Description"
                    id="description"
                    name="description"
                    value={state.description}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
            </Grid>
            <Grid item>
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    <span>Save</span>
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

export default NewsForm;