<template>
  <div>
    <!--        搜索-->
    <div>
      <el-row>
        <el-col :span="6">
          <el-input v-model="queryRoleMo.userName"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="queryRoleMo.name"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button @click="queryPageRole">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <!--        新增删除-->
    <div>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" @click="openAddRoleForm">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <!--        列表内容-->
    <div>
      <el-table :data="roleList">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="code" label="唯一编码"></el-table-column>
        <el-table-column prop="description" label="角色描述"></el-table-column>
        <el-table-column prop="sortNum" label="排序"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="detailRole(scope)">详情</el-button>
            <el-dropdown>
              <el-button type="primary">
                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="editRole(scope)"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item @click.native="openRoleMenuRelation(scope)"
                  >授予页面路由</el-dropdown-item
                >
                <el-dropdown-item @click.native=""
                  >授予后台方法</el-dropdown-item
                >
                <el-dropdown-item @click.native="">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :page-size="page.size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[10, 50, 100]"
      >
      </el-pagination>
    </div>
    <!--        新增/修改/详情 -->
    <div>
      <el-dialog :visible.sync="formFlag" :title="formTitle">
        <el-form :model="roleForm">
          <el-form-item label="角色名称">
            <el-input v-model="roleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="唯一编码">
            <el-input v-model="roleForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input
              v-model="roleForm.description"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formFlag = false">取 消</el-button>
          <el-button type="primary" @click="saveRole">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--        页面授权-->
    <div>
      <el-drawer
        :visible.sync="drawerFlag"
        direction="rtl"
        :title="drawerTitle"
      >
        <el-tree
          :data="menuTree"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          ref="tree"
          default-expand-all
          :default-checked-keys="menuKeys"
          :check-strictly="checkStrictly"
        >
          <span slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>{{ data.showFlag ? "" : "----隐藏" }}</span>
          </span>
        </el-tree>

        <el-button @click="drawer = false">取消</el-button>
        <el-button @click="saveRoleAndMenu()">保存并关闭</el-button>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  queryPageRole,
  saveRole,
  getRoleInfoById,
  queryListMenu,
  saveRoleAndMenu,
} from "../../api/userApi";
import { createTree } from "../../util/treeUtil";
export default {
  name: "roleList",
  components: {},
  props: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.size = val;

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.current = val;

    },
    async toNextPage(to) {
      await this.$router.push({
        path: to,
        params: {},
      });
    },
    init() {
      this.queryPageRole();
      this.queryTreeMenu();
    },
    queryPageRole() {
      let parameter = this.queryRoleMo;
      parameter.page = this.page;
      queryPageRole(parameter)
        .then((res) => {
          this.page = res;
          this.roleList = res.records;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openAddRoleForm() {
      this.formFlag = true;
      this.formTitle = "新增角色";
      this.roleForm = {};
    },

    detailRole(scope) {
      this.formTitle = "角色详情";
      this.formFlag = true;
      let parameter = {
        roleId: scope.row.id,
      };
      getRoleInfoById(parameter).then((res) => {});
    },
    editRole(scope) {
      this.formTitle = "修改角色";
      this.formFlag = true;
      this.roleForm = {
        id: scope.row.id,
      };
    },
    saveRole() {
      let parameter = this.roleForm;
      saveRole(parameter)
        .then((res) => {
          if (res) {
            this.queryPageRole();
            this.formFlag = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    queryTreeMenu() {
      let parameter = {};
      queryListMenu(parameter)
        .then((res) => {
          let parent = {
            id: '0',
            path: '/',
            name: 'container',
            component: '/layout/container',
            children: []
          }


          this.menuTree = createTree(res, parent).children;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openRoleMenuRelation(scope) {
      let parameter = {
        roleIds: [scope.row.id,]
      };
      queryListMenu(parameter)
        .then((res) => {
          let str = "";
          for (let i = 0; i < res.length; i++) {
            str += res[i].id.toString();
            if (i < res.length - 1) {
              str += ",";
            }
          }
          this.menuKeys = str.split(",");
          this.roleId = scope.row.id;
          this.drawerFlag = true;
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.menuKeys);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openRolePermissionRelation(scope) {
      let parameter = {
        roleId: scope.row.id,
      };
    },
    saveRoleAndMenu() {
      let checkedKeys = this.$refs.tree.getCheckedKeys();
      let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
      for (let i in halfCheckedKeys) {
        checkedKeys.push(halfCheckedKeys[i]);
      }
      let parameter = {
        roleId: this.roleId,
        menuIdList: checkedKeys,
      };
      saveRoleAndMenu(parameter)
        .then((res) => {
          if (res) {
            this.drawerFlag = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {},
  watch: {},
  data() {
    return {
      name: "roleList",
      page: {
        total: 0,
        current: 0,
        size: 10,
        orders: [{column:'sort_num',asc:true},{column:'create_time',asc:true}],
        records: [],
      },
      queryRoleMo: {
        name: "",
      },
      roleList: [],
      formFlag: false,
      formTitle: "",
      roleForm: {},
      menuTree: [],
      drawerFlag: false,
      drawerTitle: "",
      roleId: "",
      checkStrictly: true,
      defaultProps: {
        children: "children",
        label: "name",
      },
      menuKeys: [],
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