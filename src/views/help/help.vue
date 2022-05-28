<template>
  <div>
    {{ name }}
    {{ size }}
    <el-button @click="info()"> info</el-button>
    <el-input  v-model="message"
                  placeholder="请输入文件编码"></el-input>
    
     <el-button @click="send()"> send</el-button>
  </div>
</template>

<script>
import { info } from "../../api/wsApi";
export default {
  name: "help",
  components: {},
  props: {},
  methods: {
    init() {},
    info() {
      info().then((res) => {
        this.size = res;
      });
    },
    send(){
     
      this.$store.state.wsMessage=this.message
    }
  },
  computed: {},
  watch: {},
  data() {
    return {
      name: "help",
      page: {
        total: 0,
        current: 0,
        size: 10,
        orders: [],
      },
      size: null,
      message:'aa'
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