import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect} from "react";
import {CircularProgress, Grid, Typography} from "@mui/material";
import {selectFetchOneNews, selectOneNews} from "../slices/newsSlice";
import CommentsForm from "../../comments/components/CommentsForm";
import {CommentsMutation} from "../../../../types";
import {selectPostComments} from "../../comments/slices/commentsSlice";
import {createComments, fetchOneComments} from "../../comments/slices/commentsThunk";
import {fetchOneNews} from "../slices/newsThunk";

const OneNews = () => {
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectOneNews);
    const isFetching = useAppSelector(selectFetchOneNews);
    const isCreating = useAppSelector(selectPostComments);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchOneNews(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(fetchOneComments(id));
    }, [dispatch, id]);

    const onFormSubmit = async (commentsMutation: CommentsMutation) => {
        await dispatch(createComments(commentsMutation));
        navigate('/');
    };

    return (
        <>
            <Grid container direction="column" spacing={2}>
                {isFetching && <Grid item><CircularProgress/></Grid>}
                {news && (
                    <>
                        <Grid item component={Typography} variant="h4">{news.title}</Grid>
                        <Grid item component={Typography} variant="h4">{news.description}</Grid>
                        <Grid item component={Typography} variant="h6">{news.date}</Grid>
                        <Grid item component={Typography} variant="body1">{news.image}</Grid>
                    </>
                )}
            </Grid>


                <CommentsForm onSubmit={onFormSubmit} isLoading={isCreating}/>

        </>

    );
};

export default OneNews;