<template>
<span class="badge" :class="{
    'bg-green': value > 0,
    'bg-red': value == 0
    }">{{value}}</span>
</template>

<script>
import BaseCell from './base.vue';

export default {
    name: 'metric-cell',
    mixins: [BaseCell],
    default: 0
};
</script>
