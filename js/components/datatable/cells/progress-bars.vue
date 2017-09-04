<template>
<div class="progress progress-sm">
    <span class="progress-bar" :class="progress_class"
        :style="{width: value + 1 + '0%'}"
        :title="_('Score:') + ' ' + value">
    </span>
</div>
</template>

<script>
export default {
    name: 'datatable-cell-progress-bars',
    computed: {
        progress_class() {
            if (this.value < 2) {
                return ['progress-bar-danger'];
            }
            else if (this.value < 5) {
                return ['progress-bar-warning'];
            }
            else if (this.value < 9) {
                return ['progress-bar-primary'];
            }
            else {
                return ['progress-bar-success'];
            }
        }
    }
};
</script>
