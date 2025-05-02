import {Card, CardContent, Typography} from "@mui/material";

interface Props {
    author: string;
    text: string;
}

const FormItem: React.FC<Props> = ({author, text}) => {

    return (
        <Card variant="outlined" sx={{ maxWidth: 600, mb: 2 }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body1">
                    <strong>{author}</strong>: {text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FormItem;