import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'


class Timmer extends Component {
    constructor(props) {
        super(props)
        this.state = { count: 3, interVal: '', checkRedi: false }
        this.timmer = this.timmer.bind(this)
    }
    componentDidMount() {
        let self = this
        let interVal = setInterval(() => self.timmer(), 1000)
        this.setState({ interVal })
    }
    timmer() {
        // console.log(this.state.count)
        if (this.state.count !== 0) {
            let countNews = this.state.count
            countNews--
            this.setState({ count: countNews })
        } else {
            clearInterval(this.state.interVal)
            this.setState({ checkRedi: true })
        }
    }
    render() {
        if (this.state.checkRedi) {
            return <Redirect to={this.props.pathDirect} />
        }
        return (
            <Fragment>
                <span style={{color: this.props.colorMan}}>{this.state.count}</span>
            </Fragment>
        )
    }
}


export default Timmer