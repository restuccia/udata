/**
 * Topic display page JS module
 */
import 'less/front/topic.less';

import FrontMixin from 'front/mixin';
import FacetsMixin from 'front/mixins/facets';

import log from 'logger';
import Vue from 'vue';

new Vue({
    mixins: [FrontMixin, FacetsMixin],
    mounted() {
        log.debug('Topic display page');
    }
});
