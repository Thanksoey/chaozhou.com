<script setup>
import { onMounted, ref } from 'vue'
import { NCarousel } from 'naive-ui'
const banners = ref('')
onMounted(() => {
    banners.value = [
        { url: new URL("@/assets/banner1.jpg", import.meta.url).href },
        { url: new URL("@/assets/banner2.jpg", import.meta.url).href },
        { url: new URL("@/assets/banner3.jpg", import.meta.url).href },
        { url: new URL("@/assets/banner4.jpg", import.meta.url).href }
    ]
    const btnStart = document.querySelector('.start')
    btnStart.addEventListener('mouseleave', (e) => {
        e.target.lastChild.setAttribute("style", `left: ${e.offsetX}px; top: ${e.offsetY}px`)
    })
})
</script>

<template>
    <div class="home">
        <div class="index-title">
            <div class="title">
                <img src="@/assets/title.png" alt="" />
            </div>
            <h2>潮州文化宣传网站涵盖潮汕历史、民俗、艺术、美食等多元文化，致力于传播潮州特色，弘扬潮州精神，展现潮州魅力。</h2>
            <RouterLink class="start" to="/introduce">
                <div class="btnText">
                    <img src="@/assets/btn.png" alt="" />
                </div>
                <span style="left: 100px; top: 0;"></span>
            </RouterLink>
        </div>
        <div class="index-video">
            <video controls autoplay loop muted src="@/assets/chaozhou.mp4"></video>
        </div>
    </div>

    <div class="index-carousel">
        <n-carousel draggable autoplay dot-type="line">
            <img class="carousel-img" :src="bs.url" v-for="bs in banners" />
        </n-carousel>
    </div>
</template>

<style scoped>
.home {
    display: flex;
}

.index-title {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    padding: 20px;
    gap: 20px;
}

.start {
    --width: 200px;
    --after-width: calc(var(--width) * 3);
    height: 90px;
    position: relative;
    cursor: pointer;
    width: var(--width);
    margin: 50px auto;
    padding: 20px;
    text-align: center;
    font-size: 18px;
    border-radius: 15px;
    overflow: hidden;
    border: 2px solid #02bf83;
    color: #02bf83;
    transition: .2s linear;
    background-color: #fff;
}

.start .btnText {
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.start span {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--after-width);
    height: var(--after-width);
    background: linear-gradient(to right, #cdffd8, #94b9ff);
    z-index: 1;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: .3s linear;
}

.start:hover {
    color: #fff;
}

.start:hover span {
    transform: translate(-50%, -50%) scale(1);
    transition: .3s linear;
}

.index-carousel {
    width: 60%;
    margin: 20px auto;
    border-radius: 20px;
    overflow: hidden;
}

.n-carousel {
    --n-dot-line-width: 1rem !important;
    --n-dot-line-width-active: 2rem !important;
    --n-dot-color: rgba(255, 255, 255, 0.4) !important;
}

.carousel-img {
    object-fit: cover;
}

.index-video {
    width: 50%;
    margin: 0 auto;
    padding: 20px;
    overflow: hidden;
}

.index-video video {
    width: 100%;
}
</style>
