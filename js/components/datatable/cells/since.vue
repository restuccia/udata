<template>
<time :datetime="value">{{value | since}}</time>
</template>

<script>
import BaseCell from './base.vue';

export default {
    name: 'since-cell',
    mixins: [BaseCell],
};
</script>
