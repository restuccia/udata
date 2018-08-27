<template>
<div>
    <form-layout icon="user" :title="_('Edit user')" :save="save" :cancel="cancel" footer="true" :model="user">
        <user-form ref="form" :user="user"></user-form>
    </form-layout>
</div>
</template>

<script>
import UserForm from 'components/user/form.vue';
import User from 'models/user';
import FormLayout from 'components/form-layout.vue';

export default {
    data() {
        return {user: new User()};
    },
    components: {FormLayout, UserForm},
    methods: {
        save() {
            const form = this.$refs.form;
            if (form.validate()) {
                this.user.update(form.serialize(),
                                 response => {
                                     this.user.on_fetched(response);
                                     this.$go({name: 'user'});
                                 },
                                 form.on_error);
            }
        },
        cancel() {
            this.$go({name: 'user'});
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.user.fetch(to.params.oid);
        });
    },
    beforeRouteUpdate(to, from, next) {
        if (to.params.oid !== this.user.id) {
            this.user.fetch(to.params.oid);
            this.$scrollTo(this.$el);
        }
    },
};
</script>
