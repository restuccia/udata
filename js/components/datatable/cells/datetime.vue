<template>
<time :datetime="value">{{ value | dt('L') }}</time>
</template>

<script>
import BaseCell from './base.vue';

export default {
    name: 'datetime-cell',
    mixins: [BaseCell],
};
</script>
