<template>
  <div class="app-container">
    <el-button class="el-button--goon">添加大范围排程</el-button>
    <el-divider></el-divider>
    <el-calendar>
      <template slot="dateCell" slot-scope="{date, data}">
        <div id="dateCell" :class="rqi.indexOf(data.day) > -1 ? 'is-selected' : ''" @click="handleBianJi(data.day)">
          <span style="color: #000;margin-right: 7px;">{{ data.day.split('-').slice(1).join('-') }} </span>
          <span style="margin-right: 11px;color: cadetblue;">{{ schedule.indexOf(data.day) > -1 ? scheduleDetails[data.day].title : ''}}</span>
          <span style="margin-right: 11px;width: 100%;">{{ rqi.indexOf(data.day) > -1 ? rqineirong[data.day].jqmc : ''}}</span>
          <!-- <span>排程</span> -->
        </div>
      </template>
    </el-calendar>

    <!-- 添加或修改节假日管理 - 法定节假日对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="假期名称" prop="jqmc">
          <el-input v-model="form.jqmc" placeholder="请输入假期名称" />
        </el-form-item>
        <el-form-item label="开始时间" prop="kssj">
          <el-date-picker clearable size="small" style="width: 200px" v-model="form.kssj" type="date" value-format="yyyy-MM-dd" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="jssj">
          <el-date-picker clearable size="small" style="width: 200px" v-model="form.jssj" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="类型" prop="lx">
          <el-select v-model="form.lx" placeholder="请选择类型" clearable :style="{ width: '200px' }">
            <el-option v-for="(item,index) in specialOptions" :key="item.index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否休息" prop="isRest">
          <el-select v-model="form.isRest" placeholder="请选择类型" clearable :style="{ width: '200px' }">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="年份" prop="nf">
          <el-select v-model="form.nf" placeholder="请选择类型" clearable :style="{ width: '200px' }">
            <el-option v-for="item in 10" :key="item" :label="2015 + item" :value="2015 + item" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="selectScheduleForm.id" label="排程" prop="nf">
          <el-button class="el-button--goon" @click="toEditSchedule()">查看排程</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!selectScheduleForm.id" class="el-button--goon" type="primary" @click="viewSchedule">添加排程</el-button>
        <el-button class="el-button--goon" type="primary" @click="submitForm">确 定</el-button>
        <el-button class="el-button--goon" @click="cancel">取 消</el-button>
        <el-button  v-if="title == '编辑特殊日'" @click="deleteForm" :style="{ background: 'red',color:'white'}">删除</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加排程" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" style="color:aquamarine;">
      <el-form :model="scheduleForm">
        <el-form-item label="排程日期:" :label-width="formLabelWidth">
          <p style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ scheduleForm.scheduleDate }}</p>
        </el-form-item>
        <el-form-item label="特殊日:" :label-width="formLabelWidth">
          <p style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ scheduleForm.special }}</p>
        </el-form-item>
        <el-form-item label="是否休息:" :label-width="formLabelWidth">
          <p v-if="scheduleForm.isRest === 0" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">否</p>
          <p v-if="scheduleForm.isRest === 1" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">是</p>
        </el-form-item>
        <el-form-item label="当日标题:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="scheduleForm.title" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="当日首页语:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="scheduleForm.notes" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="开放式问题:" :label-width="formLabelWidth">
          <div class="inputGroup">
            <input v-model="scheduleForm.openQuestion" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="问题组规则:" :label-width="formLabelWidth">
          <el-select @change="change" v-model="scheduleForm.groupId" placeholder="请选择">
            <el-option v-for="(item,index) in options" :key="item.id" :label="item.groupTitle" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="isRandom" label="选择主题:" :label-width="formLabelWidth">
          <el-select v-model="scheduleDetailsAll.theme" placeholder="请选择">
            <el-option v-for="(item,index) in themes" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisible = false">取 消</el-button>
        <el-button class="el-button--goon" type="primary" @click="addSchedule()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查看排程" :close-on-click-modal="false" :visible.sync="dialogVisibleSchedule" width="37%" style="color:aquamarine;">
      <el-form :model="scheduleDetailsAll">
        <el-form-item label="排程日期:" :label-width="formLabelWidth">
          <p style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ scheduleDetailsAll.scheduleDate }}</p>
        </el-form-item>
        <el-form-item label="特殊日:" :label-width="formLabelWidth">
          <p style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ scheduleDetailsAll.special }}</p>
        </el-form-item>
        <el-form-item label="是否休息:" :label-width="formLabelWidth">
          <p v-if="scheduleDetailsAll.isRest === 0" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">否</p>
          <p v-if="scheduleDetailsAll.isRest === 1" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">是</p>
        </el-form-item>
        <el-form-item label="是否已经完成:" :label-width="formLabelWidth">
          <p v-if="scheduleDetailsAll.isFinished === 0" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">否</p>
          <p v-if="scheduleDetailsAll.isFinished === 1" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">是</p>
        </el-form-item>
        <el-form-item label="当日标题:" :label-width="formLabelWidth">
          <p v-if="scheduleDetailsAll.isFinished === 1" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ scheduleDetailsAll.title }}</p>
          <div v-if="scheduleDetailsAll.isFinished ===0" class="inputGroup">
            <input v-model="scheduleDetailsAll.title" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="当日首页语:" :label-width="formLabelWidth">
          <p v-if="scheduleDetailsAll.isFinished === 1" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ scheduleDetailsAll.notes }}</p>
          <div v-if="scheduleDetailsAll.isFinished ===0" class="inputGroup">
            <input v-model="scheduleDetailsAll.notes" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="开放式问题:" :label-width="formLabelWidth">
          <p v-if="scheduleDetailsAll.isFinished === 1" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ scheduleDetailsAll.openQuestion }}</p>
          <div v-if="scheduleDetailsAll.isFinished ===0" class="inputGroup">
            <input v-model="scheduleDetailsAll.openQuestion" type="text" required="" autocomplete="off">
          </div>
        </el-form-item>
        <el-form-item label="问题组规则:" :label-width="formLabelWidth">
          <el-select v-model="scheduleDetailsAll.groupId" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.groupTitle" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="isRandom" label="选择主题:" :label-width="formLabelWidth">
          <el-select v-model="scheduleDetailsAll.theme" placeholder="请选择">
            <el-option v-for="(item,index) in themes" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问人数:" :label-width="formLabelWidth">
          <p style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ scheduleDetailsAll.viewCount }}</p>
        </el-form-item>
        <el-form-item label="填写人数:" :label-width="formLabelWidth">
          <p style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ scheduleDetailsAll.answerCount }}</p>
        </el-form-item>
        <el-form-item label="封闭式问题:" :label-width="formLabelWidth">
          <p v-for="(item,index) in questionDetails" :key="index" style="color:lightseagreen;font-size:19px;margin:0;font-weight:700">{{ index+1 }}.{{ item }}</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="el-button--goon" @click="dialogVisibleSchedule = false">关 闭</el-button>
        <el-button class="el-button--goon" v-if="scheduleDetailsAll.isFinished === 0" type="primary" @click="editSchedule()">修 改 并 确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getSpecialDay, deleteSpecialDay, add, update } from "@/api/holiday";
import scheduleApi from "@/api/schedule";
import groupApi from "@/api/group";
import questionApi from "@/api/questions"

export default {
  jqmc: "Fdjjr",
  data() {
    return {
      // 排程弹出
      dialogVisible: false,
      // 查看排程
      dialogVisibleSchedule: false,
      // 排程细节
      scheduleDetailsAll: {},
      scheduleForm: {},
      formLabelWidth: '111px',
      selectScheduleForm: {},
      options: [],
      schedule: [],
      themes: [],
      scheduleDetails: {},
      questionDetails: [],
      // 是否用随机组
      isRandom: false,
      rqi:[],
      rqineirong:{},
      // 遮罩层
      loading: true,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        jqmc: [
          { required: true, message: "假期名称不能为空", trigger: "blur" }
        ],
        kssj: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        jssj: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        lx: [
          { required: true, message: "假期类型不能为空", trigger: "change" }
        ],
        nf: [
          { required: true, message: "年份不能为空", trigger: "change" }
        ],
        isRest: [
          { required: true, message: "是否休假类型不能为空", trigger: "change" }
        ],
      },
      // 节假日类型
      // 中国传统节日，国际节日，商业或现代衍生日（程序员节），台湾节日，香港节日，中国少民节日，公司特殊日，纪念日（如香港回归））
      specialOptions: [
        {
          value: '中国传统节日',
          label: '中国传统节日'
        },
        {
          value: '国际节日',
          label: '国际节日'
        },
        {
          value: '商业或现代衍生日',
          label: '商业或现代衍生日（如双十一)'
        },
        {
          value: '台湾节日',
          label: '台湾节日'
        },
        {
          value: '香港节日',
          label: '香港节日'
        },
        {
          value: '中国少数民族节日',
          label: '中国少数民族节日'
        },
        {
          value: '公司特殊日',
          label: '公司特殊日'
        },
        {
          value: '纪念日',
          label: '纪念日'
        },
        {
          value: '纪念日',
          label: '纪念日'
        },
        {
          value: '周末',
          label: '周末'
        },
        {
          value: '补班',
          label: '补班'
        },
      ],
    };
  },
  created() {
    this.getList()
    this.queryScheduleListAll()
    this.getOptions()
    this.getQuestionAsOption()
  },
  methods: {
    getQuestionAsOption() {
      questionApi.getQuestionAsOption().then(res => {
        if(res.data.code === 200) {
          this.themes = res.data.data.list
          // console.log(this.themes)
        }
      })
    },
    change(e) {
      this.options.forEach(element => {
        if(e === element.id) {
          this.scheduleForm.formula = element.formula
          this.scheduleForm.groupType = element.type
        }
      })
      if(this.scheduleForm.groupType === 0) {
        this.isRandom = true
      }
      // console.log(this.scheduleForm)
    },
    getOptions(){
      groupApi.getFormDataListPage(1,100,null).then(res => {
        if(res.data.code === 200) {
          this.options = res.data.data.rows
          // console.log(this.options)
        }
      })
    },
    toEditSchedule() {
      scheduleApi.querySchedule(this.selectScheduleForm.id).then(res => {
        // console.log(res.data.data.schedule)
        if(res.data.code === 200) {
          console.log(res.data.data.schedule)
          this.dialogVisibleSchedule = true
          this.scheduleDetailsAll = res.data.data.schedule
          this.questionDetails = JSON.parse(this.scheduleDetailsAll.details)
        }
      })
    },
    editSchedule() {
      this.dialogVisibleSchedule = false
    },
    viewSchedule() {
      this.scheduleForm = {}
      this.dialogVisible = true
      this.scheduleForm.scheduleDate = this.form.kssj
      if(this.form.isRest) {
        this.scheduleForm.isRest = this.form.isRest
      } else {
        this.scheduleForm.isRest = 0
      }
      if(this.form.jqmc) {
        this.scheduleForm.special = this.form.jqmc
      } else {
        this.scheduleForm.special = '普通日'
      }
    },
    addSchedule() {
      scheduleApi.addSchedule(this.scheduleForm).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.selectScheduleForm = res.data.data.schedule
          this.dialogVisible = false
        }
      })
    },
    /** 查询节假日管理 - 法定节假日列表 */
    getList() {
      this.loading = true;
      getSpecialDay(this.queryParams).then(response => {
        // console.log(response.data.data.resultList)
        this.rqi = []
        this.rqineirong = {}
        for(let i=0; i<response.data.data.resultList.length; i++){
          for(var key in response.data.data.resultList[i]){
            this.rqi.push(key)
            this.rqineirong[key] = response.data.data.resultList[i][key]
          }
        }
        // console.log(this.rqi)
         console.log(this.rqineirong)
      })
    },
    queryScheduleListAll() {
      scheduleApi.queryScheduleListAll().then(res => {
        this.schedule = []
        this.scheduleDetails = {}
        for(let i=0; i<res.data.data.list.length; i++){
          for(var key in res.data.data.list[i]){
            this.schedule.push(key)
            this.scheduleDetails[key] = res.data.data.list[i][key]
          }
        }
        console.log(this.schedule)
      })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        jqmc: undefined,
        kssj: undefined,
        jssj: undefined,
        lx: undefined
      };
      // this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery(day) {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            update(this.form).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.open = false
                this.reset()
                this.getList()
              }
            })
          } else {
            add(this.form).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.open = false
                this.reset()
                this.getList()
              }
            });
          }
        }
      });
    },
    /** 编辑日期操作 */
    handleBianJi(day) {
      if(this.rqineirong[day]){
        console.log(this.rqineirong[day])
        this.form = this.rqineirong[day]
        this.title = '编辑特殊日'
      }else{
        let obj = {}
        obj.kssj = day.valueOf()
        obj.jssj = day.valueOf()
        this.form = obj
        this.form = obj
        this.title = '新增特殊日'
      }
      this.open = true
      if(this.scheduleDetails[day]){
        this.selectScheduleForm = this.scheduleDetails[day]
      } else {
        this.selectScheduleForm = {}
      }
    },
    deleteForm(){
      let ids = [];
      ids.push(this.form.id)
      deleteSpecialDay(ids).then(res => {
        if (res.data.code === 200) {
          this.msgSuccess("删除成功")
          this.open = false
          this.reset()
          this.getList()
        }
      });
    }
  }
};
</script>
<style scoped>
  .is-selected {
    color: lightseagreen;
    /* background: rgba(32, 178, 171, 0.305); */
  }
  .app-container {
    margin: 7px;
  }
  #dateCell {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
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
