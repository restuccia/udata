<template>
<time :datetime="value" class="timeago">{{value | timeago}}</time>
</template>

<script>
import BaseCell from './base.vue';

export default {
    name: 'timeago-cell',
    mixins: [BaseCell],
};
</script>
