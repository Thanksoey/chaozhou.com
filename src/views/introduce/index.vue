<script setup>
import { onMounted, ref } from 'vue'
import { roundToNearestThousand } from '@/use/roundToNearestThousand'
const introduceData = ref([])
introduceData.value = [
    {
        id: "HistoricalContext",
        type: "row",
        title: "历史背景",
        url: new URL("@/assets/in1.jpg", import.meta.url).href,
        cons: "潮州市历史背景深厚，自东晋时期置郡以来，历经多次行政变革。其名称“潮州”始于唐乾元元年（758年），并一直沿用至今。历史上，潮州是闽越文化的交汇地，中原汉族文化与土著文化相互融合，形成了独特的地域文化。明清时期，潮州府制确立，进一步巩固了其在粤东地区的政治、经济和文化中心地位。潮州以其悠久的历史、丰富的文化遗产和独特的民俗风情，被誉为“海滨邹鲁”。"
    },
    {
        id: "GeographicalLocation",
        type: "col",
        title: "地理位置",
        url: new URL("@/assets/in2.jpg", import.meta.url).href,
        cons: "潮州市位于广东省最东端，地处粤港澳大湾区与海峡西岸经济区的交汇处，濒临南海，与台湾省隔海相望。它位于韩江中下游，东与福建省漳州市交界，西、南、北分别和揭阳市、汕头市、梅州市接壤，是广东的“东大门”。"
    },
    {
        id: "PopulationAndEthnicity",
        type: "row",
        title: "人口和民族",
        url: new URL("@/assets/in3.jpg", import.meta.url).href,
        cons: "潮州市人口约为257.56万人，城镇人口166.92万人，城镇化率64.81%。在民族方面，潮州市是一个多民族聚居的地区，其中汉族是主体民族。此外，由于潮州地理位置的特殊性，与福建、台湾等地相邻，历史上也有其他民族如疍家、畲族、俚族等在此融合，但汉族依然是潮州人口的主要组成部分。"
    },
    {
        id: "ClimaticCharacteristics",
        type: "col",
        title: "气候特点",
        url: new URL("@/assets/in4.jpg", import.meta.url).href,
        cons: "潮州市的气候特点属于亚热带海洋性季风气候，具有气候温和、雨量充沛、终年常绿、四季宜耕的特点。具体来说，潮州市的年平均气温约为22.6℃，汛期一般指的是5月至10月，降水量明显增加，尤其是前汛期（5月至7月）降水量增加较快，降雨频繁，气温逐渐升高；后汛期（8月至10月）降水量逐渐减少，但降雨强度增加，气温逐渐下降。"
    },
]
const itdId = ref('HistoricalContext')
const setItdId = ref()
onMounted(() => {
    const itdCons = document.querySelectorAll('.introduce-contents>div')
    setItdId.value = (e) => {
        itdId.value = e.currentTarget.dataset.id
        itdCons.forEach(e => {
            if (e.dataset.id == itdId.value) {
                document.documentElement.scrollTop = e.offsetTop - 150
            }
        })
    }
    window.addEventListener('scroll', () => {
        const screenTop = roundToNearestThousand(document.documentElement.scrollTop)
        itdCons.forEach(e => {
            if (roundToNearestThousand(e.offsetTop - 150) == screenTop) {
                itdId.value = e.dataset.id
            }
        })
    })
})
</script>

<template>
    <div class="introduce">
        <div class="introduce-tabs">
            <h1>目录</h1>
            <img src="@/assets/jiantou.png" alt="" />
            <ul>
                <li v-for="itd in introduceData" @click="setItdId($event)" :class="itdId == itd.id ? 'active' : ''"
                    :data-id="itd.id">
                    <img src="@/assets/dayu.png" :alt="itd.title" />{{ itd.title }}
                </li>
            </ul>
        </div>
        <div class="introduce-contents">
            <div v-for="itd in introduceData" :data-id="itd.id">
                <h2>{{ itd.title }}</h2>
                <div :class="`flex-${itd.type}`">
                    <img :src="itd.url" alt="" />
                    <p>{{ itd.cons }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.introduce-tabs {
    position: fixed;
    top: 150px;
    float: left;
    width: 400px;
    height: auto;
    padding: 40px;
    background: linear-gradient(to right, #cdffd8, #94b9ff);
    transition: .4s ease;
}

.introduce-tabs h1 {
    padding-left: 20px;
}

.introduce-tabs ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.introduce-tabs ul li {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    gap: 10px;
    text-shadow: 0 0 3px #333;
    margin-left: 20px;
}

.introduce-tabs ul li img {
    width: 10%;
    opacity: 0;
    transition: opacity .1s ease;
}

.introduce-tabs ul li:hover img,
.introduce-tabs ul li.active img {
    opacity: 1;
}

.introduce-contents {
    float: right;
    display: flex;
    flex-direction: column;
    gap: 100px;
    width: 65%;
    background-color: #d5efef;
    padding: 100px;
}

.introduce-contents>div {
    border-radius: 20px;
    border: 3px dotted #000;
    padding: 30px;
    color: #376586;
}

.introduce-contents>div>div {
    display: flex;
    padding: 20px 0;
    gap: 40px;
}

.introduce-contents>div>div.flex-row {
    flex-direction: row;
}

.introduce-contents>div>div.flex-row img,
.introduce-contents>div>div.flex-row p {
    width: 50%;
}

.introduce-contents>div>div.flex-col {
    flex-direction: column;
}

.introduce-contents>div>div p {
    --itd-p: 20px;
    font-size: var(--itd-p);
    line-height: calc(var(--itd-p) * 1.5);
}
</style>
