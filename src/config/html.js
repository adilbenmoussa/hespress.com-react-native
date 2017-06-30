import React from 'react';
import entities from 'entities';
import htmlparser from 'htmlparser2-without-node-native';
import ArabicText from '../components/ArabicText';


export const decodeHtml = (text) => entities.decode(text);
export const imageUriByName = (image) => `http://s1.hespress.com/files/${image}`;

export const htmlToElements = (html, callBack) => {

    function domToElements(dom) {
        console.log('dom', dom);
        if (!dom) return null;

        return dom.map(function (node) {
            if (node.type === 'text') {
                return (
                    <ArabicText
                        textStyle={{ textAlign: 'right' }}>
                        {decodeHtml(node.data)}
                    </ArabicText>
                );
            }

            if(node.type === 'tag'){
                return domToElements(node.children);
            }

            // if(node.name === 'iframe'){
            //     return <Video ></Video>
            // }

            return (<ArabicText>{`${node.type}_${node.name}`}</ArabicText>)
        })
    }

    const handler = new htmlparser.DomHandler(function (error, dom) {
        if (error) callBack(error)
        callBack(null, domToElements(dom))
    })

    const parser = new htmlparser.Parser(handler);
    parser.write(html);
    parser.done();
}