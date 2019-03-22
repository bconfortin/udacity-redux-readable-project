import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

class Categories extends Component {
    render() {
        const {categories} = this.props

        return (
            <Fragment>
                {
                    categories &&
                    categories.length > 0 &&
                    categories.map((category) => {
                        return <Link to={`/${category.name.toLowerCase()}`} key={category.name} className="btn btn-success btn-cyan btn-sm mright-5">{category.name}</Link>
                    })
                }
            </Fragment>
        )
    }
}

function mapStateToProps({categories}) {
    return categories
}

export default connect(mapStateToProps)(Categories)
