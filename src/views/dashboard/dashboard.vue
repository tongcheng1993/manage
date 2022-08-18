<template>
    <div class="view_div">
        {{name}}
    </div>
</template>

<script>
    export default {
        name: "dashboard",
        components: {},
        props: {},
        methods: {
            async toNextPage(to) {
                await this.$router.push({
                    path: to,
                    params: {}
                })
            },
            init() {

            },
        },
        computed: {},
        watch: {},
        data() {
            return {
                name: 'dashboard',
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

<style scoped>

</style>