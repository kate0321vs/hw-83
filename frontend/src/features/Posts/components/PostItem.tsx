import {Card, CardMedia, Box, Typography, Button} from "@mui/material";
import {NavLink} from "react-router-dom";
import dayjs from "dayjs";
import { baseURL } from "../../../globalConstants";
import imageNotAvailable from "../../../assets/images/imageNotAvailable.jpg"

interface Props {
    image: string | null;
    title: string;
    date: string;
    id: string;
    user: string;
}

const PostItem: React.FC<Props> = ({image, title, date, id, user }) => {

    let postImage = imageNotAvailable;

    if (image) {
        postImage = baseURL + '/' + image;
    }

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', mb: 3, borderRadius: '10px' }}>
            {postImage && (
                <CardMedia
                    sx={{ width: 200, height: 200, mr: 2, borderRadius: '10px 0 0',  objectFit: 'cover', }}
                    image={postImage}
                />
            )}
            <Box sx={{ flex: 1 }}>
                <Typography sx={{mb: '15px'}} variant="body2" color="text.secondary">
                    At {dayjs(date).format('DD.MM.YYYY HH:mm')} by {user}
                </Typography>
                <Typography variant="h5" fontWeight={500}>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button variant="text" size="small" component={NavLink} to={`posts/${id}`}>
                        Read Full Post
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default PostItem;