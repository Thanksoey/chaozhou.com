import { createRouter, createWebHistory } from "vue-router";

const pages = import.meta.glob('../views/**/page.js', {
    eager: true,
    import: 'default',
});
const pageComps = import.meta.glob('../views/**/index.vue');

const routes = Object.entries(pages).map(([path, meta]) => {
    const pageJSPath = path;
    path = path.replace('../views', '').replace('/page.js', '');
    path = path || '/';
    const name = path.split('/').filter(Boolean).join('-') ||
        'index';
    const comPath = pageJSPath.replace('page.js', 'index.vue');
    return {
        path,
        name,
        component: pageComps[comPath],
        meta,
    };
});

const hash = createWebHistory()
const router = createRouter({
    history: hash,
    routes
})

router.beforeEach((to, from, next) => {
    // 判断是否需要登录
    if (to.path === '/sign') {
        // 已登录，禁止访问登录页面
        if (localStorage.getItem('token')) {
            confirm('您已登录，无需再次登录')
            next('/')
        } else {
            next()
        }
    }
    // 路由发生变化时，将页面标题设置为对应页面的标题
    document.title = to.meta.title || 'NOT FOUND'
    next()
})

router.afterEach(() => {
    // 确保每次导航后页面滚动到顶部
    window.scrollTo(0, 0)
})

export default router