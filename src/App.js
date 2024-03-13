import React from 'react';
import {
  BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import BoardPage from "./component/page/board/BoardPage";
import ImagePage from "./component/page/imageboard/ImagePage";
import NavBar from "./component/ui/NavBar";
import BoardDetailPage from "./component/page/board/BoardDetailPage";
import BoardWritePage from "./component/page/board/BoardWritePage";
import BoardUpdatePage from './component/page/board/BoardUpdatePage';
import BoardReplyPage from "./component/page/board/BoardReplyPage";
import ImageWritePage from "./component/page/imageboard/ImageWritePage";
import ImageUpdatePage from "./component/page/imageboard/ImageUpdatePage";
import ImageDetailPage from "./component/page/imageboard/ImageDetailPage";
function App() {
  return (
    <BrowserRouter>
        <NavBar />
      <Routes>
        <Route index element={<BoardPage />} />
          <Route path="image-board-list" element={<ImagePage />}/>
          <Route path="board/:boardNo" element={<BoardDetailPage />} />
          <Route path="board/insert" element={<BoardWritePage />} />
          <Route path="board/update/:boardNo" element={<BoardUpdatePage />} />
          <Route path="board/reply/:boardNo" element={<BoardReplyPage />} />
          <Route path="image/insert" element={<ImageWritePage />} />
          <Route path="image/update/:imageNo" element={<ImageUpdatePage />}/>
          <Route path="image/:imageNo" element={<ImageDetailPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
