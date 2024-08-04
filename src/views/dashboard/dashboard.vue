<template>
    <div class="view_div">
        {{ name }}
    </div>
</template>

<script>

export default {
    name: "dashboard",
    components: {},
    props: {},
    computed: {},
    watch: {},
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
    data() {
        return {
            name: 'dashboard',

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