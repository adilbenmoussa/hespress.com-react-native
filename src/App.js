import React, { Component } from 'react';
import {
    View,
    StatusBar
} from 'react-native';

import ArticlesPage from './Pages/ArticlesPage';
import { colors } from './config/colors';
import configureLocale from './config/locale';


// init the moment localization.
configureLocale();

class App extends Component {

    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor={colors.primary}
                    barStyle="light-content"
                    />
                <ArticlesPage />
            </View>
        );
    }
}

export default App;
