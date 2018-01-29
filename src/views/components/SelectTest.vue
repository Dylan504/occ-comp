<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名选择" prop="typeId">
        <el-select v-model="form.typeId" placeholder="请选择" @change="change">
          <el-option v-for="item in items" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add()">新增</el-button>
        <el-button type="primary" @click="edit()">编辑</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        typeId: ''
      },
      items: [],
      datas: [{ name: "senbo", id: '1' }, { name: "muse", id: '2' }, { name: "bobo", id: '3' }]
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      this.items = this.datas;

    },
    add: function() {
      this.form.typeId = "";
    },
    cancel() {
      this.form.typeId = "";
    },
    change: function() {
      console.log(this.form.typeId)
    },
    edit: function() {
      this.form.typeId = "1";
    }
  }
}

</script>
