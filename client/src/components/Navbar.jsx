import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        navigate.push("/");
    };

    return (
        <nav className='navbar navbar-expand-lg bg-light'>
            <div className='container-fluid'>
                <NavLink to='/create' className='navbar-brand'>
                    Создать
                </NavLink>

                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink to='/create' className='nav-link active'>
                                Создать
                            </NavLink>
                        </li>

                        <li className='nav-item'>
                            <a
                                href='/'
                                className='nav-link active'
                                onClick={logoutHandler}>
                                Выйти
                            </a>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/links' className='nav-link active'>
                                Создать
                            </NavLink>
                        </li>

                        <NavLink
                            to='/autorithation'
                            className='nav-link active'>
                            Войти
                        </NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
