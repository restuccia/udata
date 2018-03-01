<template>
<modal ref="modal" :title="_('Harvest source validation')"
    class="modal-info harvest-delete-modal">

    <div class="modal-body">
        <p>
            {{ _('You are about to validate (or not) this harvest source.') }}
            {{ _('It means that this source will be harvested regulary.') }}
        </p>
        <form role="form">
            <div class="form-group" ref="group">
                <label>{{ _('Reason') }}</label>
                <textarea class="form-control" rows="3" ref="comment"
                    :placeholder="_('Explain your validation')"
                    v-model="comment">
                </textarea>
            </div>
        </form>
    </div>

    <footer class="modal-footer text-center">
        <button type="button" class="btn btn-success btn-flat pull-left"
            @click="validate">
            {{ _('Validate') }}
        </button>
        <button type="button" class="btn btn-danger btn-flat"
            @click="reject">
            {{ _('Reject') }}
        </button>
    </footer>
</modal>
</template>

<script>
import API from 'api';
import Modal from 'components/modal.vue';

export default {
    components: {Modal},
    props: {
        source: Object,
    },
    data() {
        return {
            comment: null
        };
    },
    methods: {
        validate() {
            this.perform_validation('accepted');
        },
        reject() {
            this.perform_validation('refused');
        },
        perform_validation(state) {
            if (state === 'refused' && !this.comment) {
                this.$refs.group.className.replace('has-success', '');
                if (!this.$refs.group.className.indexOf('has-error') >= 0) {
                    this.$refs.group.className += ' has-error';
                }
                return;
            } else {
                this.$refs.group.className.replace('has-error', '');
                if (!this.$refs.group.className.indexOf('has-success') >= 0) {
                    this.$refs.group.className += ' has-success';
                }
            }
            API.harvest.validate_harvest_source(
                {ident: this.source.id, payload: {
                    state:state, comment: this.comment
                }},
                (response) => {
                    this.source.on_fetched(response);
                    this.$refs.modal.close();
                }
            );
        }
    }
};
</script>
