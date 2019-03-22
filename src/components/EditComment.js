import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleEditCommentById} from "../actions/comments";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from "react-bootstrap/Dropdown";

class EditComment extends Component {
    state = {
        id: '',
        author: '',
        body: '',
        show: false,
        submitButton: true,
    }

    /**
     * Generic handleChange that works for every input and select
     * @param event Uses the event to extract the input value (what was typed/selected) and input name (e.g.: title)
     */
    handleChange = (event) => {
        const {value, name} = event.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.setState((currentState) => ({
            ...currentState,
            submitButton: false,
        }))

        const { dispatch } = this.props
        const {
            id,
            author,
            body
        } = this.state

        dispatch(handleEditCommentById({
            id,
            author,
            body
        })).then(() => {
            this.handleClose()
            alert("Your new post was edited successfully.")
        })
    }

    handleClose =() => {
        this.setState((currentState) => ({
            ...currentState,
            show: false
        }))
    }

    handleShow = (event) => {
        event.preventDefault()

        this.setState((currentState) => ({
            ...currentState,
            show: true
        }))
    }

    componentDidMount () {
        this.setState((prevState) => ({
            ...prevState,
            id: this.props.id,
            author: this.props.author,
            body: this.props.body,
            category: this.props.category
        }))
    }

    render() {
        return (
            <div>
                <Dropdown.Item onClick={(event) => this.handleShow(event)}>Edit Comment</Dropdown.Item>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit a post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Author</label>
                                <input type="text" className="form-control" name="author" value={this.state.author} onChange={(event) => this.handleChange(event)} required="required" />
                            </div>
                            <div className="form-group">
                                <label>Body</label>
                                <textarea cols="30" rows="10" className="form-control" name="body" value={this.state.body} onChange={(event) => this.handleChange(event)} required="required" />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-light btn-sm text-uppercase font-700" disabled={!this.state.submitButton} onClick={this.handleClose}>Cancel</button>
                                </div>
                                <div className="col text-right">
                                    <button className="btn btn-success btn-cyan btn-sm text-uppercase font-700" type="submit" disabled={!this.state.submitButton}>Save Comment</button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect()(EditComment)
