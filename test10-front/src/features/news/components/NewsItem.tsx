import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled} from "@mui/material";
import imageNotFound from '../../../assets/images/image-not-found.jpeg';
import React from "react";
import {API_URL} from "../../../constants";
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ImageCardMedia = styled(CardMedia)({
    height: 0, paddingTop: '56,25%'
});

interface Props {
    id: number;
    description: string;
    image: string | null;
    date: string;
}

const NewsItem: React.FC<Props> = ({id, description, image, date}) => {
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }
    return (
        <Grid item sx={{width: '300px'}}>
            <Card sx={{height: '100%'}}>
                <CardHeader description={description}/>
                <ImageCardMedia image={cardImage}></ImageCardMedia>
                <CardContent>
                    Date: {date}
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={`/news/${id}`}>
                        <ArrowForwardIcon/>
                        Read full post
                    </IconButton>
                </CardActions>

                <CardActions>
                    <IconButton component={Link} to={`/news/delete`}>
                        Delete
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default NewsItem;