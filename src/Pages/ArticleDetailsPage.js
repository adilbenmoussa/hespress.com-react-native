import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';


class ArticlesDetailsPage extends Component {

    render() {
        console.log('itemthis.props', this.props);
        return (
            <View style={{ flex: 1 }}>
                <Text>
                    {this.props.body}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedArticle: state.articles.selectedArticle,
        isPending: state.articles.isPending,
        error: state.articles.error
    };
}

const ConnectArticlesDetailsPage = connect(mapStateToProps)(ArticlesDetailsPage);
export default ConnectArticlesDetailsPage;