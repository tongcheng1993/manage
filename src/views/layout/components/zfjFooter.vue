<template>
    <div class="view_div">
        {{ name }}
    </div>
</template>

<script>
export default {
    name: "zfjFooter",
    components: {},
    props: {},
    methods: {
        init() {
        },
    },
    computed: {},
    watch: {},
    data() {
        return {
            name: 'footer',
            page: {
                total: 0,
                current: 0,
                size: 10,
                orders: []
            },
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
    }
}
</script>

<style scoped></style>