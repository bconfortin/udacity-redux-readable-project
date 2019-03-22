import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleNewComment} from "../actions/comments";

class NewComment extends Component {
    state = {
        author: '',
        body: '',
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

        const { dispatch, parentId } = this.props
        const {
            author,
            body,
        } = this.state

        dispatch(handleNewComment({
            author,
            body,
            parentId
        })).then(() => {
            this.handleCleanUp()
            alert("Your new comment was created successfully.")
        })
    }

    handleCleanUp = () => {
        this.setState((currentState) => ({
            ...currentState,
            author: '',
            body: '',
            submitButton: true,
        }))
    }

    render () {
        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={this.handleSubmit} className="bg-fff padding-15">
                        <h3 className="font-700 font-1em">Join the discussion by writting a new comment</h3>
                        <div className="form-group">
                            <label className="font-0-9em font-300">Author name</label>
                            <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label className="font-0-9em font-300">Comment</label>
                            <textarea cols="30" rows="3" className="form-control" name="body" value={this.state.body} onChange={this.handleChange}/>
                        </div>
                        <button className="btn btn-primary text-uppercase font-700 btn-cyan btn-sm" type="submit" disabled={!this.state.submitButton}>Add comment</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect()(NewComment)
