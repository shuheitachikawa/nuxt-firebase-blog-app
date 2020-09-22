import axios from 'axios'

export const state = function(){
  return {
    isLoggedIn: false,
    user: null
  }
};

export const getters = {
  isLoggedIn: function(state){
    return state.isLoggedIn;
  },
  user: function(state){
    return state.user;
  }
  // user: (state) => state.user,
}

export const mutations = {
  setUser(state,  {user} ) {
    state.user = user.data;
    //console.log(state.user);
    state.isLoggedIn = true;
  }
}

export const actions = {
  async login({ commit }, { id }) {
    //console.log(id);
    const user= await axios.get(`https://nuxt-blog-bubekiti.firebaseio.com/users/${id}.json`)
    if(!user.data.id) throw new Error('Invalid user!!')
    commit('setUser', { user })
  },
  async register({ commit }, { id }) {
    const payload = {};
    payload[id] =  { id };
    // console.log({id})
    // console.log(payload)
    await axios.patch(`https://nuxt-blog-bubekiti.firebaseio.com/users.json`, payload);
    const user = await axios.get(`https://nuxt-blog-bubekiti.firebaseio.com/users/${id}.json`);
    if(!user.data.id) throw new Error('Invalid user!!!');
    commit('setUser',  {user} );
  }
}