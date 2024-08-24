import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import {fetchNews} from "../slices/newsThunk";
import NewsItem from "../components/NewsItem";
import {selectNews} from "../slices/newsSlice";

const News = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Products</Typography>
                </Grid>
                <Grid item>
                    <Button color="primary" component={Link} to="/news">
                        Add new post
                    </Button>
                </Grid>
            </Grid>
            <Grid item container spacing={1}>
                {news.map((one_news) => (
                    <NewsItem
                        key={one_news.id}
                        id={one_news.id}
                        description={one_news.description}
                        image={one_news.image}
                        date={one_news.date}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default News;