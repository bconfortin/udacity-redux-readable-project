import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleEditPostById} from "../actions/posts";
import {upperCaseFirstLetter} from '../utils/api/helpers'
import Modal from 'react-bootstrap/Modal'
import {handleGetCategories} from "../actions/categories";
import Dropdown from "react-bootstrap/Dropdown";

class EditPost extends Component {
    state = {
        id: '',
        title: '',
        author: '',
        body: '',
        category: '',
        show: false,
        submitButton: true,
    }

    getCategories = () => {
        const {dispatch} = this.props
        dispatch(handleGetCategories())
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
            title,
            body,
            category,
        } = this.state

        dispatch(handleEditPostById({
            id,
            author,
            title,
            body,
            category: category.toLowerCase(),
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
        this.getCategories()
        this.setState((prevState) => ({
            ...prevState,
            id: this.props.id,
            title: this.props.title,
            author: this.props.author,
            body: this.props.body,
            category: this.props.category
        }))
    }

    // Not necessary but good to know how to use
    // componentDidUpdate (prevProps) {
    //     if (this.props.title !== prevProps.title ||
    //         this.props.author !== prevProps.author ||
    //         this.props.body !== prevProps.body ||
    //         this.props.category !== prevProps.category) {
    //         console.log("componentDidUpdate()")
    //         this.setState((prevState) => ({
    //             ...prevState,
    //             title: this.props.title,
    //             author: this.props.author,
    //             body: this.props.body,
    //             category: this.props.category
    //         }))
    //     }
    // }

    render() {
        const {
            categories,
        } = this.props

        return (
            <div>
                <Dropdown.Item onClick={(event) => this.handleShow(event)}>Edit Post</Dropdown.Item>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit a post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" name="title" value={this.state.title} onChange={(event) => this.handleChange(event)} required="required" />
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <input type="text" className="form-control" name="author" value={this.state.author} onChange={(event) => this.handleChange(event)} required="required" />
                            </div>
                            <div className="form-group">
                                <label>Body</label>
                                <textarea cols="30" rows="10" className="form-control" name="body" value={this.state.body} onChange={(event) => this.handleChange(event)} required="required" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" name="category" onChange={(event) => this.handleChange(event)} value={this.state.category} required="required">
                                    <option value="" disabled>Select a category</option>
                                    {
                                        categories &&
                                        categories.map((category) => {
                                            return <option name={category.name} key={category.name}>{ upperCaseFirstLetter(category.name) }</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-light btn-sm text-uppercase font-700" disabled={!this.state.submitButton} onClick={this.handleClose}>Cancel</button>
                                </div>
                                <div className="col text-right">
                                    <button className="btn btn-success btn-cyan btn-sm text-uppercase font-700" type="submit" disabled={!this.state.submitButton}>Save Post</button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps({categories}) {
    return categories
}

export default connect(mapStateToProps)(EditPost)
