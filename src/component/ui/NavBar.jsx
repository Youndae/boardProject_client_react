import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {customAxios} from "../../modules/customAxios";

const Wrapper = styled.div`
    li {
        list-style: none;
        float: left;
        padding: 6px;
    }
`;

const member_default = process.env.REACT_APP_API_MEMBER;

function NavBar () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = async () => {
        await customAxios.get(`${member_default}check-login`)
            .then(res => {
                let dispatchType;
                const status = res.data.loginStatus;
                if(status == true)
                    dispatchType = 'isLoggedIn';
                else if(status == false)
                    dispatchType = 'isLoggedOut';

                const body = {
                    type: dispatchType,
                }

                dispatch(body);
            })
            .catch(err => {
                console.error('loginStatue error : ', err);
            })
    };

    const LogoutSubmit = (e) => {
        console.log('logout Submit');
        const body = {
            type: 'isLoggedOut',
        }

        dispatch(body);

        customAxios.post(`${member_default}logout`)
            .then(res => {
                // eslint-disable-next-line no-restricted-globals
                location.href = '/';
            })
            .catch(err => {
                console.error('logoutError : ', err);
            })

    }

    function LoggedInState(props) {
        const loginState = useSelector((state) => state);

        console.log('loginState : ', loginState);
        const { onClickLogin } = props;
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
                                <a className="nav-link" onClick={() => navigate("/image")}>
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