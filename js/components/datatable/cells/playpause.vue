<template>
<i class="fa fa-fw" :class="classes"></i>
</template>

<script>
export default {
    name: 'datatable-cell-playpause',
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
