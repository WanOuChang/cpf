<template>
  <el-container>
    <el-header id="el-headers">Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <el-button @click="dialogFormVisible = true" type="primary">创建新banner</el-button>

        <el-dialog title="创建banner" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item
              label="序号"
              :label-width="formLabelWidth"
              prop="age"
              :rules="[
                { required: true, message: '序号不能为空'},
                { type: 'number', message: '序号必须为数字值'}
              ]"
            >
              <el-input v-model="form.serial_num" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="备注"
              :label-width="formLabelWidth"
              prop="age"
              :rules="[
                { required: true, message: '备注不能为空'}
              ]"
            >
              <el-input v-model="form.remarks" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="链接"
              :label-width="formLabelWidth"
              prop="age"
              :rules="[
                { required: true, message: '链接不能为空'}
              ]"
            >
              <el-input v-model="form.types" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="form.sort" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="活动时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.create_time"
                type="date"
      placeholder="选择日期">
              </el-date-picker>
            </el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </div>
        </el-dialog>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" prop="serial_num"></el-table-column>
          <el-table-column label="备注" prop="remarks"></el-table-column>
          <el-table-column label="类型" prop="types"></el-table-column>
          <el-table-column label="排序" prop="sort"></el-table-column>
          <el-table-column label="创建时间" prop="create_time"></el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        serial_num: "",
        remarks: "",
        types: "",
        sort: ""
      },
      formLabelWidth: "120px",
      id: null,
      currentPage4: 4,
      limit: 2,
      pagenum: 1,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 查询
    getList() {
      console.log("limit====", this.limit, "pagenum===", this.pagenum);
      this.$http
        .get("/api/getList", {
          params: { limit: this.limit, pagenum: this.pagenum }
        })
        .then(res => {
          console.log(res.data.data);
          this.tableData = res.data.data;
          this.total = res.data.total;
        });
    },

    // 添加/修改
    add() {
      let url = "";
      if (this.id) {
        url = "/api/edit";
      } else {
        url = "/api/add";
      }

      // console.log(this.form.create_time);
      this.$http.post(url, { ...this.form, id: this.id }).then(res => {
        // console.log(res);
        if (res.data.code === 1) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        }
        this.$message({
          type: "success",
          message: res.data.msg
        });

        this.getList();
        this.dialogFormVisible = false;
        this.reaset();
      });
    },

    // 清空
    reaset() {
      this.form = {
        serial_num: "",
        remarks: "",
        types: "",
        sort: ""
      };
      this.id = null;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getList();
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.id = row.id;
      this.form = {
        serial_num: row.serial_num,
        remarks: row.remarks,
        types: row.types,
        sort: row.sort
      };
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get("/api/del", { params: { id: row.id } }).then(res => {
            this.getList();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>


<style>
#el-headers {
  padding: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-container {
  height: 100%;
  width: 100%;
}
</style>