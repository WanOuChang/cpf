<template>
  <div class="home">
    <el-container style="height: 500px; border: 1px solid #eee">
      
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item index="4">
            <router-link tag="li"
              v-for="(item,index) in ulist"
              :key="index"
              :to='{path:"/mine"+item.menuapi}'
            >{{item.menuname}}</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      ulist: []
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/about");
    } else {
      let token = localStorage.getItem("token");
      this.$http.get("/api/menu", { headers: { token } }).then(res => {
        console.log(res.data.data);
        if (res.data.code === 1) {
          this.ulist = res.data.data;
        }
      });
    }
  },
  methods: {}
};
</script>