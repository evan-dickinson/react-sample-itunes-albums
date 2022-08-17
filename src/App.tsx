import React from 'react';
import './App.css';
import { StoreItemData } from './StoreItemData';
import StoreItemGallery from './StoreItemGallery';

const fakeData: StoreItemData[] = [
  {
    name: 'Drake Milligan - EP',
    artist:'Drake Milligan',
    category:'Country',
    imageUrl:'https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/33/70/b9/3370b93a-f5aa-83b3-cf7d-ae85c34b1d55/4050538682670.jpg/170x170bb.png' ,
    price: 6.45,
    id: "1",
  },
  {
    name:'Purple Hearts (Original Soundtrack)' ,
    artist:'Sofia Carson' ,
    category:'Soundtrack' ,
    imageUrl:'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/80/da/d9/80dad9a0-a6be-6f18-4a9d-ac7210c021b5/22UMGIM75208.rgb.jpg/170x170bb.png' ,
    price: 7.99,
    id: "2",
  }
]

function App() {
  return (
    <StoreItemGallery items={fakeData} />
  );
}

export default App;
