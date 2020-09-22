<template>
  <section class="container posts-page">
    <el-card style="flex:1">
      <div class="clearfix" slot="header">
        <el-input placeholder="タイトルを入力" v-model="formData.title"></el-input>
      </div>
      <div class="">
        <el-input placeholder="本文を入力" type="textarea" rows="15" v-model="formData.body"></el-input>
      </div>
      <div class="text-right" style="margin-top:16px;">
        <el-button type="primary" v-on:click="publish" round>
          <span class="el-icon-upload2"></span>
          <span>Publish</span>
        </el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  asyncData({ redirect, store }){
    if(!store.getters['user']){
      redirect('/')
    }
    return {
      formData: {
        title: '',
        body: '',
      }
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    async publish(){
      const payload = {
        user: this.user,
        ...this.formData,
      }
      //console.log(payload);
      await this.publishPost({payload});
      this.$router.push('/posts');
    },
    ...mapActions('user', ['updataUser']),
    ...mapActions('posts', ['publishPost'])
  }
}
</script>
<style>
.posts-page .el-table__row{
  cursor: pointer;
}
</style>
