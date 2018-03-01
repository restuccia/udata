<template>
<span class="badge" :class="classes">{{ icon }}</span>
</template>

<script>
export default {
    name: 'resource-availability',
    props: {
        resource: {
            type: Object,
            required: true,
        }
    },
    computed: {
        availability() {
            switch (this.resource.extras && this.resource.extras['check:available']) {
                case true:
                    return 'AVAILABLE';
                case false:
                    return 'NOT_AVAILABLE';
                default:
                    return 'UNKNOWN';
            }
        },
        classes() {
            switch(this.availability) {
                case 'AVAILABLE':
                    return ['bg-green'];
                case 'NOT_AVAILABLE':
                    return ['bg-red'];
                default:
                    return ['bg-gray'];
            }
        },
        icon() {
            switch(this.availability) {
                case 'AVAILABLE':
                    return '✓';
                case 'NOT_AVAILABLE':
                    return '×';
                default:
                    return '?';
            }
        }
    }
}
</script>
