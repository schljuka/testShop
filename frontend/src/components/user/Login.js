import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'


import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);




    useEffect(() => {

        console.log(isAuthenticated);
        if (isAuthenticated) {
            // const path = redirect.startsWith('/') ? redirect : `/${redirect}`;
            // navigate(path)
      

            toast.success('User Login successfull');
 
            navigate("/")

        }

        if (error) {
         
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, isAuthenticated, error, navigate])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Login"} />

                    <div className="container container-fluid">
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="shadow-lg" onSubmit={submitHandler}>
                                    <h1 className="mb-3">Login</h1>
                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password_field">Password</label>
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>


                                    <button
                                        id="lgn_btn"
                                        type="submit"
                                        className="btn">
                                        LOGIN
                                    </button>

                                    <Link to="/register" className="float-left mt-3">New User?</Link>
                                </form>
                            </div>

                        </div>
                    </div>

                </Fragment>
            )}

        </Fragment>

    );
}

export default Login;