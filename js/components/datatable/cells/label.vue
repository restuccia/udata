<style>
.label {
    margin: 1px;
}
</style>

<template>
<div>
    <span v-for="label in labels" :key="label" class="label" :class="labelClass(label)">
        {{ format(label) }}
    </span>
</div>
</template>

<script>
import BaseCell from './base.vue';

export default {
    name: 'label-cell',
    mixins: [BaseCell],
    computed: {
        labels() {
            return this.value instanceof Array
                ? this.value
                : [this.value]
        }
    },
    methods: {
        format(value) {
            return this.field.hasOwnProperty('label_func')
                ? this.field.label_func(value)
                : value;
        },
        labelClass(label) {
            return [this.field.hasOwnProperty('label_type')
                ? `label-${this.field.label_type(label)}`
                : 'label-default'];
        }
    }
};
</script>
