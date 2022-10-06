const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')

const getNotes = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User Not Authorized')
    }

    const notes = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})

const addNote = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User Not Authorized')
    }

    const notes = await Note.create({
        text: req.body.text,
        isStaff: false,
        user: req.user.id,
        ticket: req.params.ticketId
    })

    res.status(200).json(notes)
})

module.exports = {
    getNotes,
    addNote,
}
