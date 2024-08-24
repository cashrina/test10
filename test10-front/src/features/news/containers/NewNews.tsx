import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {selectPostNews} from "../slices/newsSlice";
import {NewsMutation} from "../../../../types";
import NewsForm from "../components/NewsForm";
import {createNews} from "../slices/newsThunk";

const NewNews = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectPostNews);

    const onFormSubmit = async (newsMutation: NewsMutation) => {
        await dispatch(createNews(newsMutation));
        navigate('/news');
    };

    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                New News
            </Typography>
            <NewsForm onSubmit={onFormSubmit} isLoading={isCreating} />
        </>
    );
};

export default NewNews;