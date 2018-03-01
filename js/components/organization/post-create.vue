<template>
<div>
    <div class="page-header">
    <h1>{{ _('Your organization has been created') }}</h1>
    </div>
    <div class="row">
        <div class="col-xs-12 lead text-center">
            <p>{{ _('You can now either publish a dataset or a reuse.') }}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-md-4 text-center">
            <router-link tag="button" class="btn btn-primary btn-flat" to="/dataset/new/">
                {{ _('Publish a new dataset') }}
            </router-link>
        </div>
        <div class="col-xs-12 col-md-4 text-center">
            <router-link tag="button" class="btn btn-primary btn-flat" to="/reuse/new/">
                {{ _('Publish a new reuse') }}
            </router-link>
        </div>
        <div class="col-xs-12 col-md-4 text-center">
            <router-link class="btn btn-primary btn-flat"
                :to="{name: 'organization', params: {oid: organization.id}}">
                {{ _('See in the administration') }}
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        organization: {
            type: Object,
            default: () => {}
        }
    }
};
</script>
