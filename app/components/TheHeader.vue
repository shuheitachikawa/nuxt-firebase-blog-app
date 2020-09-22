<template>
  <el-menu mode="horizontal" v-bind:router="true">
    <el-menu-item index="1" style="pointer-events:none;">
      Nuxt daialy app
    </el-menu-item>
    <el-menu-item index="2" v-bind:route="{path: '/posts/'}">
      <nuxt-link to="/posts/">
        投稿一覧
      </nuxt-link>
    </el-menu-item>
    <no-ssr>
      <el-menu-item index="3" style="float:right;" v-bind:route="{path: '/'}">
        <nuxt-link :to="{ path: `/users/${user.id}`}" v-if="user">
          <span>{{user.id}}</span>
        </nuxt-link>
      </el-menu-item>
      <el-menu-item index="4" style="float:right;" v-bind:route="{path: '/'}">
        <nuxt-link to="/">
          <span>ログイン</span>
        </nuxt-link>
      </el-menu-item>
    </no-ssr>
    <el-menu-item index="5" style="float:right;" v-bind:route="{path: '/posts/new'}">
      <nuxt-link to="/posts/new">
        新規投稿
      </nuxt-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
