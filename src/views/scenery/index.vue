<script setup>
import { onMounted, ref } from 'vue'
import { NModal } from 'naive-ui'
const showModal = ref(false)
const showModalData = ref([])
const sceneryData = ref([
    {
        id: 1,
        title: "府楼焕彩",
        url: new URL("@/assets/view1.jpg", import.meta.url).href,
        cons: "潮州镇海楼又称府楼、谯楼，位于潮州市湘桥区昌黎路。始建于明洪武二年（1369），毁于辛亥革命，为明清时期潮州府衙一进过街楼建筑，是潮州内八景“府衙钟声”所在地。2021年潮州市政府在原址附近按原结构复建。夜间，潮州镇海楼还有韵味悠长的激光投影秀，古典且华丽，从空中鸟瞰潮州大地，镇海楼犹如古城的一颗夜明珠，熠熠生辉。"
    },
    {
        id: 2,
        title: "韩水欢灯",
        url: new URL("@/assets/view2.jpg", import.meta.url).href,
        cons: "潮州“一江两岸”夜景以广济桥为轴心向两侧展开，北达金山大桥，南至韩江大桥。驻足韩江西岸，羽衣霓虹般的广济古桥映入眼帘，并与东岸的景色互相呼应，形成一幅绚丽的韩江夜景图。与此同时，西岸的柔光明灯书画出广济桥、北阁佛灯、城门古城墙、堤岸栈道的轮廓，星星点点若暗若明地守护着潮州这座千年古城。"
    },
    {
        id: 3,
        title: "颐园翰墨",
        url: new URL("@/assets/view3.jpg", import.meta.url).href,
        cons: "潮州市饶宗颐学术馆扩建成为庭园式建筑，并命名为“颐园”。颐园占地面积5800多平方米，建筑面积3100多平方米，由翰墨林、经纬堂、天啸楼三座主体建筑构成，设有饶宗颐先生生平事迹展、饶宗颐先生学术成就展、饶宗颐先生书画艺术展三个主题展厅。颐园清幽典雅，景色宜人，是一座富有潮州传统民居风格和岭南庭园韵致的建筑，更是一座充满文化艺术气息的翰墨殿堂。"
    },
    {
        id: 4,
        title: "许府宋韵",
        url: new URL("@/assets/view4.jpg", import.meta.url).href,
        cons: "许驸马府位于潮州古城中山路葡萄巷东府埕4号，始建于北宋英宗赵曙治平元年（1064），是潮州唐宋八贤之一许申的曾孙—许珏的府第，因许珏是北宋英宗皇帝之女德安公主的驸马，故民间称其为许驸马府。整座府第古朴大方，结构严谨，主体建筑三进五开间，首进与后座均带插山厅、房，合为九间。"
    },
    {
        id: 5,
        title: "天池云海",
        url: new URL("@/assets/view5.jpg", import.meta.url).href,
        cons: "凤凰山天池位于潮州市潮安区凤凰镇凤凰山脉乌岽顶部，海拔1325米，主峰海拔1392米，仅次于粤东第一高峰，潮汕屋脊——凤乌髻。因凤凰山常年云雾氤氲，天池上常有云海奇观，便有“南国第一天池”之美称。洁白的云雾覆盖在凤凰山峦之间，山影朦胧，仙气飘飘。从空中俯瞰，茫茫云海铺满整个天际，气势磅礴。在阳光的照射下，云海披上霞光，宛如人间仙境，给凤凰山增添了无穷的魅力。"
    },
    {
        id: 6,
        title: "青岚冰臼",
        url: new URL("@/assets/view6.jpg", import.meta.url).href,
        cons: "青岚冰臼位于饶平青岚国家地质公园。园内长达8公里的青岚溪谷，在河床中、岩洞下遍布着3000多个大小不一、形态各异，绚丽多彩的石臼壶穴。这一冰臼群，其分布面积之广、形态之奇、规模之大、景观之美，在从广东北纬23°12′，海拔高度不上100米，地处亚热带而又保存这么完好等特征来看，在国内外为首例，实属罕见，堪称自然景观的一大奇葩！"
    },
    {
        id: 7,
        title: "落霞飞鹭",
        url: new URL("@/assets/view7.jpg", import.meta.url).href,
        cons: "湿地公园位于潮州市韩江东岸意东堤金山大桥下的滩地和水域，滩地长约1.2km，宽约250m，总面积约30公顷（450亩）。园内绿草萋萋，鱼鸟成群，栈道曲径通幽，亭台楼阁在水一方，阳光下，落霞与白鹭齐飞 ，秋水共长天一色，是一个休闲娱乐的生态型主题公园。"
    },
    {
        id: 8,
        title: "龙湖古寨",
        url: new URL("@/assets/view8.jpg", import.meta.url).href,
        cons: "龙湖古寨是潮州古建筑天然“博览馆”，寨中的方伯第、进士第、探花府、绣衣第、许氏宗祠、阿婆祠、龙湖书院、天后宫等建筑精品皆各具特色，屋内装饰争奇斗巧，木雕、石雕、嵌瓷、彩绘、贝灰塑等装饰工艺精益求精，是一个具有高度观赏性和研究性的古建筑聚集群。"
    },
])
const modelShowEvent = (id) => {
    sceneryData.value.forEach(data => {
        if (id == data.id) {
            showModal.value = true
            showModalData.value = data
        }
    })
}
</script>

<template>
    <div class="scenery">
        <div class="title">
            <img src="@/assets/bajing.png" alt="" draggable="false" />
        </div>
        <div class="scenery-contents">
            <div v-for="sn in sceneryData" @click="modelShowEvent(sn.id)">
                <div class="imgView">
                    <img :src="sn.url" alt="" draggable="false" />
                </div>
                <div class="title">{{ sn.title }}</div>
            </div>
        </div>
        <n-modal v-model:show="showModal" class="custom-card" preset="card" size="small" :style="{ width: '400px' }" :header-style="{ fontWeight: '700', fontSize: '24px' }">
            <template #header>
                {{ showModalData.title }}
            </template>
            <template #default>
                <img :src="showModalData.url" alt="" draggable="false" />
                <div class="modalCons">
                    <p>{{ showModalData.cons }}</p>
                </div>
            </template>
            <template #footer>
            </template>
        </n-modal>
    </div>
</template>

<style scoped>
.scenery {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.scenery .title {
    width: 50%;
}

.scenery-contents {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 40px;
}

.scenery-contents>div {
    cursor: pointer;
    width: 40%;
}

.scenery-contents>div:hover .imgView img {
    transform: scale(1.2);
}

.scenery-contents .imgView {
    height: 400px;
    overflow: hidden;
}

.scenery-contents .imgView img {
    transition: .4s ease;
}

.scenery-contents .title {
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
    text-align: center;
    font-size: 18px;
}

.modalCons {
    --modal-cons-p: 18px;
    font-size: var(--modal-cons-p);
    line-height: calc(var(--modal-cons-p) * 1.5);
}
</style>
