import Head from 'next/head';
import { useMemo, useState } from 'react';
import styles from '../styles/Home.module.css'

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export async function getServerSideProps() {
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

 
export default function Home({ pokemon }: { pokemon: Pokemon[] }) {

  const [filter, setFilter] = useState('')



  const fiteredPokemon = useMemo(
    () => pokemon.filter((p) => (
      p.name.toLowerCase().includes(filter.toLowerCase())
    )),
    [filter, pokemon]
  );




  return (
    <div className={styles.main}>
      <Head>
        <title>Pokemon</title>
        <meta name='description' content='next js typescript' />
        <link rel='icon'/>
      </Head>
      <div>
        <input
        type='text'
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
        className={styles.search}
        />
      </div>
      <div className={styles.container}>
        {fiteredPokemon.slice(0, 100).map(p => (
          <div key={p.id} className={styles.image}> 
            <img 
              alt={p.name}
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${p.image}`}
            />
            <h2>{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
