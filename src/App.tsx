import React from 'react';
import './App.css';
import { buildStoreItemData, StoreItemData, TOP_ALBUMS_URL } from './StoreItemData';
import useAxios from "axios-hooks";
import StoreItemGallery from './StoreItemGallery';
import invariant from 'invariant';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function App() {
  const [{data: apiData, loading, error}] = useAxios(TOP_ALBUMS_URL);

  const items: StoreItemData[] | undefined = React.useMemo(
    () => apiData ? buildStoreItemData(apiData) : undefined,
  [apiData]);

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

*/

