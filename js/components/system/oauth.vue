<template>
<div>
    <box title="OAuth" icon="plug"
        boxclass="box-info"
        bodyclass="table-responsive no-padding">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>{{ _('Name') }}</th>
                    <th>{{ _('Description') }}</th>
                    <th width="20px"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in clients" :key="client.id" @click="display(client)">
                    <td>{{client.name}}</td>
                    <td>{{client.description}}</td>
                    <td>
                        <i class="fa fa-fw" :class="iconClasses"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </box>
</div>
</template>

<script>
import Box from 'components/containers/box.vue';

export default {
    name: 'oauth-widget',
    components: {Box},
    data() {
        return {
            title: 'OAuth',
            clients: []
        };
    },
    computed: {
        iconClasses() {
            return [
                client.enabled ? 'fa-play' : 'fa-stop',
                client.enabled ? 'text-green' : 'text-red'
            ];
        },
        display(client) {
            this.$router.push({name: 'oauth-client', params: {id: client.id}});
        }
    }
};
</script>
