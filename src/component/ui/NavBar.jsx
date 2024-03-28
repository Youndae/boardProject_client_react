import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
// import {useCookies} from "react-cookie";
import axios from "axios";

import store from '../../index';

const Wrapper = styled.div`
    li {
        list-style: none;
        float: left;
        padding: 6px;
    }
`;

function NavBar () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [cookies, setCookie, removeCookie] = useCookies(['Authorization', 'Authorization_ino', 'Authorization_refresh']);

    const loginState = useSelector((state) => state);
    console.log('loginState : ', loginState);

    const LogoutSubmit = (e) => {
        console.log('logout Submit');
        const body = {
            type: 'DELETE_USER',
            data: undefined,
        }
        dispatch(body);

        axios.post('http://localhost:9096/member/logout'
        , {}, {withCredentials: true})
            .then(res => {
                console.log('res.headers : ', res.headers["set-cookie"]);
                // eslint-disable-next-line no-restricted-globals
                location.href = '/';
            })
            .catch(err => {
                console.error('axios err : ', err);
            })

    }

    function LoggedInState(props) {
        // const { uid } = useSelector(state => state.user);
        // const uid2 = store.getState().user.user;

        const { onClickLogin } = props;

        // console.log('userId : ', uid2);

        /*if(uid2 === undefined){
            return (
                <ul>
                    <button className="user_status_btn" onClick={() => onClickLogin()}>로그인</button>
                </ul>
            )
        }else {
            return (
                <ul>
                    <button className="user_status_btn" onClick={LogoutSubmit}>로그아웃</button>
                </ul>
            )
        }*/
        if(loginState === false){
            return (
                <ul>
                    <button className="user_status_btn" onClick={() => onClickLogin()}>로그인</button>
                </ul>
            )
        }else {
            return (
                <ul>
                    <button className="user_status_btn" onClick={LogoutSubmit}>로그아웃</button>
                </ul>
            )
        }
    }

    return (
        <Wrapper>
            <div className="container">
                <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" onClick={() => navigate("/image-board-list")}>
                                    사진
                                    <span className="sr-only"></span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate("/")}>
                                    게시판
                                </a>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-md-0 login">
                            <LoggedInState
                                onClickLogin={() => {navigate('/login')}}
                            />
                        </div>
                    </div>
                </nav>
            </div>
        </Wrapper>
    );
}

export default NavBar;