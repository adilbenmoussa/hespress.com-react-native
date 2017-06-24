import React, { Component } from 'react';
import {
    Text,
} from 'react-native';


class ArabicText extends Component {

    render(){
        const { textStyle } = this.props;
        return (
           <Text style={[{fontFamily: 'Al-Jazeera-Arabic'}, (textStyle && textStyle)]}>
            {this.props.children}
           </Text>
        );
    }
}

ArabicText.propTypes = {
    textStyle: Text.propTypes.style
}


export default ArabicText;
