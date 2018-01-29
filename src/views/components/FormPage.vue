<template>
  <section>
    <el-row :gutter="20" class="formPage">
      <el-form ref="pageForm" :model="form" label-width="120px" label-position="right">
        <template v-for="(col,idx) in pageDef.pageCols">
          <el-col :span="24/pageDef.columnNum" :key="idx">
            <template v-if="col.inputType==='select'">
              <el-form-item :label="col.label">
                <el-select clearable v-model="form[col.modelName]">
                  <el-option v-for="(value,key) in getEnums(col.enumType)" :key="key" :label="value" :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
            <template v-else-if="col.inputType==='date'">
              <el-form-item :label="col.label">
                <el-date-picker v-model="form[col.modelName]" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
            <template v-else-if="col.inputType==='datetime'">
              <el-form-item :label="col.label">
                <el-date-picker v-model="form[col.modelName]" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </template>
            <template v-else-if="col.inputType==='refType'">
              <slot :name="col.modelName"></slot>
              <!-- <el-form-item :label="col.label">
                <el-select v-model="value9" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod(val,col.label)" :loading="loading">
                  <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <!-- <el-autocomplete v-model="form[col.modelName]" :fetch-suggestions="querySearchAsync" @select="handleSelect(col.modelName)" placeholder="请输入内容">
              </el-autocomplete> -->
            </template>
            <template v-else>
              <el-form-item :label="col.label">
                <el-input v-model="form[col.modelName]"></el-input>
              </el-form-item>
            </template>
          </el-col>
          <!-- </template> -->
        </template>
        <!--end cols-->
      </el-form>
    </el-row>
    <el-row align="middle">
      <el-col :span="6" :offset="10">
        <el-button size="medium" type="primary" @click="doSave">保存</el-button>
        <el-button size="medium" type="primary" @click="doReset">重置</el-button>
        <el-button size="medium" type="primary" @click="doCancel">取消</el-button>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { getEnumObj } from "@/utils/formatter"
export default {
  props: {
    pageDef: {
      type: Object,
      required: true
    },
    formData:{
      type:Object
    }
  },
  data() {
    return {
      value9: [],
      form: {},
      refList: [],
      options4: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"
      ]
    }
  },

  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    getEnums(enumType) {
      return getEnumObj(enumType)
    },

    //queryString 为在框中输入的值  
    //callback 回调函数,将处理好的数据推回  
    querySearchAsync(queryString, callback) {
      var list = [{label:'111',value:'aa'}];
      callback(list)
      // //调用的后台接口  
      // let url = this.urlhead + 'logistics/customer/findbypinyin?PINYINFIELDNAME=' + queryString;
      // //从后台获取到对象数组  
      // axios.get(url).then((response) => {
      //   //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示  
      //   for (let i of response.data) {
      //     i.value = i.CUSTOMER_NAME; //将CUSTOMER_NAME作为value  
      //   }
      //   list = response.data;
      //   callback(list);
      // }).catch((error) => {
      //   console.log(error);
      // });
    },

    handleSelect(){

    },
    doReset() {
      this.form = {}
    },

    doSave() {
      Object.assign(this.form,this.formData)
      console.log(this.form)
    },

    doCancel() {

    },

    remoteMethod(query, label) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    },

    refQuery(val, name, refList) {
      // alert(val)
      // alert(name)
      // alert(refList)
      // this.form[refList]=[{value:'123',label:'测试'}]
      // alert((this.form[refList])[0].label)
      // alert(val);
      // alert(name);
    },

    getRefList(label) {
      return [{ value: '123' }, { label: '测试' }]
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.formPage {
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
