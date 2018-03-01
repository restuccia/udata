/**
 * Styles
 */
import 'less/admin.less';

// Catch all errors
import 'raven';

// ES6 environment
import '@babel/polyfill';

// DOM polyfills
import 'dom-polyfills';

import 'bootstrap';

import Vue from 'vue';
import router from 'admin.routes';

Vue.use(require('plugins/util'));
Vue.use(require('plugins/text'));
Vue.use(require('plugins/i18next'));
Vue.use(require('plugins/markdown'));
Vue.use(require('plugins/scroll-to'));
Vue.use(require('plugins/tooltips'));
Vue.use(require('plugins/outside'));

router.start(require('admin.vue'), '#app');
