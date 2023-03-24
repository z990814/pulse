<template>
  <div class="body">
    <div class="head">
      <button class="button" @click="openDialog">
        <span><i class="el-icon-plus"></i>添加</span>
      </button>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="角色名" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.roleName }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="角色值" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.roleCode }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="217">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.description }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="210">
        <template slot-scope="scope">   
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.grade=='0' ? '禁用' : '正常'}}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="247">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="handlePer(scope.$index, scope.row)">分配权限</el-button>
          <el-button class="el-button--goon" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button class="el-button--goon" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 5, 15, 20, 25, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" 
    :before-close="handleClose"
    > -->
    <el-dialog title="添加角色" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" style="color:aquamarine;">
      <el-form :model="roleForm">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="roleForm.roleName" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="角色码" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="roleForm.roleCode" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="roleForm.description" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <!-- <el-form-item label="权限组" :label-width="formLabelWidth">
          <el-button class="el-button--goon" style="margin-top: 7px;">添加权限</el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="addRole()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改角色" :close-on-click-modal="false" :visible.sync="dialogVisibleUpdate" width="30%" style="color:aquamarine;">
      <el-form :model="updateForm">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.roleName" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="角色码" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.roleCode" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.description" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleUpdate = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="updateRole()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="分配权限" :close-on-click-modal="false" :visible.sync="dialogVisiblePer" width="30%" style="color:aquamarine;">
      <el-tree :data="data" show-checkbox default-expand-all node-key="id" :default-checked-keys="dataSelected" ref="tree" highlight-current :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="resetChecked">清空</el-button>
        <el-button class="el-button--goon" @click="dialogVisiblePer = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="getCheckedNodes">确 定</el-button>
      </span>
    </el-dialog>

    
  </div>
</template>

<script>
import roleApi from "@/api/role"
import menuApi from "@/api/menu"

  export default {
    data() {
      return {
        dialogVisible: false,
        dialogVisibleUpdate: false,
        dialogVisiblePer: false,
        roleForm: {},
        updateForm: {
          id: ''
        },
        formLabelWidth: '87px',
        tableData: [],
        currentPage4: 6,
        pageSize: 100,
        total: 100,
        formQuery: {},
        val: 10,
        data: [],
        dataSelected:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        selectRole: 0
      }
    },
    created() {
      this.getform(1,10)
    },
    methods: {
      addRole() {
        roleApi.addRole(this.roleForm).then(res => {
          if(res.data.code === 200) {
            this.dialogVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.getform(1,this.val)
          }
        })
      },
      updateRole() {
        roleApi.updateRole(this.updateForm).then(res => {
          if(res.data.code === 200) {
            this.dialogVisibleUpdate = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.getform(1,this.val)
          }
        })
      },
      getform(current, limit) {
        roleApi.getFormDataListPage(current, limit, this.formQuery).then(res => {
          if(res.data.code === 200){
            // console.log(res.data.data)
            this.tableData = res.data.data.rows
            this.total = res.data.data.total
          }
        })
      },
      openDialog() {
        this.dialogVisible = true
        this.roleForm = {}
      },
      handleEdit(index, row) {
        this.dialogVisibleUpdate = true
        this.updateForm = JSON.parse(JSON.stringify(row))
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        this.getform(1,val)
        this.val = val
      },
      handleCurrentChange(val) {
        this.getform(val,this.val)
      },
      handlePer(index, row) {
        this.dialogVisiblePer = true
        this.selectRole = row.id
        this.getMenuListSelect()
      },
      getMenuList() {
        menuApi.findNodes().then(res => {
          this.data = res.data.data.list
        })
      },
      getMenuListSelect() {
        menuApi.toAssign(this.selectRole).then(res => {
          // console.log(res.data.data.list)
          this.data = res.data.data.list.menuList
          this.dataSelected = res.data.data.list.selectedList
        })
      },
      getCheckedNodes() {
        // console.log(this.$refs.tree.getCheckedNodes());
        const assginMenuVo = {
          menuIdList: this.$refs.tree.getCheckedKeys(),
          roleId:  this.selectRole
        }
        menuApi.AddMenuList(assginMenuVo).then(res => {
          if(res.status === 200 ) {
            this.dialogVisiblePer = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }
        })
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
      }
    }
  }
</script>

<style scoped>
::v-deep .el-table th{
    background-color: rgba(124, 182, 179, 0.342);
}
/* 按钮风格重定义 */
.el-button--goon {
  color: #ffffff;
  background-color: #13c2c2;
  border-color: #13c2c2;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:focus, .el-button--goon:hover {
  color: rgb(245, 245, 245);
  background-color: #0e9a9a;
  border-color: #0e9a9a;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:active {
  color:  #ffffff;
  background-color: #13c2c2;
  border-color: #13c2c2;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
/* 按钮风格重定义 */

.body {
  margin: 7px;
}

.button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: lightseagreen;
  font-family: "Montserrat", sans-serif;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border: none;
  cursor: pointer;
  padding: 7px 27px;
}

.button:after {
  content: " ";
  width: 0%;
  height: 100%;
  background: rgb(35, 175, 196);
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.button:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.button span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  /* padding: 11px 25px; */
  color: #fff;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.3em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}

.button:hover span {
  color: #183153;
  animation: scaleUp 0.3s ease-in-out;
}

@keyframes scaleUp {
 0% {
  transform: scale(1);
 }

 50% {
  transform: scale(0.95);
 }

 100% {
  transform: scale(1);
 }
}

.inputGroup {
  font-family: 'Segoe UI', sans-serif;
  margin: 0em 0 0em 0;
  max-width: 297px;
  position: relative;
}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 7px;
  width: 100%;
}

.inputGroup :is(input:focus, input:valid)~label {
  transform: translateY(-50%) scale(.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #e8e8e8;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: lightseagreen;
}
</style>