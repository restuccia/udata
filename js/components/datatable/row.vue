<template>
<tr class="pointer"
    :class="{ 'active': selected }"
    @click="item_click(item)">
    <td v-for="field in fields" :key="field.key"
        :class="{
            'text-center': field.align === 'center',
            'text-left': field.align === 'left',
            'text-right': field.align === 'right',
            'ellipsis': field.ellipsis
        }">
        <component :is="cellFor(field)" :item="item" :field="field">
        </component>
    </td>
</tr>
</template>

<script>
import Vue from 'vue';

// Lazy load every cell types
const components = {};
require.context('./cells/', true, /^(.(?!base))+\.vue$/)
    .keys().map(k => k.replace('./', '').replace('.vue', ''))
    .map(name => {
        components[`${name}-cell`] = () => import(`./cells/${name}.vue`)
    });

export default {
    name: 'datatable-row',
    props: {
        item: Object,
        fields: Array,
        selected: {
            type: Boolean,
            default: false
        }
    },
    components,
    methods: {
        cellFor(field) {
            return field.type ? `${field.type}-cell` : 'text-cell';
        },
        item_click(item) {
            this.$dispatch('datatable:item:click', item);
        },
    }
};
</script>
