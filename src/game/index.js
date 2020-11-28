import React from 'react';
import Layout from './layout';
import Dashboard from './dashboard';
import Players from './players';
import { Provider as DataProvider } from './context';

export default function Game () {
  return (
    <DataProvider>
      <Layout>
        <Players />
        <Dashboard />
      </Layout>
    </DataProvider>
  );
}
