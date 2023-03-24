<template>
  <div class="app-container">
    <el-calendar>
      <template slot="dateCell" slot-scope="{date, data}">
        <div id="dateCell" :class="rqi.indexOf(data.day) > -1 ? 'is-selected' : ''" @click="handleBianJi(data.day)">
          <span style="width: 100%; color: #000;">{{ data.day.split('-').slice(1).join('-') }} </span>
          <span style="margin-right: 11px;">{{ rqi.indexOf(data.day) > -1 ? rqineirong[data.day].jqmc : ''}}</span>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="title == '编辑特殊日'" @click="deleteForm" :style="{ background: 'red',color:'white'}">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSpecialDay, deleteSpecialDay, add, update } from "@/api/holiday";

export default {
  jqmc: "Fdjjr",
  data() {
    return {
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
    // this.getDicts("jjr_fdjjr_lx").then(response => {
    //   this.jjrlxOptions = response.data;
    // });
  },
  methods: {
    /** 查询节假日管理 - 法定节假日列表 */
    getList() {
      this.loading = true;
      getSpecialDay(this.queryParams).then(response => {
        // console.log(response.data.data.resultList)
        this.rqi = [];
        this.rqineirong = {};
        for(let i=0;i<response.data.data.resultList.length;i++){
          for(var key in response.data.data.resultList[i]){
            this.rqi.push(key)
            this.rqineirong[key] = response.data.data.resultList[i][key]
          }
        }
        console.log(this.rqi)
      });
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
</style>
