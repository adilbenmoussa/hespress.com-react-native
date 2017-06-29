import React, { Component } from 'react';
import {
    StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import { head } from 'lodash';

import SideMenu from 'react-native-side-menu';
import ArticlesPage from './Pages/ArticlesPage';
import { colors } from './config/colors';
import configureLocale from './config/locale';
import LeftMenu from './components/LeftMenu';
import store from './store';
import { filters } from './config/data';


import { actionCreators as categoryActionCreators } from './reducers/categoryReducer';
import { actionCreators as articlesActionCreators } from './reducers/articlesReducer';

// init the moment localization.
configureLocale();


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

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen })
    }

    onLeftMenuItemSelected() {
        this.setState({
            isOpen: false,
        });
    }

    render() {
        const menu = <LeftMenu
            onLeftMenuItemSelected={this.onLeftMenuItemSelected.bind(this)} />;
        return (
            <Provider store={store}>
                <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <StatusBar
                    backgroundColor={colors.primary}
                    barStyle="light-content"
                    />
                <ArticlesPage
                    toggleLeftMenu={() => this.toggle()}
                    />
            </SideMenu>
            </Provider>
        );
    }
}

export default App;
