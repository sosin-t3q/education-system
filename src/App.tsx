import { Routes, Route } from 'react-router-dom'
import { Intro, Home, Detail, School } from '@/pages'
// import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/home" element={<Home />}></Route>
        {/* <Route element={<PrivateRoutes />}>
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Route> */}
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/school" element={<School />}></Route>
        <Route path="*" element={<div>404 페이지</div>}></Route>
      </Routes>
    </div>
  )
}

export default App
