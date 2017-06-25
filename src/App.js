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

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            selectedCategory: null
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
        const menu = <LeftMenu  onLeftMenuItemSelected={this.onLeftMenuItemSelected} />;
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
                    toggleLeftMenu={() => this.toggle()}
                />
            </SideMenu>
        );
    }
}

export default App;
