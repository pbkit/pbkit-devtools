import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return <div>Data: ${(window as any).__temp}</div>;
};

export default Home;
