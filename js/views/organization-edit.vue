<template>
<div>
<form-layout icon="building" :title="title" :save="save" :cancel="cancel" footer="true" :model="org">
    <org-form ref="form" :organization="org"></org-form>
</form-layout>
</div>
</template>

<script>
import FormLayout from 'components/form-layout.vue';
import OrgForm from 'components/organization/form.vue';
import Organization from 'models/organization';

export default {
    name: 'organization-edit',
    data() {
        return {
            org: new Organization(),
        };
    },
    components: {FormLayout, OrgForm},
    computed: {
        title() {
            if (this.org.id) {
                return this._('Edit organization "{name}"', {
                    name: this.org.name
                });
            }
        }
    },
    methods: {
        save() {
            const form = this.$refs.form;
            if (form.validate()) {
                this.org.update(form.serialize(), (response) => {
                    this.org.on_fetched(response);
                    this.$go({name: 'organization', params: {oid: this.org.id}});
                }, form.on_error);
            }
        },
        cancel() {
            this.$go({name: 'organization', params: {oid: this.org.id}});
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.org.fetch(to.params.oid);
        });
    },
    beforeRouteUpdate(to, from, next) {
        if (to.params.oid !== this.org.id) {
            this.org.fetch(to.params.oid);
            this.$scrollTo(this.$el);
        }
    }
};
</script>
