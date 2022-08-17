import React from 'react';

import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export interface Props {
    name: string;
    artist: string;
    category: string;
    imageUrl: string;
    // XXX This assumes USD; other currencies are out of scope for this demo
    price: number;
}

export default function StoreItem({ name, artist, category, imageUrl, price }: Props): JSX.Element {
    return (
    <Card sx={{display: "flex", justifyContent: "space-between"}}>
        <CardContent>
            <Box>
                <Typography gutterBottom variant="h6" component="div">
                  {name}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {artist} • {category}
                </Typography>

                <Button variant="contained">Buy for ${price}</Button>
            </Box>
        </CardContent>
        <CardMedia
            component="img"
            image={imageUrl}
            alt={name}
            sx={{height: 170, width: 170}}
        />
    </Card>        
    );
}