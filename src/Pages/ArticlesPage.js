import React, { Component } from 'react';
import {
    View,
    FlatList,
    Image,
    Text
} from 'react-native';
import { Badge } from 'react-native-elements';
import Header from '../components/Header';


class ArticlesPages extends Component {

    _keyExtractor = (item, index) => item.id;

    _renderItem({item}) {
        const imageUri = `http://s1.hespress.com/files/${item.image}`;
        console.log('imageUri', imageUri);
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: imageUri }}
                    >
                    <View style={styles.imageOverlay} />
                </Image>

                <View style={styles.textContainer}>
                    <Badge
                        containerStyle={styles.badge}>
                        <Text style={styles.badgeText}>{item.category_name}</Text>
                    </Badge>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </View>
        );
    }


    render() {
        const articles = require('../assets/data/articles.json').articles;
        return (
            <View>
                <Header />
                <FlatList
                    data={articles}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    />
            </View>
        );
    }
}

const styles = {
    container: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0, 0)',
        padding: 3
    },
    textContainer: {
        position: 'absolute',
        top: 20,
        bottom: 20,
        right: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    badge: {
        backgroundColor: 'rgba(205, 220, 57,0.6)',
        borderRadius: 4,
        height: 26
    },
    badgeText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    image: {
        height: 180
    },
    imageOverlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: 180
    }
};


export default ArticlesPages;
