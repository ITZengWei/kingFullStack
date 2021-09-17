import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: Main,
	  children: [
		  {
			  path: '/home',
			  name: 'home',
			  component: Home,
		  },
		  {
			  path: '/article/:id',
			  name: 'articleDesc',
			  component: Article,
			  props: true
		  }
	  ]
  },
	{
		path: '/heroes/:id',
		name: 'heroDesc',
		component: Hero,
		props: true
	},
]

const router = new VueRouter({
  routes
})

export default router
