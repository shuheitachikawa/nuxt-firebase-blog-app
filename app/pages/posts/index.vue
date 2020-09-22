<template>
  <section class="container posts-page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>新着投稿</span>
      </div>
      <el-table 
        v-bind:data="showPosts"
        style="width:100%;"
        class="table"
        v-on:row-click="handleClick"
      >
        <el-table-column
          prop="title"
          label="タイトル">
        </el-table-column>
        <el-table-column
          prop="user.id"
          label="投稿者"
          width="180">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="投稿日時"
          width="240">
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ store }){
    await store.dispatch('posts/fetchPosts')
    //console.log(store);
  },
  computed: {
    showPosts(){
      return this.posts.map(post => {
        post.created_at = '20/12/27';
        return post;
      })
    },
    ...mapGetters('posts', ['posts'])
  },

  methods: {
    handleClick(post){
      this.$router.push(`/posts/${post.id}`)
    }
  }
  
}
</script>
<style>
.posts-page .el-table__row{
  cursor: pointer;
}
</style>
