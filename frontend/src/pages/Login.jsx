import {useState, useEffect} from 'react'
import {FaSignInAlt} from "react-icons/fa";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {login, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        user,
        isLoading,
        isSuccess,
        isError,
        message,
    } = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData;

    if (isLoading) {
        <Spinner/>
    }

    const onChange = (e) => {
        setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [isError, message, isSuccess, user, isLoading, navigate, dispatch])

    const onSubmit = (e) =>{
        e.preventDefault();
        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    return (
        <>
            <section className="heading">
                <h1><FaSignInAlt/> Login</h1>
                <p> Please log in to get support</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control"
                               placeholder="Enter your email"
                               value={email}
                               id='email'
                               name='email'
                               required
                               onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"
                               placeholder="Enter your password"
                               value={password}
                               id='password'
                               name='password'
                               required
                               onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login;
