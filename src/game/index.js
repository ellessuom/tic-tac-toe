import React from 'react';
import Layout from './layout';
import Dashboard from './dashboard';
import Players from './players';

function Index() {
    return (
      <Layout>
        <Players />
        <Dashboard />
      </Layout>
    );
}


export default Index;
