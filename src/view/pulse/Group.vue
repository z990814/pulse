<template>
  <div class="body">
    <div class="head">
      <el-button class="el-button--goon" @click="toAddGroup()"><span><i class="el-icon-plus"></i>添加</span></el-button>
    </div>
    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%" :max-height="innerHeight*0.7">
    <el-table-column label="规则名称" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.groupTitle }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="规则类型" width="197">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p v-if="scope.row.type === 0" style="font-weight: 700;font-size:17px;">默认随机问题组</p>
            <p v-else-if="scope.row.type === 1" style="font-weight: 700;font-size:17px;">自由固定问题组</p>
            <p v-else-if="scope.row.type === 2" style="font-weight: 700;font-size:17px;">自定义算法问题组</p>
            <p v-else-if="scope.row.type === 3" style="font-weight: 700;font-size:17px;">敬业度特定算法问题组</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="474">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p style="font-weight: 700;font-size:17px;">{{ scope.row.description }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="217">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="217">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-button--goon" size="mini" @click="toUpdateGroup(scope.$index, scope.row)">编辑</el-button>
          <el-button class="el-button--goon" size="mini" type="danger" @click="toDeleteGroup(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加规则" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" style="color:aquamarine;">
      <el-form :model="groupForm">
        <el-form-item label="规则名称:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="groupForm.groupTitle" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="规则类型:" :label-width="formLabelWidth">
          <el-select v-model="groupForm.type" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item v-if="groupForm.type === 0 || groupForm.type === 1" label="题目数量:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="groupForm.questionAmount" type="number" required="" autocomplete="off" placeholder="请输入整数">
          </div>
          <el-button v-if="groupForm.type === 1" class="el-button--goon" style="margin-top: 4px;" @click="toAddQuestions()" > 选择题目</el-button>
        </el-form-item>

        <el-form-item label="描述:" :label-width="formLabelWidth">
          <p v-if="groupForm.type === 0" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">对一个主题的所有问题进行随机抽取{{ groupForm.questionAmount }}题</p>
          <div v-else-if="groupForm.type === 1 || groupForm.type === 2" class="inputGroup">
            <input v-model="groupForm.description" type="text" required="" autocomplete="off">
          </div>
          <p v-if="groupForm.type === 3" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">主题题数需大于24题，<br>若总题数为96题，96除24等于4，每日推4题。<br>若每月一号为周二<br>
            则第一到第四个周二推{1-16题}<br>
             第一到第四个周三推{17-32题}<br>
             第一到第四个周四推{33-48题}<br>
             第一到第四个周五推{49-64题}<br>
             第一到第四个周六推{65-80题}<br>
             第一到第四个周一推{81-96题}<br>
             剩下的天数从第一题按顺序推<br>
             若一号为周日，按周一算即可
          </p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="addGroup()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改规则" :close-on-click-modal="false" :visible.sync="dialogVisibleUpdate" width="30%" style="color:aquamarine;">
      <el-form :model="updateForm">
        <el-form-item label="规则名称:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.groupTitle" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="规则类型:" :label-width="formLabelWidth">
          <el-select v-model="updateForm.type" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item v-if="updateForm.type === 0 || updateForm.type === 1" label="题目数量:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="updateForm.questionAmount" type="number" required="" autocomplete="off" placeholder="请输入整数">
          </div>
          <el-button v-if="updateForm.type === 1 && updateForm.questionAmount > 0" class="el-button--goon" style="margin-top: 4px;" @click="toChooseQuestions()" > 选择题目</el-button>
        </el-form-item>

        <el-form-item label="描述:" :label-width="formLabelWidth">
          <p v-if="updateForm.type === 0" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">对一个主题的所有问题进行随机抽取{{ updateForm.questionAmount }}题</p>
          <div v-else-if="updateForm.type === 1 || updateForm.type === 2" class="inputGroup">
            <input v-model="updateForm.description" type="text" required="" autocomplete="off">
          </div>
          <p v-if="updateForm.type === 3" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">主题题数需大于24题，<br>若总题数为96题，96除24等于4，每日推4题。<br>若每月一号为周二<br>
            则第一到第四个周二推{1-16题}<br>
             第一到第四个周三推{17-32题}<br>
             第一到第四个周四推{33-48题}<br>
             第一到第四个周五推{49-64题}<br>
             第一到第四个周六推{65-80题}<br>
             第一到第四个周一推{81-96题}<br>
             剩下的天数从第一题按顺序推<br>
             若一号为周日，按周一算即可
          </p>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleUpdate = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="updateGroup()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除问题" :close-on-click-modal="false" :visible.sync="dialogVisibleDelete" width="30%" style="color:aquamarine;">
      <p>确定要删除问题：<br>《{{ deleteDes }}》吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleDelete = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="deleteGroup()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="选择问题" :close-on-click-modal="false" :visible.sync="dialogVisibleChoose" width="30%" style="color:aquamarine;">
      <el-tree :data="data"  show-checkbox default-expand-all node-key="value" :default-checked-keys="dataSelected" ref="tree" highlight-current :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleChoose = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="getCheckedKeys">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import groupApi from '@/api/group'
  export default {
    data() {
      return {
        tableData: [],
        data: [],
        dataSelected:[],
        innerHeight: window.innerHeight,
        formQuery: {},
        total: 0,
        dialogVisible: false,
        dialogVisibleUpdate: false,
        dialogVisibleChoose: false,
        dialogVisibleDelete: false,
        deleteDes: '',
        deleteId: 0,
        formLabelWidth: '87px',
        groupForm: {},
        updateForm: {},
        thisSelectQues: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        options: [
          {
            value: 0,
            label: '默认随机问题组'
            // 卡组类型（0：默认随机问题组 1： 自由固定问题组 2：顺序算法问题组 3：一周周期算法问题组 4：月份周期算法问题组）
          },
          {
            value: 1,
            label: '自由固定问题组'
          },
          {
            value: 2,
            label: '自定义算法问题组'
          },
          {
            value: 3,
            label: '敬业度特定算法组'
          }
        ]
      }
    },
    created() {
      this.getform(1,10)
    },
    methods: {
      getCheckedKeys() {
        this.thisSelectQues = ''
        console.log(this.$refs.tree.getCheckedKeys())
        const ques = this.$refs.tree.getCheckedKeys()
        var counts = 0
        ques.forEach(element => {
          if(element) {
            this.thisSelectQues = this.thisSelectQues + ',' + element
            counts = counts +1
          }
        })
        if(this.chooseType === 1) {
          this.updateForm.questionAmount = counts
        } else if(this.chooseType === 2) {
          this.groupForm.questionAmount = counts
        }
        console.log(counts)
        console.log(this.thisSelectQues)
        this.dialogVisibleChoose = false

      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
      },
      toAddGroup() {
        this.groupForm = {}
        this.dialogVisible = true
      },
      toUpdateGroup(index,row) {
        this.updateForm = JSON.parse(JSON.stringify(row))
        this.dialogVisibleUpdate = true
      },
      toChooseQuestions() {
        this.dialogVisibleChoose = true
        this.getQuestionTreeList()
        this.getQuestionTreeListSelect()
        this.chooseType = 1
      },
      toAddQuestions(){
        this.chooseType = 2
        this.dataSelected = []
        this.getQuestionTreeList()
        this.dialogVisibleChoose = true
      },
      getQuestionTreeList() {
        groupApi.findNodes().then(res => {
          this.data = res.data.data.list
        })
      },
      getQuestionTreeListSelect() {
        groupApi.findNodesSelected(this.updateForm.id).then(res => {
          console.log(res.data.data.list)
          this.dataSelected = res.data.data.list 
        })
      },
      getform(current, limit) {
        groupApi.getFormDataListPage(current, limit, this.formQuery).then(res => {
          if(res.data.code === 200){
            this.tableData = res.data.data.rows
            this.total = res.data.data.total
          }
        })
      },
      addGroup() {
        if(this.thisSelectQues) {
          this.groupForm.formula = this.thisSelectQues.slice(1)
        }
        groupApi.addGroup(this.groupForm).then(res => {
          if(res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.dialogVisible = false
            this.getform(1,10)
          }
        })
      },
      updateGroup() {
        if(this.thisSelectQues) {
          this.updateForm.formula = this.thisSelectQues.slice(1)
        }
        groupApi.updateGroup(this.updateForm).then(res => {
          if(res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogVisibleUpdate = false
            this.getform(1,10)
          }
        })
      },
      toDeleteGroup(index, row) {
        this.dialogVisibleDelete = true
        this.deleteDes = row.groupTitle
        this.deleteId = row.id
      },
      deleteGroup() {
        groupApi.deleteGroup(this.deleteId).then(res => {
          if(res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
          this.getform(1,10)
          this.dialogVisibleDelete = false
        })
      }
    }
  }
</script>

<style scoped>
.body {
  margin: 7px;
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