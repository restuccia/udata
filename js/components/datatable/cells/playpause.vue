<template>
<i class="fa fa-fw" :class="classes"></i>
</template>

<script>
import BaseCell from './base.vue';

export default {
    name: 'playpause-cell',
    mixins: [BaseCell],
    default: false,
    computed: {
        classes() {
            return [
                this.value ? 'fa-play' : 'fa-stop',
                this.value ? 'text-green' : 'text-red'
            ]
        }
    }
};
</script>
