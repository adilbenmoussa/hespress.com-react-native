import React, { Component } from 'react';
import {
} from 'react-native';
import { Provider } from 'react-redux';
import { head } from 'lodash';

import {
    Router,
    Scene,
    Actions,
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import configureLocale from './config/locale';
import store from './store';
import { filters } from './config/data';
import { colors } from './config/colors';
import MainPage from './Pages/MainPage';
import ArticleDetailsPage from './Pages/ArticleDetailsPage';
import SearchPage from './Pages/SearchPage';


import { actionCreators as categoryActionCreators } from './reducers/categoryReducer';
import { actionCreators as articlesActionCreators } from './reducers/articlesReducer';

// init the moment localization.
configureLocale();

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="MainPage" component={MainPage} hideNavBar={true} />
        <Scene 
            key="ArticleDetailsPage" 
            component={ArticleDetailsPage} 
            hideNavBar={false}
            backButtonTextStyle={{
                fontFamily: 'Al-Jazeera-Arabic',
                fontSize:14,
                color: colors.white
            }}
            leftButtonIconStyle={{
                tintColor:colors.white
            }}
            navigationBarStyle={{
                backgroundColor: colors.primary
            }}
            getTitle={() => ""}
             />
        <Scene 
            key="SearchPage" 
            component={SearchPage} 
            hideNavBar={false}
            backButtonTextStyle={{
                fontFamily: 'Al-Jazeera-Arabic',
                fontSize:14,
                color: colors.white
            }}
            leftButtonIconStyle={{
                tintColor:colors.white
            }}
            navigationBarStyle={{
                backgroundColor: colors.primary
            }}
            getTitle={() => ""}
             />
    </Scene>
);

// --- Create connected Router if you want dispatch() method.
// --- Or you can just use vanilla Router
const ConnectedRouter = connect()(Router);


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }

        const firstFilter = head(filters);
        store.dispatch(categoryActionCreators.select(firstFilter));
        store.dispatch(articlesActionCreators.getArticles(firstFilter));
    }

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter scenes={scenes} />
            </Provider>
        );
    }
}

export default App;
