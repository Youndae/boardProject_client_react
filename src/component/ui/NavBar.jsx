import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {memberAxios, axiosErrorHandling, checkUserStatus} from "../../modules/customAxios";

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
        checkUserStatus()
            .then(res => {
                const status = res.data.loginStatus;
                let dispatchType;

                if(status)
                    dispatchType = 'isLoggedIn';
                else
                    dispatchType = 'isLoggedOut';

                const body = {
                    type: dispatchType,
                }

                dispatch(body);
            });
    }, []);

    const LogoutSubmit = () => {
        const body = {
            type: 'isLoggedOut',
        }

        dispatch(body);

        memberAxios.post(`logout`)
            .then(() => {
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
                                <Link to={'/image'} className="nav-link">
                                    사진
                                    <span className="sr-only"></span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">
                                    게시판
                                </Link>
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