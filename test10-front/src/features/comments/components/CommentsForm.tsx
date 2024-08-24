import React, {useState} from "react";
import {CommentsMutation} from "../../../../types";
import {Grid, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
    onSubmit: (product: CommentsMutation) => void;
    isLoading: boolean;
}

const CommentsForm:React.FC<Props> = ({onSubmit, isLoading}) => {

    const [state, setState] = useState<CommentsMutation>({
        news_id: 0,
        author: '',
        description: '',
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

    return (
        <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
            <Grid item>
                <TextField
                    required
                    multiline
                    minRows={3}
                    label="Author"
                    id="author"
                    name="author"
                    value={state.author}
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

export default CommentsForm;