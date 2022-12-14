import Grid from '@mui/material/Unstable_Grid2';
import StoreItem from "../store-item/StoreItem";
import { StoreItemData } from "../store-item/StoreItemData";

interface Props {
    items: StoreItemData[];
}

// A responsive grid of items to display in a store
export default function StoreItemGallery({items}: Props): JSX.Element {
    return (
        <Grid container spacing={2}>
            {items.map(item => 
            <Grid xs={12} md={6} xl={4} key={item.id}>
                <StoreItem
                    item={item}
                />
            </Grid>                    
            )}
        </Grid>
    )
}

/*
Test cases

It renders albums
=================
1. Set up test data with two albums:
  a. Automatic for the People, by R.E.M.
  b. Lemonade, by Beyoncé

2. Render the StoreItemGallery
3. Find all the StoreItem components
4. Expect there to be 2 StoreItem components
5. The first StoreItem has its `item` prop set to Automatic for the People
6. The second StoreItem has its `item` prop set to Lemondade

*/