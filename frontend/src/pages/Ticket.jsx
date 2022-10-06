import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {getTicket, closeTicket} from "../features/tickets/ticketSlice";
import {getNotes, createNote, reset as NoteReset} from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import {toast} from "react-toastify";
import Modal from "react-modal";
import {FaPlus} from "react-icons/fa";

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState('')

    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)

    const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const useParam = useParams()
    const {ticketId} = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))

    }, [isError, message, ticketId])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket has been closed successfully')
        navigate('/tickets')
    }

    const onNoteSubmit = (e) =>  {
        e.preventDefault()
        dispatch(createNote({noteText, ticketId}))
        closeModal()
    }

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    if (isLoading || notesIsLoading) {
        return <Spinner/>
    }
    if (isError) {
        return <h1>Something went wrong</h1>
    }

    return (
        <>
            <div className='ticket-page'>
                <header className='ticket-header'>
                    <BackButton url='/tickets'/>
                    <h2>
                        Ticket ID: {ticket._id}
                        <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                </span>
                    </h2>
                    <h3>
                        Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                    </h3>
                    <h3>
                        Product: {ticket.product}
                    </h3>
                    <hr/>
                    <div className='ticket-desc'>
                        <h3>Description of Issue</h3>
                        <p>{ticket.description}</p>
                    </div>
                </header>

                {ticket.status !== 'closed' && (
                    <button onClick={openModal} className='btn'><FaPlus/> Add Note</button>
                )}

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
                    <h2>Add Note</h2>
                    <button className="btn-close" onClick={closeModal}>x</button>
                    <form onSubmit={onNoteSubmit}>
                        <div className='form-group'>
                            <textarea name="noteText" id='noteText' className="form-control" placeholder="Note Text"
                                      value={noteText}
                                      onChange={(e) => setNoteText(e.target.value)}>
                            </textarea>
                        </div>
                        <div className='form-group'>
                            <button className='btn' type='submit'>
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>

                {notes.map((note) => (
                    <NoteItem key={note._id} note={note}/>
                ))}

                {ticket.status !== 'closed' &&
                    <button onClick={onTicketClose} className="btn btn-block btn-danger"> Close Ticket</button>}
            </div>
        </>
    )
}

export default Ticket;