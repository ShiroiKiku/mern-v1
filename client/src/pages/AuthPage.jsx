import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const { loading, request, error } = useHttp();
    const [form, setForm] = useState({
        name: "",
        password: "",
    });

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {
                ...form,
            });
        } catch (e) {}
    };

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {
                ...form,
            });
            auth.login(data.token, data.user.id);
        } catch (e) {}
    };
    return (
        <div className='row justify-content-md-center'>
            <div className='col-6'>
                <h1>Авторизация</h1>
                <div className='form-group'>
                    <form>
                        <label htmlFor='name'>Введите логин</label>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            placeholder='Введите логин'
                            onChange={changeHandler}
                        />
                        <label htmlFor='password'>Введите пароль</label>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            placeholder='Введите пароль'
                            onChange={changeHandler}
                        />
                        <div>
                            <button
                                type='button'
                                className='btn btn-success'
                                disabled={loading}
                                onClick={loginHandler}>
                                Вход
                            </button>
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={registerHandler}
                                disabled={loading}>
                                Регистрация
                            </button>
                        </div>
                        <div>
                            <span>{error}</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
