<template>
<span class="label" :class="classes">{{text}}</span>
</template>

<script>
import {_} from 'i18n';
import BaseCell from './base.vue';

const VISIBILITIES = {
    deleted: {
        label: _('Deleted'),
        type: 'error'
    },
    private: {
        label: _('Private'),
        type: 'warning'
    },
    public: {
        label: _('Public'),
        type: 'info'
    }
};

export default {
    name: 'visibility-cell',
    mixins: [BaseCell],
    computed: {
        classes() {
            if (!this.item) return;
            if (this.item.deleted) {
                return [`label-${VISIBILITIES.deleted.type}`];
            } else if (this.item.private) {
                return [`label-${VISIBILITIES.private.type}`];
            } else {
                return [`label-${VISIBILITIES.public.type}`];
            }
        },
        text() {
            if (!this.item) return;
            if (this.item.deleted) {
                return VISIBILITIES.deleted.label;
            } else if (this.item.private) {
                return VISIBILITIES.private.label;
            } else {
                return VISIBILITIES.public.label;
            }
        }
    }
};
</script>
