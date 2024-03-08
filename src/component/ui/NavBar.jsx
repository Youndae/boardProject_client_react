import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    li {
        list-style: none;
        float: left;
        padding: 6px;
    }
`;

function NavBar (props) {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <div className="container">
                <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" onClick={() => navigate("/image-board-list")}>
                                    사진
                                    <span class="sr-only"></span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate("/")}>
                                    게시판
                                </a>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-md-0 login">
                            <ul>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </Wrapper>
    );
}

export default NavBar;