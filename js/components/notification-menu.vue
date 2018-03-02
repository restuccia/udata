<template>
<li class="dropdown notifications-menu">
    <a href class="dropdown-toggle" data-toggle="dropdown">
        <i class="fa fa-envelope-o"></i>
        <span v-if="notifications.length > 0"
            class="label label-warning">{{notifications.length}}</span>
    </a>
    <ul class="dropdown-menu">
        <li class="header text-center">{{ _('Notifications') }}</li>
        <li>
            <ul class="menu">
                <li v-for="(notification, idx) in notifications" :key="idx">
                    <component :is="notification.type"
                        :details="notification.details"></component>
                </li>
            </ul>
        </li>
    </ul>
</li>
</template>

<script>
import API from 'api';
import issue from 'components/notifications/issue.vue';
import discussion from 'components/notifications/discussion.vue';
import membership_request from 'components/notifications/membership_request.vue';
import transfer_request from 'components/notifications/transfer.vue';
import validate_harvester from 'components/notifications/validate-harvester.vue';

const INITIAL_FETCH = 5 * 1000;
const POLL_INTERVAL = 30 * 1000;

export default {
    name: 'notification-menu',
    data() {
        return {
            notifications: []
        };
    },
    // Components name matters (beware of the low dash)
    components: {issue,discussion,membership_request,transfer_request,validate_harvester},
    created() {
        // Trigger an initial fetch (don't wait for poll interval)
        setTimeout(this.fetch.bind(this), INITIAL_FETCH);
        // Start polling
        setInterval(this.fetch.bind(this), POLL_INTERVAL);
    },
    methods: {
        fetch() {
            API.notifications.get_notifications({}, (response) => {
                this.notifications = response.obj;
            });
        }
    }
};
</script>
