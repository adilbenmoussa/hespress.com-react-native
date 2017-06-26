import React, { Component } from 'react';
import {
    StatusBar
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import ArticlesPage from './Pages/ArticlesPage';
import { colors } from './config/colors';
import configureLocale from './config/locale';
import LeftMenu from './components/LeftMenu';


// init the moment localization.
configureLocale();

const filters = require('./assets/data/filters.json');
const categories = require('./assets/data/categories.json');
const articles = require('./assets/data/articles.json').articles;


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            selectedCategory: filters[0],
            categories,
            filters,
            articles
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen })
    }

    onLeftMenuItemSelected(category) {
        this.setState({
            isOpen: false,
            selectedCategory: category
        });
    }

    render() {
        const { categories, selectedCategory, filters, articles} = this.state;
        const menu = <LeftMenu
            categories={categories}
            selectedCategory={selectedCategory}
            filters={filters}
            onLeftMenuItemSelected={this.onLeftMenuItemSelected.bind(this)} />;
        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <StatusBar
                    backgroundColor={colors.primary}
                    barStyle="light-content"
                    />
                <ArticlesPage
                    articles={articles}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    filters={filters}
                    toggleLeftMenu={() => this.toggle()}
                    />
            </SideMenu>
        );
    }
}

export default App;
