<template>
  <section class="container">
    <el-card style='flex:1;'>
      <div slot="header" class="clearfix">
        <span>ログイン</span>
      </div>
      <form action="">
        <div class="form-content">
          <span>ユーザーID</span>
          <el-input placeholder="user id" v-model="formData.id"></el-input>
        </div>
        <div class="form-content">
          <span>パスワード</span>
          <el-input placeholder="no need" v-model="formData.pass"></el-input>
        </div>
        <div class="form-content">
          <el-checkbox v-model="isCreateMode">アカウントを作成する</el-checkbox>
        </div>
        <div class="text-right">
          <el-button type="primary" v-on:click="handleClickSbmit">{{buttonText}}</el-button>
        </div>
      </form>
    </el-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'universal-cookie'

// const test = {
//   id:1
// };

// console.log(test);
// console.log({test});
// console.log({...test});

//console.log(cookies);

export default {
  asyncData({ redirect, store }){
    if(store.getters['user']) {
      redirect('/posts/')
    }
    return{
      isCreateMode: false,
      formData: {
        id: "",
        pass: "aaa"
      }
    }
  },

  computed: {
    buttonText(){
       return this.isCreateMode ? '新規登録' : 'ログイン'
    },
    ...mapGetters(['user'])
  },

  methods: {
    async handleClickSbmit() {
      const cookies = new Cookies();
      if (this.isCreateMode) {
        try {
          // console.log({ ...this.formData})
          // console.log(this.formData)
          // console.log(formData2)
          await this.register({ ...this.formData})
          this.$notify({
            type: 'success',
            title: 'アカウント作成完了',
            message: `${this.formData.id}として登録しました。`,
            position: 'button-right',
            duration: 1000
          });
          //console.log('this.user:'+this.user.id);
          cookies.set('user', JSON.stringify(this.user));
          //console.log(cookies);
          console.log(cookies);
          this.$router.push('/posts/');
        } catch(e)  {
          console.log(e.message);
          this.$notify.error({
            title: 'アカウント作成失敗',
            message: 'すでに登録されているか、不正なユーザーIDです。',
            position: 'bottom-right',
            duration: 1000
          })
        }
      } else{
        try {
          await this.login({ ...this.formData })
          this.$notify({
            type: 'success',
            title: 'ログイン成功',
            message: `${this.formData.id}としてログインしました。`,
            position: 'button-right',
            duration: 1000
          })
          cookies.set('user', JSON.stringify(this.user));
          console.log(cookies);
          this.$router.push('/posts/')
        } catch(e) {
          console.log(e.message);
          this.$notify.error({
            title: 'ログイン失敗',
            message: '不正なユーザーIDです。',
            position: 'bottom-right',
            duration: 1000
          })
        }
      }
    },
    ...mapActions(['login', 'register'])
  }
}
</script>

<style>
.form-content{
  margin: 16px 0;
}
</style>
