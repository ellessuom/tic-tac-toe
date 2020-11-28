import React from 'react';

import Status from './components/status';
import Matrix from './components/matrix';
import Footer from './components/footer';

export default function Dashboard () {
  return (
    <div>
      <Status />
      <Matrix />
      <Footer />
    </div>
  );
}
