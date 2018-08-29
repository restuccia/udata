<template>
<div>
    <!-- Placeholder for non-routable modals -->
    <div ref="modal"></div>
    <app-header @navigation:toggled="toggleNavigation"></app-header>
    <sidebar></sidebar>
    <router-view></router-view>
</div>
</template>

<script>
import config from 'config';
import me from 'models/me';
import site from 'models/site';

import AppHeader from 'components/header.vue';
import Sidebar from 'components/sidebar.vue';
import ModalMixin from 'mixins/modal';


export default {
    name: 'admin',
    mixins: [ModalMixin],
    data() {
        return {
            toggled: true,
            notifications: [],
            site, me, config,
        };
    },
    components: {AppHeader, Sidebar},
    mounted() {
        // Display an error identifier un uncaught error
        document.addEventListener('ravenSuccess', (e) => {
            this.notifications.push({
                type: 'error',
                icon: 'exclamation-triangle',
                title: this._('An error occured'),
                details: this._('The error identifier is {id}', {id: e.data.event_id}),
            });
        });
    },
    methods: {
        handleApiError(error) {
            const notif = {type: 'danger', icon: 'exclamation-circle'};
            if (error.status === 403) {
                notif.title = this._('Operation not permitted');
                notif.details = this._('You are not allowed to perform this operation');
                notif.icon = 'ban'
            }
            this.notifications.push(notif);
        },
        toggleNavigation() {
            document.body.classList.toggle('sidebar-collapse');
            document.body.classList.toggle('sidebar-open');
            this.toggled = !this.toggled;
        },
        notify(notification) {
            this.notifications.push(notification);
        },
        closeNotification(notification) {
            const index = this.notifications.indexOf(notification);
            this.notifications.splice(index, 1);
        }
    }
};
</script>
