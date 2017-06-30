import React, { Component } from 'react';
import {
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';

import SideMenu from 'react-native-side-menu';
import ArticlesPage from '../Pages/ArticlesPage';
import { colors } from '../config/colors';
import LeftMenu from '../components/LeftMenu';

class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
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

    onLeftMenuItemSelected() {
        this.setState({
            isOpen: false,
        });
    }

    render() {
        const menu = <LeftMenu
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
                    toggleLeftMenu={() => this.toggle()}
                    />
            </SideMenu>
        );
    }
}

export default connect(({routes}) => ({routes}))(MainPage);
