// src/pages/CoolNotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';

const goHome = () => {
  window.location.href = "/overview";
}

const NotFound = () => {
  return (
    <main style={{
      display: 'flex', flexDirection: 'column', width: '1000px', alignItems: "center", justifyContent: "center"
    }}>
      <h1>404 - Not found</h1>
      <Button className='primary-btn' onClick={goHome}>Go home</Button>
    </main >
  );
};

export default NotFound;
