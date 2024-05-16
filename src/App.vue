<script setup>
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { NMessageProvider, NInput, NButton, NGradientText, NPerformantEllipsis, NDivider } from 'naive-ui';
import { debounce } from 'lodash';
import { getComments, sendComment } from '@/services/api/comment'
const router = useRouter()
const path = ref('')
const view = ref(null)
const parentsPath = ref(null)
const parentsName = ref(null)

const comment = ref(null)
const commentsAreaData = ref(null)
const handleCommentBtnToggle = debounce(async () => {
    comment.value.classList.add('active')

    // 这里是获取评论数据的地方
    await getComments().then(res => {
        commentsAreaData.value = res.data
    })
}, 100)

const handleCommentClose = debounce(() => {
    comment.value.classList.remove('active')
    commentSendingValue.value = null
}, 100)

const commentSendingValue = ref(null)
const commentsAreaView = ref(null)
const handleCommentSend = debounce(async () => {
    if (!localStorage.getItem('token')) {
        alert('请先登录')
        return
    }
    if (!commentSendingValue.value) return
    let data = {
        token: localStorage.getItem('token'),
        content: commentSendingValue.value
    }
    await sendComment(data).then(res => {
        if (res.code == 200) {
            getComments().then(res => {
                commentsAreaData.value = res.data
            })
            commentSendingValue.value = null
            setTimeout(() => {
                commentsAreaView.value.scrollTo(0, commentsAreaView.value.scrollHeight)
            }, 50);
        }
    })
}, 200)

onMounted(() => {
    commentSendingValue.value = null
    parentsPath.value = (val) => {
        path.value = val.path
        view.value.setAttribute("style", `--bgColor: ${val.bgColor}`)
        parentsName.value = val.name
    }
    path.value = router.options.history.location
    router.options.routes.forEach(el => {
        if (el.path == path.value) {
            view.value.setAttribute("style", `--bgColor: ${el.meta.bgColor}`)
            parentsName.value = el.meta.name
        }
    })
})
</script>

<template>
    <template v-if="path != '/sign'">
        <Header @changePath="parentsPath" />
    </template>

    <div ref="view" :class="['view', path == '/sign' ? 'sign' : '']">
        <n-message-provider>
            <router-view :nameToChild="parentsName" @changePath="parentsPath"></router-view>
        </n-message-provider>
    </div>

    <template v-if="path != '/sign'">
        <Footer />
    </template>

    <div ref="comment" class="comment" v-if="path != '/sign'">
        <div class="btn" @click="handleCommentBtnToggle">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12">
                    <g fill="none">
                        <path
                            d="M12 3.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0zm-3-2a.5.5 0 0 0-1 0V3H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V4h1.5a.5.5 0 0 0 0-1H9V1.5zM8.5 8a4.48 4.48 0 0 0 2.484-.747A2 2 0 0 1 9 9H6.651l-2.874 1.916A.5.5 0 0 1 3 10.5V9a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1.758A4.5 4.5 0 0 0 8.5 8z"
                            fill="currentColor"></path>
                    </g>
                </svg>
            </span>
            <span>评论</span>
            <div class="close" @click.stop="handleCommentClose">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <path
                        d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                        fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <div class="commentsArea">
            <div ref="commentsAreaView" class="commentsAreaView">
                <n-gradient-text type="info" size="20">欢迎进入潮州评论区~</n-gradient-text>
                <div v-for="item in commentsAreaData">
                    <n-divider title-placement="left">
                        <h4>
                            <n-performant-ellipsis style="max-width: 100px" :tooltip="false">
                                {{ item.username }}
                            </n-performant-ellipsis>
                        </h4>
                    </n-divider>
                    <p style="white-space: pre-line;">
                        <n-performant-ellipsis :line-clamp="2" expand-trigger="click" :tooltip="false">
                            {{ item.content }}
                        </n-performant-ellipsis>
                    </p>
                </div>
            </div>
            <div class="commentSending">
                <n-input show-count v-model:value="commentSendingValue" round clearable clear-icon type="textarea"
                    placeholder="留下您的评论~" :autosize="{ minRows: 1, maxRows: 3 }">
                    <template #clear-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24 24">
                            <path
                                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59z"
                                fill="currentColor"></path>
                        </svg>
                    </template>
                </n-input>
                <n-button color="#94b9ff" :disabled="!commentSendingValue" @click="handleCommentSend">发送</n-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.view {
    --bgColor: "#fff";
    padding: 150px 100px;
    width: 100%;
    background: var(--bgColor);
}

.view.sign {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
}

.view.sign::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("@/assets/login.png") no-repeat center center;
    background-size: cover;
    filter: blur(2px);
    opacity: 0.8;
    z-index: -1;
}

.comment {
    position: fixed;
    --w: 0px;
    --h: 0px;
    width: var(--w);
    height: var(--h);
    z-index: 200;
    opacity: 0.6;
    bottom: 8rem;
    right: 10rem;
    transform-origin: right bottom;
    background-color: #fff;
    box-shadow: 0 0 15px #dddddd;
    border-radius: 10px;
    transition: .4s ease;
}

.comment.active {
    --w: 400px;
    --h: 400px;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
}

.comment:hover {
    opacity: 1;
}

.comment .btn {
    cursor: pointer;
    width: 40px;
    height: 40px;
    font-size: 17px;
    color: #94b9ff;
    font-weight: bold;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    flex-direction: row;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 15px #dddddd;
    transition: width .1s ease,
        border-radius .1s ease;
}

.comment.active .btn {
    cursor: auto;
    width: 100% !important;
    padding: 5px 10px !important;
    justify-content: start !important;
    border-radius: 0 !important;
}

.comment .btn span:first-of-type {
    width: 25px;
    height: 25px;
}

.comment .btn span:last-of-type {
    display: none;
    width: 0;
    opacity: 0;
    visibility: hidden;
    transition: .4s ease;
    overflow: hidden;
}

.comment .btn span {
    display: block;
}

.comment .btn:hover {
    width: 80px;
    border-radius: 20px;
}

.comment .btn:hover span:last-of-type,
.comment.active .btn span:last-of-type {
    display: block;
    width: auto;
    opacity: 1;
    visibility: visible;
}

.comment .btn .close {
    display: none;
    cursor: pointer;
    margin-left: auto;
    width: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;
    transform: rotate(0deg);
}

.comment .btn .close:hover {
    transform: rotate(90deg);
    transition: .4s ease;
}

.comment.active .btn .close {
    display: block;
    width: 25px;
    height: 25px;
    opacity: 1;
    visibility: visible;
}

.commentsArea,
.commentsAreaView,
.commentSending {
    display: none;
    transition: .4s ease;
}

.comment.active .commentsArea {
    display: block;
    width: calc(var(--w) - 30px);
    height: calc(var(--h) - 60px);
    margin-top: 10px;
}

.comment.active .commentsAreaView {
    display: block;
    width: 100%;
    height: calc(var(--h) - 150px);
    padding: 10px;
    border-radius: 5px;
    background-color: #94b9ff16;
    border: 1px solid #94b9ff74;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
}

.commentsAreaView .n-divider:not(.n-divider--vertical) {
    margin-top: 10px !important;
    margin-bottom: 0 !important;
}

.comment.active .commentSending {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: row;
    gap: 10px;
}

.commentSending .n-button {
    width: auto !important;
}

.commentSending .n-input--textarea {
    --n-border-hover: 1px solid #94b9ff !important;
    --n-border-focus: 1px solid #94b9ff !important;
    --n-loading-color: #94b9ff !important;
    --n-caret-color: #94b9ff !important;
    --n-box-shadow-focus: 0 0 0 2px rgba(148, 185, 255, 0.4) !important;
}
</style>
