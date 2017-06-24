export default () => {
    const moment = require('moment');
    const arabicLocale = require('moment/locale/ar');
    moment.locale('ar', arabicLocale);
};
