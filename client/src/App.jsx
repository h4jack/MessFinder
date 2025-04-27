import { useState } from 'react'
import './index.css'
import { Navigation } from './components/ui/universal/header'
import { Footer } from './components/ui/universal/footer'
import { HomeSearch } from './components/ui/home/homeSearch'
import { Login } from './components/ui/login/login'
import { ForgetPassword } from './components/ui/login/login'

import { SearchResult } from './components/ui/rooms/result'

function App() {

  return (
    <>
      <Navigation />
      <HomeSearch />
      {/* <SearchResult /> */}
      {/* <Login /> */}
      {/* <ForgetPassword /> */}
      {/* <Register /> */}
      {/* <SubmitPG /> */}
      {/* <SearchResult /> */}
      <Footer />
    </>
  )
}

export default App
