import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import {backgroundImage} from './assets';
import { logo } from './assets';
import { Home, CreatePost } from './page';

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-gradient-to-b from-cream via-cream to-cream sm:px-8 px-4 py-4 border-b border-gray-300">
  <NavLink to="/" activeClassName="font-bold" className="flex items-center">
    <img src={logo} alt="logo" className="w-50 h-20 object-contain" />
  </NavLink>

  <NavLink to="/create-post" className="font-inter font-medium bg-red-200 text-yellow-700 px-16 py-3 rounded-lg hover:bg-purple-800 hover:text-white text-lg" activeClassName="bg-purple-800 text-white">
    Design
  </NavLink>
</header>

    <main
      className="text-white sm:p-8 px-4 py-8 w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 73px)', // Set the desired minimum height of the main section
      }}
    >

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
