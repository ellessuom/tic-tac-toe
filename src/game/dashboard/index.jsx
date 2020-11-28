import React from 'react';

import Status from './components/status';
import Matrix from './components/matrix';
import Footer from './components/footer';

import './styles.css';
export default function Dashboard () {
  return (
    <div className="container">
      <Status />
      <Matrix />
      <Footer />
    </div>
  );
}
