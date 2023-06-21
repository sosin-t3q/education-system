import { Routes, Route } from 'react-router-dom'
import { Intro, Home, Detail, School } from '@/pages'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/school" element={<School />}></Route>
        <Route path="*" element={<div>404 페이지</div>}></Route>
      </Routes>
    </div>
  )
}

export default App
