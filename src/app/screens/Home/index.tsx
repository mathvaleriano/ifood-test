import React from 'react'
import Layout from 'config/themes/Layout'
import Filters from 'app/components/Filters'
import Playlists from 'app/components/Playlists'

const Home = () => (
  <Layout>
    <>
      <Filters />
      <Playlists />
    </>
  </Layout>
)

export default Home