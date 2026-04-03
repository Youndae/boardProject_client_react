import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postLogout } from '../../modules/member/services/memberService';
import { handleLocationPathToLogin } from "../utils/locationPathUtils";

import { logout } from '../../modules/member/memberSlice';

const Wrapper = styled.div`
    li{
        list-style: none;
        float: left;
        padding: 6px;
    }
`

function Navbar() {
    const isLoggedIn = useSelector((state) => state.member.loginStatus);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const dispatch = useDispatch();

    const logoutSubmit = async () => {
        try {
            await postLogout();
            dispatch(logout());
            navigate('/');
        }catch(err) {
            console.error('Failed Logout: ', err);
        }
    }

    const handleLoginBtn = () => {
        handleLocationPathToLogin(pathname, navigate);
    }

    function LoggedInState(props) {
        const { onClickLogin } = props;
        if(isLoggedIn){
            return (
                <ul>
                    <li>
                        <button className="user_status_btn" onClick={() => navigate('/member/profile')}>정보수정</button>
                    </li>
                    <li>
                        <button className="user_status_btn" onClick={logoutSubmit}>로그아웃</button>
                    </li>
                </ul>
            )
        }else {
            return (
                <ul>
                    <button className="user_status_btn" onClick={() => onClickLogin()}>로그인</button>
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
                                <Link to={'/image'} className={'nav-link'}>
                                    사진
                                    <span className="sr-only"></span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/'} className={"nav-link"}>
                                    게시판
                                </Link>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-md-0 login">
                            <LoggedInState onClickLogin={handleLoginBtn}/>
                        </div>
                    </div>
                </nav>
            </div>
        </Wrapper>
    )
}

export default Navbar;