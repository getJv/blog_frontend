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
      component: PostForm,
      beforeEnter: requireAuth
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post
    },
    
  ]
});

import auth from "@/services/auth";

function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      
    } else {
      
      next()
    }
}
