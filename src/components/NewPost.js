import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {handleNewPost} from "../actions/posts";
import {upperCaseFirstLetter} from '../utils/api/helpers'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {handleGetCategories} from "../actions/categories";

class NewPost extends Component {
    state = {
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
            author,
            title,
            body,
            category,
        } = this.state

        dispatch(handleNewPost({
            author,
            title,
            body,
            category: category.toLowerCase(),
        })).then(() => {
            this.handleCleanUp()
            this.handleClose()
            alert("Your new post was created successfully.")
        })
    }

    handleCleanUp = () => {
        this.setState((currentState) => ({
            ...currentState,
            author: '',
            title: '',
            body: '',
            category: '',
            submitButton: true,
        }))
    }

    handleClose =() => {
        this.setState((currentState) => ({
            ...currentState,
            show: false
        }))
        this.handleCleanUp()
    }

    handleShow =() => {
        this.setState((currentState) => ({
            ...currentState,
            show: true
        }))
    }

    componentDidMount () {
        this.getCategories()
    }

    render() {
        const {categories} = this.props
        return (
            <Fragment>
                <Button variant="success" className="btn-cyan btn-sm" onClick={this.handleShow}>New Post</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} required="required" />
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.handleChange} required="required" />
                            </div>
                            <div className="form-group">
                                <label>Body</label>
                                <textarea cols="30" rows="10" className="form-control" name="body" value={this.state.body} onChange={this.handleChange} required="required" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" name="category" onChange={this.handleChange} value={this.state.category} required="required">
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
                                    <button className="btn btn-success btn-cyan btn-sm text-uppercase font-700" type="submit" disabled={!this.state.submitButton}>Create New Post</button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}

function mapStateToProps({categories}) {
    return categories
}

export default connect(mapStateToProps)(NewPost)
