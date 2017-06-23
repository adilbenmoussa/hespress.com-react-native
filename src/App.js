import React, { Component } from 'react';
import {
    View
} from 'react-native';

import ArticlesPages from './Pages/ArticlesPage';

class App extends Component {

    render() {
        return (
            <View>
                <ArticlesPages />
            </View>
        );
    }
}

export default App;
