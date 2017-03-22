/**
 * Generic site display page JS module
 */
import 'less/front/site.less';

import FrontMixin from 'front/mixin';

import log from 'logger';
import Vue from 'vue';

new Vue({
    mixins: [FrontMixin],
    mounted() {
        log.debug('Site page');
    }
});
