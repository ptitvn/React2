// import PostManager from "./components/bt1/PostManger"

import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom"
import PostManager from "./components/bt6/pages/PostManager"
import NotFound from "./components/bt6/pages/NotFound"

function App() {

  return (
    <>
     {/* <PostManager /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/list-post" />} />
          <Route path="/list-post" element={<PostManager />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;