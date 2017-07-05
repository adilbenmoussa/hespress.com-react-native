import {categories} from '../config/data';

export const colors = {
    primary: '#23438b',
    secondary: '#364654',
    selectedCategory: '#192636',
    titleColor: '#2196F3',
    autorColor: '#E91E63',

    white: '#ffffff',
    black: '#000000'
};

export const hexWithOpacity = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (opacity) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export const getColorById = (categoryId, currentCategory) => {
    let color;
    if (currentCategory && currentCategory.id < 0) {
        const category = categories.find((cat) => cat.id === categoryId);
        if (!category) {
            console.log('categoryId not found', categoryId);
        }
        color = category.color;
    }
    else {
        color = currentCategory.color;
    }

    return color;
}

