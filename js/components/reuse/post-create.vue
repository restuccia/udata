<template>
<div>
    <div class="page-header">
        <h1>{{ _('Your reuse has been created') }}</h1>
    </div>
    <div class="row">
        <div class="col-xs-12 lead text-center">
            <p>{{ _('You should communicate about it.') }}</p>
        </div>
    </div>
    <share :url="reuse.page" :title="reuse.title"></share>

    <div class="row">
        <div class="col-xs-12 col-md-6 text-center">
            <router-link class="btn btn-primary btn-flat"
                :to="{name: 'reuse', params: {oid: reuse.id}}">
                {{ _('See in the administration') }}
            </router-link>
        </div>
        <div class="col-xs-12 col-md-6 text-center">
            <a class="btn btn-primary btn-flat" :href="reuse.page">
                {{ _('See on the site') }}
            </a>
        </div>
    </div>
</div>
</template>

<script>
import Reuse from 'models/reuse';
import Share from 'components/widgets/share.vue';

export default {
    components: {Share},
    props: {
        reuse: {
            type: Object,
            default: () => {}
        }
    },
};
</script>
