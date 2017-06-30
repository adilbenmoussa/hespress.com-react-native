import React, { Component, PropTypes } from 'react';
import {
    View
} from 'react-native';
import { htmlToElements } from '../config/html'; 

class HtmlView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elements: null
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.startHtmlParse(this.props.html);
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    startHtmlParse(html) {
        if (!html) {
            this.setState({
                elements: null
            })
        }

        htmlToElements(html, (error, elements) => {
            if (error) console.log(error)

            if (this.mounted) {
                this.setState({
                    elements
                });
            }
        });
    }

    render() {
        if (this.state.elements) {
            return <View children={this.state.elements} />
        }
        return <View />
    }
}

HtmlView.propTypes = {
    html: PropTypes.string.isRequired
}

export default HtmlView;



