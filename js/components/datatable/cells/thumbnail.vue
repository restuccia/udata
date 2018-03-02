<style lang="less">
.datatable {
    td.thumbnail-cell {
        padding: 3px;
    }
}
</style>

<template>
<img :src="src" :width="field.width" :height="field.width" />
</template>

<script>
import placeholders from 'helpers/placeholders';
import BaseCell from './base.vue';

export default {
    name: 'thumbnail-cell',
    mixins: [BaseCell],
    mounted() {
        // Dirty hack to fix class on field/td iteration
        this.$el.closest('td').classList.add('thumbnail-cell');
    },
    computed: {
        src() {
            if (this.value) {
                return this.value;
            } else if (this.field.placeholder) {
                return placeholders.getFor(this.field.placeholder);
            } else {
                return placeholders.generic;
            }
        }
    }
};
</script>
