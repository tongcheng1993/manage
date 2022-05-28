<template>
  <div>
    <div id="editor">
      
    </div>
  </div>
</template>

<script>
export default {
  name: "noticeDetail",
  components: {},
  props: {},
  methods: {
    async toNextPage(to) {
      await this.$router.push({
        path: to,
        params: {},
      });
    },
    init() {
        const editor = new wangeditor('#editor');
        editor.config.height = 500;
        editor.create()
    },
  },
  computed: {},
  watch: {},
  data() {
    return {
      name: "noticeDetail",
      page: {
        total: 0,
        current: 0,
        size: 10,
        orders: [],
        records: [],
      },
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {},
};
</script>

<style scoped>
</style>