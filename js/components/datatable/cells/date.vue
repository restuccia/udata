<template>
<time :datetime="value | dt('YYYY-MM-DD')">{{value | dt('L')}}</time>
</template>

<script>
import BaseCell from './base.vue';

export default {
    name: 'date-cell',
    mixins: [BaseCell],
};
</script>
