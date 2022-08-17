import StoreItem, { Props as StoreItemProps } from "./StoreItem";
import Grid from '@mui/material/Unstable_Grid2';
import { StoreItemData } from "./StoreItemData";

interface Props {
    items: StoreItemData[];
}

export default function StoreItemGallery({items}: Props): JSX.Element {
    return (
        <Grid container spacing={2}>
            {items.map(item => 
            <Grid xs={6} key={item.id}>
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