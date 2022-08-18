import React from 'react';
import './App.css';
import { buildStoreItemData, StoreItemData, TOP_ALBUMS_URL } from './StoreItemData';
import useAxios from "axios-hooks";
import StoreItemGallery from './StoreItemGallery';
import invariant from 'invariant';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [{data: apiData, loading, error}] = useAxios(TOP_ALBUMS_URL);

  const items: StoreItemData[] | undefined = React.useMemo(
    // () => apiData ? buildStoreItemData(apiData) : undefined,
    () => {
      if (!apiData) {
        return undefined;
      }

      let items = buildStoreItemData(apiData);
      if (searchTerm) {
        const searchFields: Array<keyof StoreItemData> = [
          'artist', 'category', 'name'
        ]
        items = items.filter(item => {
          const valuesToSearch = searchFields.map(fieldName => {
            const value = item[fieldName]
            invariant(typeof value === 'string', 'Can only search on string fields');
            return value.toLowerCase().normalize();
          });
          return valuesToSearch.some(value => value.includes(searchTerm))
        })
      }

      return items;
    },
  [apiData, searchTerm]);

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    // XXX Describe the error condition
    return <>Error</>;
  }

  invariant(items !== undefined, "");
  return (
    <Box sx={{padding: 4}}>
      <Typography variant="h3" gutterBottom>Top 100 albums</Typography>
      <TextField 
        label="Search" 
        variant="outlined"
        onChange={(event) => setSearchTerm(event.target.value.toLowerCase().normalize())}
      />
      <StoreItemGallery items={items} />
    </Box>
  );
}

/*
Test cases

It renders loading, when no data is available
=============================================
* Using Axios, mock GET TOP_ALBUMS_URL to not return data
* Mount the `App` component
* Ensure that it is rendering "Loading"

It renders an error message
===========================
* Using Axios, mock GET TOP_ALBUMS_URL to return an error condition
* Mount the `App` component
* Ensure that it is rendering "Error"

It renders albums
=================
* Using Axios, mock GET TOP_ALBUMS_URL to return the mock data found
  in StoreItemData.mock.json
* Mount the `App` component
* Find all the StoreItem components
* expect the count from StoreItemData.mock.json to equal the count of StoreItem components
* for i in 0 to numItems:
  - Expect the ith StoreItem's name to equal the ith name from the mock JSON,
    verifying that the items are sorted by popularity.


It searches by name
====================
* Using Axios, mock GET TOP_ALBUMS_URL to return the mock data found
  in StoreItemData.mock.json
* Mount the `App` component
* Type "now" into the sarch box
* Find all the StoreItem components
* Expect there to be exactly 3:
  - NOW That's What I Call Country, Vol. 15
  - NOW That's What I Call Music! Vol. 83
  - If I Know Me

It searches by {category, artist}
==================================
* Like "It searches by name", but slightly different

Search is case insensitive
==========================
* Repeat "it searches by name" with search strings of "NOW", "Now", and "nOw"
* Note that the search data is already case-insensitive -- it finds "NOW" vs "know"

Search handles Unicocde edge cases
==================================
TBH, Unicode edge cases -- like the various ways to form diacritics -- are something I
need to look up whenever I work with them. I don't trust myself to remember all the
little details.

*/

