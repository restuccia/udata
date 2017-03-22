/**
 * Display a SwaggerUI documentation
 */
import FrontMixin from 'front/mixin';

import 'less/apidoc.less';

import Vue from 'vue';

import $ from 'expose-loader?$!expose-loader?jQuery!jquery';
import commonmark from 'helpers/commonmark';
import hljs from 'hljs';
import log from 'logger';

// Required jQuery plugins
import 'jquery.browser';
import 'swaggerui/lib/jquery.slideto.min';
import 'swaggerui/lib/jquery.wiggle.min';
import 'script-loader!swaggerui/lib/jquery.ba-bbq.min';

// import 'expose-loader?Handlebars!handlebars';
import 'script-loader!swaggerui/lib/handlebars-4.0.5';
import 'script-loader!swaggerui/lib/lodash.min';
import 'script-loader!swaggerui/lib/backbone-min';
import 'script-loader!swaggerui/lib/jsoneditor.min';

import 'script-loader!swaggerui/swagger-ui.min';
SwaggerUi = window.SwaggerUi;

// Marked compatibility for SwaggerUI
window.marked = commonmark;
marked.setOptions = function() {};

// Fix legacy import from Swagger UI
window.hljs = hljs;


new Vue({
    mixins: [FrontMixin],
    ready() {
        hljs.initHighlightingOnLoad();

        const swaggerUi = new SwaggerUi({
            url: $('meta[name="swagger-specs"]').attr('content'),
            dom_id: 'swagger-ui-container',
            supportedSubmitMethods: ['get'],
            onComplete: function(swaggerApi, swaggerUi) {
                log.debug('Loaded SwaggerUI');
            },
            onFailure: function() {
                log.error('Unable to Load SwaggerUI');
            },
            docExpansion: 'none',
            jsonEditor: false,
            defaultModelRendering: 'model',
            validatorUrl: null,
            sorter: 'alpha'
        });

        swaggerUi.load();
    }
});
