import Vue from 'vue';
import VueRouter from 'vue-router';
import config from 'config';

Vue.use(VueRouter);


const routes = [
    {path: '/', component: () => import('./views/home.vue')},
    {path: '/me/', name: 'me', component: () => import('./views/me.vue')},
    {path: '/me/edit/', name: 'me-edit', component: () => import('./views/me-edit.vue')},
    {path: '/site/', name: 'site', component: () => import('./views/site.vue')},
    {path: '/dataset/new/', component: () => import('./views/dataset-wizard.vue')},
    {path: '/dataset/new/:oid/', component: () => import('./views/dataset-wizard.vue'),
        callback(view) {
            if (!view.dataset.id) {
                view.dataset.fetch(oid);
            }
        }
    },
    {path: '/dataset/new/:oid/share', component: () => import('./views/dataset-wizard.vue'),
        callback(view) {
            if (!view.dataset.id) {
                view.dataset.fetch(oid);
            }
        }
    },
    {path: '/dataset/:oid/', name: 'dataset', component: () => import('./views/dataset.vue'), children: [
        {path: 'issue/:issue_id/', name: 'dataset-issue', component: () => import('./components/issues/modal.vue')},
        {path: 'discussion/:discussion_id/', name: 'dataset-discussion', component: () => import('./components/discussions/modal.vue')},
        {path: 'community-resource/:rid/', name: 'dataset-community-resource', component: () => import('./components/dataset/resource/modal.vue')},
        {path: '/resource/:rid/', name: 'dataset-resource', component: () => import('./components/dataset/resource/modal.vue')},
    ]},
    {path: '/dataset/:oid/edit/', name: 'dataset-edit', component: () => import('./views/dataset-edit.vue')},
    {path: '/community-resource/new/', component: () => import('./views/community-resource-wizard.vue')},
    {path: '/reuse/new/', component: () => import('./views/reuse-wizard.vue')},
    {path: '/reuse/:oid/', name: 'reuse', component: () => import('./views/reuse.vue'), children: [
        {path: 'issue/:issue_id/', name: 'reuse-issue', component: () => import('./components/issues/modal.vue')},
        {path: 'discussion/:discussion_id/', name: 'reuse-discussion', component: () => import('./components/discussions/modal.vue')},
    ]},
    {path: '/reuse/:oid/edit/', name: 'reuse-edit', component: () => import('./views/reuse-edit.vue')},
    {path: '/organization/new/', name: 'organization-new', component: () => import('./views/organization-wizard.vue')},
    {path: '/organization/new/:oid/', component: () => import('./views/organization-wizard.vue'),
        callback(view) {
            if (!view.organization.id) {
                view.organization.fetch(oid);
            }
        }
    },
    {path: '/organization/:oid/', name: 'organization', component: () => import('./views/organization.vue')},
    {path: '/organization/:oid/edit/', name: 'organization-edit', component: () => import('./views/organization-edit.vue')},
    {path: '/user/:oid/', name: 'user', component: () => import('./views/user.vue')},
    {path: '/user/edit/:oid/', name: 'user-edit', component: () => import('./views/user-edit.vue')},
    {path: '/harvester/new/', component: () => import('./views/harvester-wizard.vue')},
    {path: '/harvester/:oid/', name: 'harvester', component: () => import('./views/harvester.vue'), children: [
        {path: 'schedule', name: 'harvester-schedule', component: () => import('./components/harvest/schedule-modal.vue')},
    ]},
    {path: '/harvester/:oid/edit', name: 'harvester-edit', component: () => import('./views/harvester-edit.vue')},
    {path: '/post/new/', name: 'post-new', component: () => import('./views/post-wizard.vue')},
    {path: '/post/:oid/', name: 'post', component: () => import('./views/post.vue')},
    {path: '/post/:oid/edit/', name: 'post-edit', component: () => import('./views/post-edit.vue')},
    {path: '/topic/new/', name: 'topic-new', component: () => import('./views/topic-wizard.vue')},
    {path: '/topic/:oid/', name: 'topic', component: () => import('./views/topic.vue')},
    {path: '/topic/:oid/edit/', name: 'topic-edit', component: () => import('./views/topic-edit.vue')},
    {path: '/editorial/', name: 'editorial', component: () => import('./views/editorial.vue')},
    {path: '/system/', component: () => import('./views/system.vue')},
    {path: '/search/', name: 'search', component: () => import('./views/search.vue')},
]

const router = new VueRouter({
    history: true,
    root: config.admin_root,
    routes
});


/**
 * Make the $go shortcut available on every view instance.
 */
Vue.prototype.$go = function(route) {
    return router.go(route);
};

export default router;
