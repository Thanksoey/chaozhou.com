<script setup>
import { useMessage } from 'naive-ui'
import { toArray } from 'lodash';
import { onMounted, reactive, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { NForm, NFormItem, NInput, NButton } from 'naive-ui';
import { useClearInputValue } from '@/use/inoputValueClear'
import { useUser } from '@/use/useUser';
window.$message = useMessage()
const {
    rules, loading,
    loginFormRef, loginModel,
    confirmPasswordRef, registerFormRef, registerModel,
    buttonClick, handlePasswordInput
} = useUser()
const router = useRouter()
defineProps({
    nameToChild: String
})
const sign = reactive({})
const getSignAll = (el, item) => {
    if (el) {
        sign[item] = el
    }
}
const container = ref(null)

const emit = defineEmits(['changePath'])
onBeforeRouteLeave((to, from, next) => {
    router.options.routes.forEach(el => {
        if (el.path == to.path && from.path == '/sign') {
            emit("changePath", {
                path: el.path,
                bgColor: el.meta.bgColor,
                name: el.name
            })
        }
    })
    next()
})

const formToggle = ref(true)
function toActive() {
    if (toArray(container.value.classList).includes("active")) {
        loginModel.value.username = null
        loginModel.value.password = null
        formToggle.value = false
    } else {
        registerModel.value.username = null
        registerModel.value.password = null
        registerModel.value.confirmPassword = null
        formToggle.value = true
    }
}

onMounted(() => {
    toActive()
    toArray(sign).forEach((el, index) => {
        el.addEventListener('click', () => {
            container.value.classList.toggle("active")
            toActive()
        })
    })
})
</script>

<template>
    <div ref="container" :class="['container', nameToChild == 'signup' ? 'active' : '']">
        <div class="back" @click="router.options.history.go(-1)">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <path d="M9 11l-4 4l4 4m-4-4h11a4 4 0 0 0 0-8h-1" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>
            <span>BACK</span>
        </div>
        <div class="user signinBx">
            <div class="imgBx">
                <span :ref="(el) => getSignAll(el, 0)">
                    <n-button size="large" round color="#677eff" class="signup">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 24 24">
                                <path
                                    d="M3 5v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5a2 2 0 0 0-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>
                        <span>注册</span>
                    </n-button>
                </span>
            </div>
            <div class="formBx">
                <template v-if="formToggle">
                    <n-form name="login" ref="loginFormRef" :model="loginModel" :rules="rules.login"
                        label-placement="left" label-width="auto" label-align="right">
                        <h2>用户登录</h2>
                        <n-form-item path="username">
                            <n-input name="loginusername" clearable
                                :input-props="{ name: 'loginusername', autocomplete: 'off' }" show-count
                                :loading="loading" v-model:value="loginModel.username" placeholder="请输入用户名"
                                @keydown.enter.prevent
                                @input="loginModel.username = useClearInputValue(loginModel.username)">
                                <template #prefix>
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512">
                                        <path
                                            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                                <template #clear-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input name="loginPassword" :input-props="{ name: 'loginPassword', autocomplete: 'off' }"
                                clearable show-password-on="mousedown" :minlength="10" :maxlength="20"
                                :loading="loading" v-model:value="loginModel.password"
                                @input="loginModel.password = useClearInputValue(loginModel.password)"
                                placeholder="请输入密码" type="password" @keydown.enter.prevent>
                                <template #prefix>
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512">
                                        <path
                                            d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                                <template #clear-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-button color="#677eff" :disabled="!loginModel.username || !loginModel.password"
                            @click.prevent="buttonClick(loginFormRef)">
                            登录
                        </n-button>
                    </n-form>
                </template>
            </div>
        </div>
        <div class="user signupBx">
            <div class="formBx">
                <template v-if="!formToggle">
                    <n-form name="register" ref="registerFormRef" :model="registerModel" :rules="rules.register"
                        label-placement="left" label-width="auto" label-align="right">
                        <h2>新用户注册</h2>
                        <n-form-item path="username">
                            <n-input :input-props="{ name: 'registerusername', autocomplete: 'off' }" clearable
                                show-count :minlength="8" :maxlength="16" :loading="loading"
                                v-model:value="registerModel.username" placeholder="请输入用户名" @keydown.enter.prevent
                                @input="registerModel.username = useClearInputValue(registerModel.username)">
                                <template #prefix>
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512">
                                        <path
                                            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                                <template #clear-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input :input-props="{ name: 'registerPassword', autocomplete: 'off' }" clearable
                                show-password-on="mousedown" :minlength="10" :maxlength="20" :loading="loading"
                                v-model:value="registerModel.password" @input="handlePasswordInput" placeholder="请输入密码"
                                type="password" @keydown.enter.prevent>
                                <template #prefix>
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512">
                                        <path
                                            d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                                <template #clear-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item first ref="confirmPasswordRef" path="confirmPassword">
                            <n-input :input-props="{ name: 'registerConfirmPassword', autocomplete: 'off' }" clearable
                                show-password-on="mousedown" :minlength="10" :maxlength="20" :loading="loading"
                                v-model:value="registerModel.confirmPassword"
                                @input="registerModel.confirmPassword = useClearInputValue(registerModel.confirmPassword)"
                                placeholder="请再次输入密码" type="password" @keydown.enter.prevent>
                                <template #prefix>
                                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512">
                                        <path
                                            d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                                <template #clear-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59z"
                                            fill="currentColor"></path>
                                    </svg>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-button color="#677eff"
                            :disabled="!registerModel.username || !registerModel.password || !registerModel.confirmPassword"
                            @click.prevent="buttonClick(registerFormRef)">
                            注册
                        </n-button>
                    </n-form>
                </template>
            </div>
            <div class="imgBx">
                <span :ref="(el) => getSignAll(el, 1)">
                    <n-button size="large" round color="#677eff" class="signin">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512 512">
                                <path
                                    d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>
                        <span>登录</span>
                    </n-button>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.container {
    position: relative;
    width: 800px;
    height: 500px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 15px 100px rgba(0, 0, 0, .1);
    overflow: hidden;
}

.container .back {
    cursor: pointer;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 100;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 0 5px 3px 0;
    background: linear-gradient(to right, #555, #333) no-repeat right bottom;
    background-size: 0 3px;
    transition:
        background-size .3s ease,
        transform .3s ease,
        padding-bottom .3s ease;
}

.container .back:hover {
    transform: translateY(-2px);
    padding-bottom: 5px;
    background-position-x: left;
    background-size: 100% 3px;
}

.container .back span:first-child {
    width: 24px;
}

.container .back span {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container .user {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.container .user .imgBx {
    position: relative;
    width: 50%;
    height: 100%;
    transition: .4s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container .user .imgBx .signup,
.container .user .imgBx .signin {
    letter-spacing: 1px;
    font-weight: 300;
    width: auto;
    z-index: 2;
}

.container .user .imgBx:hover::after {
    filter: blur(5px);
}

.container .user .imgBx .signup span:first-child,
.container .user .imgBx .signin span:first-child {
    width: 20px;
    padding-top: 1px;
    margin-right: 5px;
}

.container .user .imgBx::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/view5.jpg') no-repeat center center;
    filter: blur(0);
    z-index: 1;
    transition: .4s ease;
    animation: imageMove 10s infinite;
}

@keyframes imageMove {
    0% {
        background-position-x: left;
    }

    50% {
        background-position-x: right;
    }

    100% {
        background-position-x: left;
    }
}

.container .user .formBx {
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    box-sizing: border-box;
    transition: .4s ease;
}

.container .user .formBx form {
    width: 100%;
}

.container .user .formBx h2 {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 2px;
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
    color: #555;
}

.container .signupBx {
    pointer-events: none;
}

.container.active .signupBx {
    pointer-events: initial;
}

.container .signupBx .formBx {
    left: 100%;
}

.container.active .signupBx .formBx {
    left: 0;
}

.container .signupBx .imgBx {
    left: -100%;
}

.container.active .signupBx .imgBx {
    left: 0;
}

.container .signinBx .formBx {
    left: 0;
}

.container.active .signinBx .formBx {
    left: 100%;
}

.container .signinBx .imgBx {
    left: 0;
}

.container.active .signinBx .imgBx {
    left: -100%;
}

@media (max-width: 991px) {
    .container {
        max-width: 400px;
    }

    .container .imgBx {
        display: none;
    }

    .container .user .formBx {
        width: 100%;
    }
}
</style>