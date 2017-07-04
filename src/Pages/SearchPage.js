import React, { Component } from 'react';
import {
    View,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as articlesActionCreators } from '../reducers/articlesReducer'; 

class SearchPage extends Component {
    
    _search(searchText) {
        const {searchArticles} = this.props;
        searchArticles(searchText);
    }

    render (){
        
        return (
            <View style={{backgroundColor: 'green', paddingTop: 200}}>
                <TextInput
                    style={{backgroundColor: 'red', width: 260, height:40}}
                    onChangeText={this._search.bind(this)}
                 />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles.articles
    };
}

const mapDispatchToPros = (dispatch) => ({
    ...bindActionCreators({
        ...articlesActionCreators
    }, dispatch)
});

const connectedSearchPage = connect(mapStateToProps, mapDispatchToPros)(SearchPage);

export default connectedSearchPage;


