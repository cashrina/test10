import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchOneNews} from "../slices/newsThunk";
import {useEffect} from "react";
import {CircularProgress, Grid, Typography} from "@mui/material";
import {selectFetchOneNews, selectOneNews} from "../slices/newsSlice";

const OneNews = () => {
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectOneNews);
    const isFetching = useAppSelector(selectFetchOneNews);

    useEffect(() => {
        dispatch(fetchOneNews(id));
    }, [dispatch, id]);

    return (
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
    );
};

export default OneNews;