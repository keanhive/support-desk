import {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {FaUser} from "react-icons/fa";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {register, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const {name, email, password, password2} = formData;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        user,
        isLoading,
        isSuccess,
        message,
        isError,
    } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [isError, message, isSuccess, user, isLoading, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {name, email, password}
            dispatch(register(userData))
        }

    }

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className="heading">
                <h1><FaUser/> Register</h1>
                <p> Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control"
                               placeholder="Enter your Name"
                               value={name}
                               id='name'
                               name='name'
                               required
                               onChange={onChange}/>
                    </div>
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
                        <input type="password" className="form-control"
                               placeholder="Confirm your password"
                               value={password2}
                               id='password2'
                               name='password2'
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

export default Register;
