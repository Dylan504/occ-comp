<template>
  <section>
    <!--工具条-->
    <el-row :gutter="20" class="queryForm">
      <el-form ref="form" :model="form" label-width="120px" label-position="right">
        <template v-for="(queryCol,idx) in pageDef.queryDef.queryCols">
          <el-col :span="24/pageDef.queryDef.columnNum">
            <template v-if="queryCol.inputType==='select'">
              <el-form-item :label="queryCol.label">
                <el-select clearable v-model="form[queryCol.modelName]">
                  <el-option v-for="(value,key) in getEnums(queryCol.enumType)" :key="key" :label="value" :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
            <template v-else-if="queryCol.inputType==='date'">
              <el-form-item :label="queryCol.label">
                <el-date-picker v-model="form[queryCol.modelName]" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
            <template v-else-if="queryCol.inputType==='datetime'">
              <el-form-item :label="queryCol.label">
                <el-date-picker v-model="form[queryCol.modelName]" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </template>
            <template v-else-if="queryCol.inputType==='test'">
              <el-form-item :label="queryCol.label">
                <OccDate :value.sync='form.testdate'></OccDate>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item :label="queryCol.label">
                <el-input v-model="form[queryCol.modelName]"></el-input>
              </el-form-item>
            </template>
          </el-col>
          <!-- </template> -->
        </template>
        <!--end queryCols-->
      </el-form>
    </el-row>
    <!-- 查询 -->
    <el-row align="middle">
      <el-col :span="6" :offset="10">
        <el-button size="medium" type="primary" @click="doQuery">查询</el-button>
        <el-button size="medium" type="primary" @click="doReset">重置</el-button>
      </el-col>
    </el-row>
    <!-- 列表按钮 -->
    <el-row>
      <el-button v-for="button in pageDef.buttons" @click="doClick(button.funcName)" style="margin-left: 10px;" type="primary" size="mini">
        {{button.label}}
      </el-button>
      <!-- <el-button size="mini" class="filter-item" style="margin-left: 10px;" @click="doClick" type="primary" icon="el-icon-edit">新增</el-button> -->
    </el-row>
    <!--列表-->
    <el-table :data="entity.datas" highlight-current-row v-loading="listLoading">
      <el-table-column v-if="pageDef.tabDef.isSelect" type="selection" width="55">
      </el-table-column>
      <el-table-column v-if="pageDef.tabDef.isIndex" label="编号" type="index" width="60">
      </el-table-column>
      <template v-for="tabCol in pageDef.tabDef.tabCols">
        <!-- 是否排序 -->
        <template v-if="tabCol.isSort">
          <!-- 是否需要格式化 -->
          <template v-if="tabCol.isFormat">
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" sortable :formatter="formatVal">
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" sortable>
            </el-table-column>
          </template>
        </template>
        <template v-else>
          <template v-if="tabCol.isFormat">
            <el-table-column :label="tabCol.label" :prop="tabCol.prop" :formatter="formatVal">
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column :label="tabCol.label" :prop="tabCol.prop">
            </el-table-column>
          </template>
        </template>
      </template>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button type="primary" size="small" @click="doEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="doDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination background @size-change="doSizeChange" @current-change="doCurrentChange" :current-page.sync="listQuery.pageJump" :page-sizes="[2,4,6,8]" :page-size="listQuery.recInPage" layout="total, sizes, prev, pager, next, jumper" :total="totalRec">
      </el-pagination>
    </div>
  </section>
</template>
<script>
import { formatter, getEnumObj } from "@/utils/formatter"
import OccDate from "./OccDate"
export default {
  name: 'OccSingleTable',
  components:{
    OccDate
  },
  props: {
    pageDef: {
      type: Object,
      required: true
    },
    dataList: Array,
    entity: Object
  },
  data() {
    return {
      listLoading: false,
      //分页查询参数
      form: {testdate:'20171212000000'},
      listQuery: {
        pageJump: 1, //多页查询跳转页码
        recInPage: 2, //多页查询每页笔数
        //查询条件
        queryParam: {

        }
      }
    }
  },
  created() {
    this.doPageQuery()
  },
  computed: {
    //分页查询总笔数
    totalRec: function() {
      return this.entity.totalRec
    }
  },
  methods: {
    //格式化表格字段
    formatVal(row, column, cellValue) {
      console.log("format column " + column.property)
      return formatter(column.property, cellValue)
    },

    getEnums(enumType) {
      return getEnumObj(enumType)
    },

    //子组件按钮事件
    doClick(funcName) {
      alert("click from child")
      this.$emit(funcName)
    },

    //带查询条件的查询
    doQuery() {
      console.log("query with conditions...");
      console.log(this.form)
      this.listQuery.queryParam = this.form
      console.log(this.listQuery)
    },

    //重置
    doReset() {
      this.form = {}
    },

    doPageQuery() {
      this.listLoading = true
      this.$emit('pageQuery', this.listQuery)
      this.listLoading = false
    },

    //查询每页笔数变化事件
    doSizeChange(val) {
      this.listQuery.recInPage = val
      this.doPageQuery()
    },

    //页码变化事件
    doCurrentChange(val) {
      this.listQuery.pageJump = val
      this.doPageQuery()
    },

    //编辑
    doEdit(index, row) {
      this.$emit('doEdit', row);
    },

    //删除
    doDelete(index, row) {
      this.$emit('doDelete', row);
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-main {
  background-color: #409EFF;
  text-align: center;
}

.queryForm {
  margin-top: 20px;
  margin-right: 20px
}

.el-input {
  width: 80%;
}

.el-select {
  width: 80%;
}

</style>
