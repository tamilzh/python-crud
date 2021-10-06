const routes=[
    {path:'/home',component:home},
    {path:'/customers',component:customers}
]

const router=new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')