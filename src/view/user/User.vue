<template>
  <div class="body">
    <div class="head">
      <button class="button" @click="openDialog">
        <span><i class="el-icon-plus"></i>添加</span>
      </button>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%" :max-height="innerHeight*0.7">
      <el-table-column label="工号" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p style="font-weight: 700;font-size:17px;">{{ scope.row.username }}</p>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.realName }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="217">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <!-- <i style="margin-right: 11px;font-size: 17px;" class="el-icon-edit-outline"></i> -->
              <el-tag size="medium">{{ !scope.row.grade ? '无角色' : scope.row.grade }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="事业群" width="210">
        <template slot-scope="scope">   
            <div slot="reference" class="name-wrapper">
              <i style="margin-right: 11px;font-size: 17px;" class="el-icon-edit-outline"></i>
              <el-tag size="medium">{{ !scope.row.unit ? '无事业群' : scope.row.unit }}</el-tag>
            </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="昵称" width="180">
        <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
            </div>
        </template>
      </el-table-column> -->
      <el-table-column label="创建日期" width="217">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="toAssignRole(scope.$index, scope.row)">分配角色</el-button>
          <el-button class="el-button--goon" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button class="el-button--goon" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog title="添加用户" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" style="color:aquamarine;">
      <el-form :model="userForm">
        <el-form-item label="工号" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="userForm.username" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="userForm.password" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <!-- <el-form-item label="昵称" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="userForm.nickname" type="text" required="" autocomplete="off">
          </div>
        </el-form-item> -->
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="userForm.realName" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="分机" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="userForm.telephone" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <!-- <el-form-item label="角色" :label-width="formLabelWidth">
          <div class="inputGroup">
            <el-select v-model="userForm.grade" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item> -->
        <el-form-item label="事业群" :label-width="formLabelWidth">
          <div class="inputGroup">
            <el-select v-model="userForm.unit" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="园区" :label-width="formLabelWidth">
          <div class="inputGroup">
            <el-select v-model="userForm.factory" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改用户" :close-on-click-modal="false" :visible.sync="dialogVisibleUpdate" width="30%" style="color:aquamarine;">
      <el-form :model="updateForm">
        <el-form-item label="工号" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.username" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.realName" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <!-- <el-form-item label="角色" :label-width="formLabelWidth">
          <div class="inputGroup">
            <el-select v-model="updateForm.grade" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item> -->
        <el-form-item label="事业群" :label-width="formLabelWidth">
          <div class="inputGroup">
            <el-select v-model="updateForm.unit" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <!-- <el-button class="el-button--goon" style="margin-top: 7px;">编辑事业群</el-button> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleUpdate = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="updateUser()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="分配角色" :close-on-click-modal="false" :visible.sync="dialogVisibleRole" width="30%" style="color:aquamarine;">
      <el-tree :data="options" :default-checked-keys="optionsSelected" show-checkbox default-expand-all node-key="value" ref="tree" highlight-current :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="resetChecked">清空</el-button>
        <el-button class="el-button--goon" @click="dialogVisibleRole = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="assignRole()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除" :close-on-click-modal="false" :visible.sync="dialogVisibleConfirm" width="30%" style="color:aquamarine;">
      <!-- <el-divider></el-divider> -->
      <p style="font-size: 17px;">确认要删除用户{{ selectUserName }}吗！？</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleConfirm = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="deleteUser()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import userApi from "@/api/user"
import roleApi from "@/api/role"

  export default {
    data() {
      return {
        dialogVisible: false,
        dialogVisibleUpdate: false,
        dialogVisibleRole: false,
        dialogVisibleConfirm: false,
        innerHeight:window.innerHeight,
        userForm: {
          username: '',
          password: '',
          nickname: ''
        },
        updateForm: {
          id: '',
          username: '',
          nickname: ''
        },
        formLabelWidth: '87px',
        tableData: [],
        currentPage4: 6,
        pageSize: 100,
        total: 100,
        formQuery: {},
        val: 10,
        options: [],
        optionsSelected:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        selectUser: 0,
        selectUserName: '' 
      }
    },
    created() {
      this.getform(1,10)
    },
    methods: {
      assignRole() {
        let roleNameList = [];
        this.$refs.tree.getCheckedNodes().forEach(e => { 
            roleNameList.push(e.label)
        })
        const assignRoleVo = {
          roleIdList: this.$refs.tree.getCheckedKeys(),
          roleNameList: roleNameList,
          userId:  this.selectUser
        }
        roleApi.assignRoleList(assignRoleVo).then(res => {
          if(res.status === 200 ) {
            this.dialogVisibleRole = false
            this.$message({
              message: '分配成功',
              type: 'success'
            })
          }
          this.getform(1,10)
        })
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
      },
      toAssignRole(index, row) {
        this.dialogVisibleRole = true
        this.selectUser = row.id
        this.getRoleListSelect()
      },
      addUser() {
        userApi.addUser(this.userForm).then(res => {
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
      updateUser() {
        userApi.updateUser(this.updateForm).then(res => {
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
        userApi.getFormDataListPage(current, limit, this.formQuery).then(res => {
          if(res.data.code === 200){
            // console.log(res.data.data)
            this.tableData = res.data.data.rows
            this.total = res.data.data.total
          }
        })
      },
      getRoleList() {
        roleApi.getRoleList().then(res => {
          // console.log(res.data.data.list)
          this.options = res.data.data.list
        })
      },
      getRoleListSelect() {
        roleApi.toAssign(this.selectUser).then(res => {
          console.log(res.data.data)
          this.options = res.data.data.list.allRoles
          this.optionsSelected = res.data.data.list.userRoleIds
        })
      },
      openDialog() {
        this.dialogVisible = true
        this.userForm = {}
      },
      handleEdit(index, row) {
        this.dialogVisibleUpdate = true
        this.updateForm = JSON.parse(JSON.stringify(row))
      },
      handleDelete(index, row) {
        this.selectUser = row.id
        this.selectUserName = row.username
        this.dialogVisibleConfirm = true
      },
      deleteUser() {
        userApi.Remove(this.selectUser).then(res => {
          if( res.data.code === 200 ) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getform(1,10)
            this.dialogVisibleConfirm = false
          }
        })
      },
      handleSizeChange(val) {
        this.getform(1,val)
        this.val = val
      },
      handleCurrentChange(val) {
        this.getform(val,this.val)
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