<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
const router = useRouter()
router.options.routes.sort((a, b) => {
    if (a.meta.weight < b.meta.weight) {
        return -1
    }
    if (a.meta.weight > b.meta.weight) {
        return 1
    }
})
const pathModel = ref(null)

const emit = defineEmits(['changePath'])

const FetchToken = ref(null)
function handleLogout() {
    localStorage.removeItem('token');
    FetchToken.value = null;
}
onMounted(() => {
    // 获取token
    const token = localStorage.getItem('token')
    // 解析token
    if (token) {
        FetchToken.value = JSON.parse(atob(token.split('.')[1]))
    }
    pathModel.value = (val) => {
        emit('changePath', {
            path: val.path,
            bgColor: val.bgColor,
            name: val.name
        })
    }
})
</script>

<template>
    <header class="container">
        <div class="logo">
            <img src="@/assets/logo.png" alt="" />
        </div>
        <nav>
            <ul>
                <li v-for="routes in router.options.routes" v-show="routes.name != 'sign'">
                    <RouterLink :to="routes.path"
                        @click="pathModel({ path: routes.path, bgColor: routes.meta.bgColor, name: routes.name })">
                        {{ routes.meta.title }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
        <div class="sign">
            <template v-if="!FetchToken">
                <RouterLink to="/sign" @click="pathModel({ path: '/sign', bgColor: '', name: 'signin' })">登录
                </RouterLink>
                丨
                <RouterLink to="/sign" @click="pathModel({ path: '/sign', bgColor: '', name: 'signup' })">注册
                </RouterLink>
            </template>
            <template v-else>
                <span>{{ FetchToken.username }}</span>
                丨
                <span class="logout" @click="handleLogout">退出</span>
            </template>
        </div>

    </header>
</template>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    background: #fff;
    width: 100%;
    gap: 3rem;
    z-index: 1000;
}

header::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    display: block;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, #02bf83, #005f6b);
    filter: blur(5px);
}

header .logo {
    width: 5%;
}

header nav {
    display: flex;
    align-items: center;
}

header nav ul {
    position: relative;
    display: flex;
    gap: 3rem;
}

header nav ul li a {
    display: block;
    text-align: center;
    padding: 10px;
    background: linear-gradient(to right, #cdffd8, #94b9ff) no-repeat right bottom;
    background-size: 0 4px;
    transition:
        background-size .4s ease,
        color .3s ease;
}

header nav ul li a:hover {
    background-size: 100% 4px;
    background-position-x: left;
    color: #02bf83;
}

header .sign {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1 1 0%;
}

header .sign a,
.sign span {
    font-weight: bold;
    font-size: 18px;
    transition: color .3s ease;
}

.logout {
    cursor: pointer;
    transition: color .3s ease;
}

.logout:hover,
header .sign a:hover {
    color: #02bf83;
}
</style>
