import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket, reset} from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

function NewTicket() {
    const {user} = useSelector((state) => state.auth)
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.tickets)

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if(isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    }, [dispatch, isLoading, isError, isSuccess, navigate, message]);
    
    if (isLoading) {
        return <Spinner/>
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({product, description}))
    }

    return (
        <>
            <BackButton url='/' />
            <section className="heading">
                <h1>Create New ticket</h1>
                <p> Please fill out the below</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name"> Customer Name</label>
                    <input type="text" className="form-control" id="name" value={name} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="name"> Customer Email</label>
                    <input type="text" className="form-control" id="name" value={email} disabled/>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product"> Product</label>
                        <select className="form-control" name="product" id="product" value={product}
                                onChange={(e) => setProduct(e.target.value)}>
                            <option value="IPhone"> IPhone</option>
                            <option value="IPad"> IPad</option>
                            <option value="Macbook Pro"> Mac Book pro</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description"> Description of the issue</label>
                        <textarea className="form-control" id="description" value={description}
                                  placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default NewTicket;