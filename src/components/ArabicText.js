import React, { Component, PropTypes } from 'react';
import {
    Text,
} from 'react-native';


class ArabicText extends Component {

    render(){
        const { textStyle, onPress, children } = this.props;
        return (
           <Text 
           onPress={onPress}
           style={[{fontFamily: 'Al-Jazeera-Arabic'}, (textStyle && textStyle)]}>
            {children}
           </Text>
        );
    }
}

ArabicText.propTypes = {
    textStyle: Text.propTypes.style,
    onPress: PropTypes.func
}


export default ArabicText;
