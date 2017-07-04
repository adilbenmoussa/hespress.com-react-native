import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { colors } from '../config/colors';
import { imageUriByName, decodeHtml } from '../config/html';
import ArabicText from '../components/ArabicText';
import HtmlView from '../components/HtmlView';


class ArticlesDetailsPage extends Component {

    componentDidMount() {
        Actions.refresh({
            backTitle: this.props.selectedCategory.name
        });
    }

    render() {
        const { image, author, title, body } = this.props;
        return (
            <View style={styles.mainContainer}>
                <HeaderImageScrollView
                    maxHeight={180}
                    minHeight={0}
                    renderHeader={() => (
                        <Image
                            source={{ uri: imageUriByName(image) }}
                            style={styles.image}
                            />
                    )}
                    >
                    <TriggeringView 
                        style={styles.scrollViewContainer}>
                        <ArabicText textStyle={styles.title}>{decodeHtml(title)}</ArabicText>
                        <ArabicText textStyle={styles.author}>{decodeHtml(author)}</ArabicText>
                        <HtmlView html={body} />
                    </TriggeringView>
                </HeaderImageScrollView>
            </View>
        );
    }
}

ArticlesDetailsPage.propTypes = {
    selectedCategory: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        selectedArticle: state.articles.selectedArticle,
        isPending: state.articles.isPending,
        error: state.articles.error,
        selectedCategory: state.selectedCategory
    };
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 62
    },
    scrollViewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10
    },
    title: {
        fontSize: 16,
        color: colors.titleColor,
        paddingBottom: 10,
        textAlign: 'right'
    },
    author: {
        fontSize: 14,
        color: colors.autorColor,
        paddingBottom: 10,
        textAlign: 'right'
    },
    image: {
        height: 180,
        resizeMode: 'cover'
    }
});

const ConnectArticlesDetailsPage = connect(mapStateToProps)(ArticlesDetailsPage);
export default ConnectArticlesDetailsPage;