import Head from '../components/head'
import Image from 'next/image'
import Link from 'next/link'
import characterRandomColor from '../scripts/characterRandomColor'

import DogeCard from '../components/doge-card'
import DogeHead from '../components/doge-head'

const API_URL = process.env.WORDPRESS_API_URL

export default function Index({ data, title }) {
  return (
    <section className="doge-home_wrapper">
      <Head title="Home" />
      <div className="doge-home_sidebar">
        <DogeHead/>
        <div className="doge-home_title">
          <h1 className="text-04" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="text-02 doge-home_intro" dangerouslySetInnerHTML={{ __html: data.options.intro_copy }} />
        </div>
        <div className="doge-home_ui">
          <Link href={'/doge-history'}>
            <a className="lozenge-button doge-home_history-button">Doge History</a>
          </Link>
        </div>
      </div>
      <div className="doge-home_border" />
      <nav className="doge-home_nav-wrapper">
        {data.options.doge_list.map(
          (item) => (
            <DogeCard 
              key={item.image}
              doge={item}
            />
          )
        )}
      </nav>
    </section>
  )
};

export async function getStaticProps() {
  const res = await fetch(API_URL)
  const data = await res.json()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  const title = characterRandomColor('good doge', 'span', 'doge-title');
  return {
    props: { data, title },
  }
}
