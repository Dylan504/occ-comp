<template>
  <occ-form-page :pageDef="pageDef" :formData="formData">
    <el-form-item slot="addr" label="地址">
      <el-select v-model="formData.value9" @change="selectChange" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </occ-form-page>
</template>
<script>
import OccFormPage from "./FormPage"
export default {
  components: {
    OccFormPage
  },
  data() {
    return {
      refObj: {
        addrList: []
      },
      pageDef: {
        columnNum: 2, //一行几列
        pageCols: [
          { label: "姓名", inputType: "input", modelName: "name" },
          { label: "地址", inputType: "refType", refList: "addrList", refMethod: "queryRefList", modelName: "addr", placeholder: "请输入地址" },
          { label: "性别", inputType: "select", modelName: "sex", enumType: "sex" },
          { label: "日期", inputType: "date", modelName: "date" },
          { label: "日期时间", inputType: "datetime", modelName: "datetime" },
          

        ]
      },
      form: {},
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
      ],
      formData:{"value9":''}
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    queryRefList() {
      return []
    },

    remoteMethod(query) {
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
    selectChange(val){
        console.log(val)
    }
  }
}

</script>
<style>
.el-select {
  width: 80%;
}
</style>
