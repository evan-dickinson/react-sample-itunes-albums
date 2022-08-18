import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { StoreItemData } from './StoreItemData';

export interface Props {
    item: StoreItemData;
}

export default function StoreItem({item: { name, artist, category, imageUrl, price }}: Props): JSX.Element {
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

/*
Test cases

It renders props
================
* Render the StoreItem component with hard-coded props. For testing, let's use 
  the album Automatic for the People, by R.E.M.
* Find all the `Typography` components, get their text values, and ensure:
  * One of the text values equals "Automatic for the People"
  * One of the text values equals "R.E.M. • Alternative"
* Find an image tag, and verify that its `src` attribute has the expected URL
* Find the `Button` component, and verify that its text is "Buy for $5.99"

This is just a quick test that the props are plumbed through correctly. I like
to keep this kind of test pretty minimal: For example, I'm intentionally not
verifying that the ablum name is rendered in the H6 font. Unit tests aren't
a good place to validate component styling.

*/