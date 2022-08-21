import React from 'react';
import './App.css';
import { buildStoreItemData, StoreItemData, TOP_ALBUMS_URL } from './StoreItemData';
import useAxios from "axios-hooks";
import StoreItemGallery from './StoreItemGallery';
import invariant from 'invariant';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import lodash from "lodash";

// We have to flatten the key and direction into one enum, because the
// MenuItem component needs its value to be a primitive type. MenuItem
// won't accept an object like {key: 'rank', direction: 'ascending'}.
enum SortScheme {
  RankAscending,
  RankDescending,
  PriceAscending,
  PriceDescending,
}

function useFilteredItems(
  items: StoreItemData[] | undefined, 
  searchTerm: string,
): StoreItemData[] | undefined {
  return React.useMemo(() => {
    if (!items) {
      return undefined;
    }
    if (!searchTerm) {
      return items;
    }

    const searchFields: Array<keyof StoreItemData> = [
      'artist', 'category', 'name'
    ]
    const filteredItems = items.filter(item => {
      const valuesToSearch = searchFields.map(fieldName => {
        const value = item[fieldName];
        invariant(typeof value === 'string', 'Can only search on string fields');
        return value.toLowerCase().normalize();
      });
      return valuesToSearch.some(value => value.includes(searchTerm))
    });

    return filteredItems;
  }, [items, searchTerm]);
}

function useSortedItems(items: StoreItemData[] | undefined, sortScheme: SortScheme): StoreItemData[] | undefined {
  return React.useMemo(() => {
    if (!items) {
      return undefined;
    }

    let sortKey: keyof StoreItemData;
    switch (sortScheme) {
      case SortScheme.RankAscending:
      case SortScheme.RankDescending:
        sortKey = 'rank';
        break;
      case SortScheme.PriceAscending:
      case SortScheme.PriceDescending:
        sortKey = 'price';
        break;
    }

    let isDescending: boolean;
    switch (sortScheme) {
      case SortScheme.RankAscending:
      case SortScheme.PriceAscending:
        isDescending = false;
        break;
      case SortScheme.RankDescending:
      case SortScheme.PriceDescending:
        isDescending = true;
        break;
    }

    const sortedItems = lodash.sortBy(items, [sortKey]);
    if (isDescending) {
      sortedItems.reverse();
    }

    return sortedItems
  }, [items, sortScheme]);
}

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortScheme, setSortScheme] = React.useState(SortScheme.RankAscending);

  const [{data: apiData, loading, error}] = useAxios(TOP_ALBUMS_URL);

  const allItems = React.useMemo(() => {
    if (!apiData) {
      return undefined;
    } else {
      return buildStoreItemData(apiData);
    }
  }, [apiData]);
  const filteredItems = useFilteredItems(allItems, searchTerm);
  const filteredSortedItems = useSortedItems(filteredItems, sortScheme);

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    // XXX Describe the error condition
    return <>Error</>;
  }

  invariant(allItems !== undefined && filteredSortedItems !== undefined, "If `loading` and `error` are falsy, then `allItems` and `filteredSortedItems` must be defined");
  return (
    <Box sx={{padding: 4}}>
      <Typography variant="h3" gutterBottom>Top {allItems.length} albums</Typography>
      <TextField 
        label="Search" 
        variant="outlined"
        onChange={(event) => setSearchTerm(event.target.value.toLowerCase().normalize())}
      />

    <FormControl>
      <InputLabel id="select-sort-by-label">Sort by</InputLabel>
      <Select
        labelId="select-sort-by-label"
        id="select-sort-by"
        value={sortScheme}
        label="Sort by"
        onChange={event => {
          const newScheme = event.target.value;
          // TS thinks that newScheme has type SortScheme | string
          invariant(typeof newScheme !== 'string', "newScheme must be a SortScheme");
          setSortScheme(newScheme);
        }}
      >
        {/* NB - popularity sort is reversed: high popularity corresponds with a low number */}
        <MenuItem value={SortScheme.RankAscending}>Popularity, high to low</MenuItem>
        <MenuItem value={SortScheme.RankDescending}>Popularity, low to high</MenuItem>
        <MenuItem value={SortScheme.PriceAscending}>Price, low to high</MenuItem>
        <MenuItem value={SortScheme.PriceDescending}>Price, high to low</MenuItem>
      </Select>
    </FormControl>

      <StoreItemGallery items={filteredSortedItems} />
    </Box>
  );
}

/*
Integration test cases for App component

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
* for i of 0 to numItems:
  - Expect the ith StoreItem's name to equal the ith name from the mock JSON,
    verifying that the items are sorted by popularity.

It renders album count
======================
* For numItemsToRemove of [0, 1]:
  - Load the data from StoreItemData.mock.json, and remove the first numItemsToRemove items
  - Mock GET TOP_ALBUMS_URL using that data
  - Mount the `App` component
  - Expect there to be a Typography element with the text `Top ${count} albumns`

It doesn't change album count during search
===========================================  
* Using Axios, mock GET TOP_ALBUMS_URL to return the mock data found
  in StoreItemData.mock.json
* Mount the `App` component
* const originalCount = text of element matching /Top \d+ albums/
* Type "now" into the search box
* const updatedCount = text of element matching /Top \d+ albums/
* expect originalCount to equal updatedCount

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

It sorts by popularity
======================
* Using Axios, mock GET TOP_ALBUMS_URL to return the mock data found
  in StoreItemData.mock.json
* Mount the `App` component
* Find the "sort by" dropdown and change it to "Popularity, low to high"
* // In this integration test, spot check the first and last items.
  // Full sorting is handled in the unit tests
* Expect first album displayed to be the last album in the JSON
* Expect last album displayed to be the first album in the JSON
* // Change back
* Find the "sort by" dropdown and change it to "Popularity, high to low"
* Expect first album displayed to be the first album in the JSON
* Expect last album displayed to be the last album in the JSON

It sorts by price
=================
* Using Axios, mock GET TOP_ALBUMS_URL to return the mock data found
  in StoreItemData.mock.json
* Mount the `App` component
* Find the "sort by" dropdown and change it to "Price, low to high"
* With the first album:
  - Find the button
  - Expect its text to be "Buy for $5.99"
* With the last album:
  - Find the button
  - Expect its text to be "Buy for $11.99"
* Find the "sort by" dropdown and change it to "Price, high to low"
* Check the first and last albums again

It searches and filters
=======================
* * Using Axios, mock GET TOP_ALBUMS_URL to return the mock data found
  in StoreItemData.mock.json
* Mount the `App` component
* Find the "sort by" dropdown and change it to "Popularity, low to high"
* Search for "country"
* Expect the first album shown to be "Country Stuff The Album"
* Expect the last album shown to be "& - EP". Yes, that is really its name :-P

*/

/*
unit tests for useSortedItems

Scaffolding
===========
The idea here is to create a minimal component that uses the useSortedItems hook,
and makes it easier to verify the hook's output. Using the hook inside a component
gives a more realistic example of its use, as compared to doing all the shenannigans
required to call the hook directly in a unit test.

I didn't feel that this pattern was necessary for the useFilteredItems hook, because
when testing that hook you want to look at the album title, etc., and that's easy
enough to do with the main App component. But with filter, we're looking at props
that are harder to extract from App, so the scaffolding is worth it.

interface Props {
  items: items: StoreItemData[] | undefined;
  itemKey: keyof StoreItemData;
  sortScheme: SortScheme;
}

function SortedItems({items, itemKey, sortScheme}: Props): JSX.Element {
  const sortedItems = useSortedItems(items, sortScheme);
  if (!sortedItems) {
    return <>No data</>;
  }
  return (<ol>
    {sortedItems.map(item => <li>{item[itemKey]}</li>)};
  </ol>)
}

It returns no data if there is no input
=======================================
* // key and sortScheme don't matter
* mount <SortedItems items={undefined} itemKey={rank} sortScheme={SortScheme.RankAscending} />
* expect not to find an <ol> element
* expect to find a text element with "no data"

It sorts by rank ascending
==========================
* const items = StoreItemData.mock.json
* mount <SortedItems items={items} itemKey={rank} sortScheme={SortScheme.RankAscending} />
* let prevRank = -Infinity
* count all <li> elements; expect them to equal the count of items from the JSON
* for each <li> element:
  - const currRank = element's text, converted to number
  - expect currRank to be greater than prevRank
  - prevRank = currRank

It sorts by rank descending
===========================
Follow the pattern in "rank ascending"

It sorts by price {ascending, descending}
=========================================
Follow the pattern for rank. Except that multiple items can have the same price,
so when comparing currPrice and prevPrice use <= instead of <.

*/