import React, {Component} from 'react'
import {connect} from 'react-redux'
import Post from "./Post";
import {handleGetPosts, handleGetPostsByCategory} from "../actions/posts";

class Posts extends Component {
    componentDidMount() {
        console.log(this.props)
        this.getPosts()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.getPosts()
        }
    }

    getPosts = () => {
        const {
            dispatch,
            match: {params: {category}}
        } = this.props

        if (category) {
            dispatch(handleGetPostsByCategory(category))
        } else {
            dispatch(handleGetPosts())
        }
    }

    render() {
        const {posts} = this.props

        return (
            <div className="row">
                {
                    posts &&
                    Object.keys(posts).map((id) => {
                        if (!posts[id].deleted) {
                            return (
                                <Post
                                    key={posts[id].id}
                                    id={posts[id].id}
                                    title={posts[id].title}
                                    author={posts[id].author}
                                    body={posts[id].body}
                                    category={posts[id].category}
                                    voteScore={posts[id].voteScore}
                                    deleted={posts[id].deleted}
                                    commentCount={posts[id].commentCount}
                                    timestamp={posts[id].timestamp}
                                />
                            )
                        }
                    })
                }
            </div>
        )
    }
}

function mapStateToProps({posts}) {
    return posts
}

export default connect(mapStateToProps)(Posts)
