<template>
<span class="label" :class="classes">{{text}}</span>
</template>

<script>
import {_} from 'i18n';

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
    name: 'datatable-cell-visibility',
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
