import { ref } from 'vue';
import { debounce } from 'lodash';
import { useClearInputValue } from '@/use/inoputValueClear'
import { Login as LoginApi, Register as RegisterApi } from '@/services/api/user'
import router from '@/router/index'
export const useUser = () => {
    const loading = ref(undefined)
    const rules = {
        login: {
            username: [
                {
                    required: true,
                    message: "用户名不能为空",
                    trigger: ["input", "blur"]
                }
            ],
            password: [
                {
                    required: true,
                    message: "密码不能为空",
                    trigger: ["input", "blur"]
                },
            ]
        },
        register: {
            username: [
                {
                    required: true,
                    validator: (rule, value) => {
                        if (!value) {
                            return new Error("用户名不能为空");
                        } else if (value.length > 16 || value.length < 8) {
                            return new Error("用户名长度为8~16位");
                        }
                        return true;
                    },
                    trigger: ["input", "blur"]
                }
            ],
            password: [
                {
                    required: true,
                    validator: (rule, value) => {
                        if (!value) {
                            return new Error("密码不能为空");
                        } else if (/(\w)*(\w)\2{2}(\w)*/g.test(value)) {
                            return new Error("相同字符不能连续重复超过3个或以上");
                        } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9_]{10,20}/.test(value)) {
                            return new Error("密码必须为10~20位且必须包含数字和字母");
                        }
                        return true;
                    },
                    trigger: ["input", "blur"]
                },
            ],
            confirmPassword: [
                {
                    required: true,
                    message: "请再次输入密码",
                    trigger: ["input", "blur"]
                },
                {
                    validator: (rule, value) => {
                        return !!registerModel.value.password && registerModel.value.password.startsWith(value) && registerModel.value.password.length >= value.length
                    },
                    message: "两次密码输入不一致",
                    trigger: "input"
                },
                {
                    validator: (rule, value) => {
                        return value === registerModel.value.password
                    },
                    message: "两次密码输入不一致",
                    trigger: ["blur", "password-input"]
                }
            ]
        }
    };

    const loginFormRef = ref(null)
    const loginModel = ref({
        username: null,
        password: null
    })

    const confirmPasswordRef = ref(null)
    const registerFormRef = ref(null)
    const registerModel = ref({
        username: null,
        password: null,
        confirmPassword: null
    })

    const buttonClick = debounce((val) => {
        loading.value = true
        // 表单验证
        val?.validate(async (errors) => {
            if (!errors) {
                if (val.$attrs.name === "login") {
                    // 登录接口请求
                    await LoginApi(loginModel.value).then(res => {
                        loading.value = undefined
                        // 登录成功后，将token存入localStorage并跳转到首页
                        if (res.code === 200) {
                            localStorage.setItem("token", res.data);
                            window.$message.success("登录成功");
                            loginModel.value.username = null
                            loginModel.value.password = null
                            // 重置表单
                            loginFormRef.value.resetFields()
                            router.push("/");
                        } else {
                            window.$message.error(res.msg);
                        }
                    }).catch(error => { loading.value = undefined });
                } else if (val.$attrs.name === "register") {
                    // 注册接口请求
                    delete registerModel.value.confirmPassword
                    await RegisterApi(registerModel.value).then(res => {
                        loading.value = undefined
                        // 注册成功
                        if (res.code === 200) {
                            window.$message.success("注册成功，请登录");
                            registerModel.value.username = null
                            registerModel.value.password = null
                            registerModel.value.confirmPassword = null
                            // 重置表单
                            registerFormRef.value.resetFields()
                        } else {
                            window.$message.error(res.msg);
                        }
                    }).catch(error => { loading.value = undefined });
                }
            } else {
                // 表单内容格式有误
                loading.value = undefined
                window.$message.error("表单内容格式有误，请检查");
            }
        }).catch(error => { loading.value = undefined });
    }, 200)

    const handlePasswordInput = () => {
        registerModel.value.password = useClearInputValue(registerModel.value.password)
        if (registerModel.value.confirmPassword) {
            confirmPasswordRef.value?.validate({ trigger: "password-input" }).catch(error => { });
        }
    }


    return {
        rules,
        loading,
        buttonClick,

        loginFormRef,
        loginModel,

        confirmPasswordRef,
        registerFormRef,
        registerModel,
        handlePasswordInput
    }
}