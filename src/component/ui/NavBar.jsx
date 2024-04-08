import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {memberAxios, axiosErrorHandling} from "../../modules/customAxios";

const Wrapper = styled.div`
    li {
        list-style: none;
        float: left;
        padding: 6px;
    }
`;


function NavBar () {
    const loginState = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = async () => {
        await memberAxios.get(`check-login`)
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
                axiosErrorHandling(err);
            })
    };

    const LogoutSubmit = (e) => {
        console.log('logout Submit');
        const body = {
            type: 'isLoggedOut',
        }

        dispatch(body);

        memberAxios.post(`logout`)
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                axiosErrorHandling(err);
            })

    }

    function LoggedInState(props) {

        const { onClickLogin } = props;
        if(loginState === 'loggedOut'){
            return (
                <ul>
                    <button className="user_status_btn" onClick={() => onClickLogin()}>로그인</button>
                </ul>
            )
        }else if(loginState === 'loggedIn') {
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