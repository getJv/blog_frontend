import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import PostForm from '@/views/PostForm'
import Post from '@/views/Post'
import Login from '@/views/Login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post-form',
      name: 'post-form',
      component: PostForm
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    
  ]
})
