import React from 'react';
import ReactDOM from 'react-dom/client';
import Top100 from './screens/top-100/Top100';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* There's no routing in this simple demo. Instead, just load the "top 100 albums" screen */}
    <Top100 />
  </React.StrictMode>
);

