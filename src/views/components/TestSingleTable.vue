<template>
  <occ-single-table  
   :pageDef="pageDef"
   :entity="entity"
   @pageQuery="doPageQuery" @create="create" @audit="audit">
   </occ-single-table>
</template>

<script>
  import OccSingleTable from "./SingleTable"

  import {getUserList,getUserListByPage} from "@/api/query"

  export  default {
    data() {
      return {
        entity:{},
        pageDef: {
          //查询条件定义
          queryDef:{
              columnNum:2, //一行几列
              queryCols:[
                {label:"姓名",inputType:"input",modelName:"name"},
                {label:"性别",inputType:"select",modelName:"sex",enumType:"sex"},
                {label:"日期",inputType:"date",modelName:"date"},
                {label:"日期时间",inputType:"datetime",modelName:"datetime"},
                {label:"日期时间测试",inputType:"test",modelName:"testdate"}
              ]
          },
          tabDef: {
            isSelect: true, //是否可以多选
            isIndex: true,  //是否有序号
            //表格字段定义
            tabCols: [
              {label: "姓名", prop:"name", isSort: true},
              {label: "性别", prop:"sex", isSort: false,isFormat:true},
              {label: "年龄", prop:"age", isSort: true},
              {label: "生日", prop:"birthday", isSort: true},
              {label: "地址", prop:"address", isSort: true}
            ]
          },
          buttons:[
            {label:"新增",funcName:"create"},
            {label:"审核",funcName:"audit"}
          ]
        }
      }
    },

    components: {
      OccSingleTable
    },

    methods:{
      doPageQuery(listQuery){
        getUserListByPage(listQuery).then(response => {
          this.entity = response.data.entity
        })
      },

      create(){
        alert("create")
      },

      audit(){
        alert("audit")
      }

    }
  }
</script>
