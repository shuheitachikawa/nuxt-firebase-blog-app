import axios from 'axios'

export const state = function(){
  return {
    posts: []
  }
};

export const getters = {
  posts: function(state){
    return state.posts
  }
};

export const mutations = {
  addPost(state, {post}){
    state.posts.push(post);
    //console.log(state.posts);
  },
  updatePost(state, {post}){
    state.posts = state.posts.map(function(p){
      p.id === post.id ? post : p
    })
  },
  clearPosts(state){
    state.posts = []
  }
};

export const actions = {
  async fetchPost({ commit }, { id }){
    const post = await axios.get(`https://nuxt-blog-bubekiti.firebaseio.com/posts/${id}.json`);
    commit('addPost', {
      post: {
        ...post.data,
        id
      }
    })
  },
  async fetchPosts({ commit }){
    const posts = await axios.get(`https://nuxt-blog-bubekiti.firebaseio.com/posts.json`);
    commit('clearPosts');
    Object.entries(posts.data)
      .reverse()
      .forEach(([id, content])=>{
        // console.log({...content})
        // console.log({content})
        commit('addPost', {
          post: {
            id,
            ...content
          }
        })
      }
      )
    //console.log('post+' + posts);
  },
  async publishPost({ commit }, { payload }){
    const user = await axios.get(`https://nuxt-blog-bubekiti.firebaseio.com/users/${payload.user.id}.json`);
    const post_id = (await axios.post(`https://nuxt-blog-bubekiti.firebaseio.com/posts.json`, payload)).data.name;
    const created_at = '12/27';
    const post = {id: post_id, ...payload, created_at};
    const putData = {id: post_id, ...payload, created_at}
    //console.log(putData)
    delete putData.user;
    await axios.put(`https://nuxt-blog-bubekiti.firebaseio.com/users/${user.data.id}/posts.json`, [
      ...(user.data.posts || []),
      putData
    ])
    commit('addPost', {post})
  }
}