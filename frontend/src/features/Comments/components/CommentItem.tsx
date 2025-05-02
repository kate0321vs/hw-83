import {Card, CardContent, Typography} from "@mui/material";
import dayjs from "dayjs";

interface Props {
    author: string;
    text: string;
    date: string;
}

const FormItem: React.FC<Props> = ({author, text, date}) => {

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body1" maxWidth='80%'>
                    <strong>{author}</strong>: {text}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    {dayjs(date).format('DD.MM.YYYY HH:mm')}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FormItem;