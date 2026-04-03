import React, {useEffect} from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';

import BoardPage from './modules/board/pages/BoardPage';
import ImageBoardPage from './modules/image-board/pages/ImageBoardPage';
import Navbar from "./common/components/Navbar";
import BoardDetailPage from './modules/board/pages/BoardDetailPage';
import BoardWritePage from './modules/board/pages/BoardWritePage';
import BoardUpdatePage from './modules/board/pages/BoardUpdatePage';
import BoardReplyPage from './modules/board/pages/BoardReplyPage';
import ImageBoardWritePage from './modules/image-board/pages/ImageBoardWritePage';
import ImageBoardUpdatePage from "./modules/image-board/pages/ImageBoardUpdatePage";
import ImageBoardDetailPage from "./modules/image-board/pages/ImageBoardDetailPage";
import Join from './modules/member/pages/Join';
import Login from './modules/member/pages/Login';
import ErrorPage from "./modules/error/pages/ErrorPage";
import JoinOAuth from "./modules/member/pages/JoinOAuth";
import UpdateProfile from "./modules/member/pages/UpdateProfile";
import {useDispatch, useSelector} from "react-redux";

import { login, logout } from './modules/member/memberSlice';
import { checkStatus } from './modules/member/services/memberService';

const NotInitializedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

function App() {

  const dispatch = useDispatch();
  const isInitialized = useSelector(state => state.member.isInitialized);

  useEffect(() => {
    checkStatus()
        .then((res) => {
            const { userId, role } = res.data.content;
            dispatch(login({ userId, role }));
        })
        .catch((err) => {
          dispatch(logout());
        });
  }, [dispatch]);

  if(!isInitialized) {
    return (
        <NotInitializedDiv>
          <div className={"spinner-border text-primary"} role={"status"}>
            <span className="sr-only">Loading...</span>
          </div>
        </NotInitializedDiv>
    );
  }

  return (
      <>
        <Navbar />
        <Routes>
          {/* Main Page */}
          <Route index element={<BoardPage />} />

          {/* Board Domain */}
          <Route path={"board"}>
            <Route index element={<BoardPage />} />
            <Route path=":id" element={<BoardDetailPage />} />
            <Route path="insert" element={<BoardWritePage />} />
            <Route path="update/:id" element={<BoardUpdatePage />} />
            <Route path="reply/:id" element={<BoardReplyPage />} />
          </Route>

          {/* Image-Board Domain */}
          <Route path={"image"}>
            <Route index element={<ImageBoardPage/>}/>
            <Route path=":id" element={<ImageBoardDetailPage />}/>
            <Route path="insert" element={<ImageBoardWritePage />} />
            <Route path="update/:id" element={<ImageBoardUpdatePage />}/>
          </Route>

          {/* Member Domain */}
          <Route path={"join"}>
            <Route index element={<Join />} />
            <Route path="profile" element={<JoinOAuth />} />
          </Route>

          <Route path="login" element={<Login />} />

          <Route path={"member"}>
            <Route path="profile" element={<UpdateProfile />} />
          </Route>

          {/* Error */}
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </>
  );
}

export default App;
