import {Card, CardActions, CardContent, CardHeader, Grid, IconButton} from "@mui/material";
import imageNotFound from '../../../assets/images/image-not-found.jpeg';
import React from "react";
import {API_URL} from "../../../constants";
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


interface Props {
    id: number;
    title: string;
    image: string | null;
    date: string;
}

const ImageCardMedia: React.FC<{ image: string }> = ({ image }) => (
    <img src={image} alt="News" style={{ width: '100%', height: 'auto' }} />
);

const NewsItem: React.FC<Props> = ({id, title, image, date}) => {

    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }
    return (
        <Grid item sx={{width: '300px'}}>
            <Card sx={{height: '100%'}}>
                <CardHeader
                    title={title}
                />
                <ImageCardMedia image={cardImage}></ImageCardMedia>
                <CardContent>
                    Date: {date}
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={`/news/${id}`}>
                        Read full post
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>

                <CardActions>
                    <IconButton component={Link} to={`/news/delete`}>
                        Delete
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default NewsItem;