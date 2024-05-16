<script setup>
import { onMounted, onBeforeMount, ref, inject, toRefs, toRaw, watch } from 'vue'
import { NDrawer, NDrawerContent, NTag, NBadge } from 'naive-ui'
import { debounce, toArray } from 'lodash';
const proxy = inject('$echarts')
const showDrawer = ref(false)
const showBadge = ref(false)
const showDrawerData = ref([])
const foodsData = ref([
    {
        id: 1,
        title: "蚝烙",
        likes: 3,
        url: new URL("@/assets/ms1.jpg", import.meta.url).href,
        cons: "蚝烙是广东省潮汕地区的一道特色小吃，其做法相对简单，以下是其基本步骤：\n1.准备材料：鲜蚝（生蚝）、鸭蛋、葱、香菜、红薯粉、鱼露、胡椒粉、味精、盐、猪油等。\n2.清洗生蚝并控干水分，葱和香菜切碎备用。\n3.在碗中打入鸭蛋并搅拌均匀，红薯粉加水充分搅拌成粉水。\n4.将生蚝、粉水、鸭蛋液、葱花、香菜段、盐、胡椒粉、味精等一起充分搅拌，调成稀浆液。\n5.平底锅加入猪油，烧热后倒入生蚝浆液，待其结块后，用铁勺把蚝烙切断分块，再翻面继续煎烙。\n6.煎至两面金黄、酥脆时，即可出锅装盘，并伴上芫荽叶。\n在煎制过程中，可以根据个人口味调整调料和手法，也可以加入其他配料如豆腐鱼、薄壳、虾仁等。蘸点鱼露食用，味道更佳。"
    },
    {
        id: 2,
        title: "肠粉",
        likes: 1,
        url: new URL("@/assets/ms2.jpg", import.meta.url).href,
        cons: "肠粉是广东非常出名的传统小吃，其做法简单描述如下：\n1.准备材料：粘米粉、玉米淀粉、鸡蛋、香肠（或其他肉类）、葱、蒜、生抽、老抽、食用油等。\n2.将粘米粉和玉米淀粉按一定比例混合，加入适量的水搅拌均匀，制成肠粉浆。\n3.准备馅料：将香肠切丁，葱和蒜切碎备用。鸡蛋打散备用。\n4.在蒸盘上刷上一层食用油，防止肠粉粘连。\n5.将肠粉浆倒入蒸盘中，并摇动蒸盘使面糊均匀铺开。\n6.在肠粉快凝固的时候，倒入适量的鸡蛋液，并撒上香肠丁和葱花。\n7.将蒸盘放入蒸锅中，大火蒸制2-3分钟，直到肠粉起大泡即可取出。\n8.用刮板将肠粉从蒸盘上刮下，并卷成卷状。\n9.准备酱汁：将生抽、老抽、蒜末、葱花等调料混合搅拌均匀，作为肠粉的酱汁。\n10.将肠粉切段，淋上酱汁即可食用。\n以上是一个简单的肠粉做法，具体的配料和调料可以根据个人口味进行调整。同时，也可以使用专门的肠粉机来制作肠粉，使制作过程更加简单快捷。"
    },
    {
        id: 3,
        title: "甘草水果",
        likes: 2,
        url: new URL("@/assets/ms3.jpg", import.meta.url).href,
        cons: "甘草水果是潮州的街头常见美食，其做法可以简单描述如下：\n1.准备材料：选择新鲜的青芒果和杨桃（或其他喜欢的水果），以及甘草、糖、精盐和南姜。\n2.水果处理：将青芒果和杨桃洗净，分别切成薄片或块状。\n3.制作甘草汁：将甘草放进沸水中，煮至甘草出味后捞出。在甘草汁中加入适量的白糖和精盐，搅拌均匀，待其冷却备用。\n4.腌制：将切好的水果放入甘草汁中，加入一点南姜末，然后放入冰箱腌制数小时。期间可以反复摇晃或搅拌，使水果更加均匀地吸收甘草汁的味道。\n5.享用：腌制好的甘草水果可以直接从冰箱中取出食用。根据个人口味，可以加入一些梅粉或其他调料来增添风味。\甘草水果不仅口感独特，而且具有帮助消化、止渴生津、解毒祛痰等功效。但请注意，甘草虽好，但不宜过量食用，特别是湿盛胀满、浮肿者以及孕妇等人群应谨慎食用。"
    },
    {
        id: 4,
        title: "红桃粿",
        likes: 1,
        url: new URL("@/assets/ms4.jpg", import.meta.url).href,
        cons: "红桃粿是广东潮汕地区的传统小吃，具有独特的制作工艺和口感。以下是红桃粿的简单做法描述：\n1.准备材料：主要材料包括大米、白面、糯米等，馅料则可以根据个人口味选择，如香菇、虾米、鸡内脏、花生仁、生蒜、猪肉等。此外，还需要准备红米曲、胡椒粉、鱼露精、盐、食用油、葱蒜等配料。\n2.制作粿皮：将大米作为原料，加入红米曲，用家庭碓臼舂捣成粉红色细滑粉末。然后用温水搅拌搓捏成大块团状，下蒸笼至半熟取出，在砧板上反复揉锻，即可捏成粿皮。\n3.准备馅料：将糯米饭、切成丁的湿香菇、虾米、切成丁的鸡内脏、炒香去外衣的花生仁、切碎的生蒜等一起下油锅爆炒，调入味精、胡椒粉、鱼露等调料，即成红桃粿馅。\n4.包制红桃粿：将粳米粉冲开水做成红桃粿皮，搓成长条，捏一小块，压成圆薄皮，包上馅。皮馅包制成后，还需用雕刻花纹图案的木质桃形印模印制，再入蒸笼蒸熟即成。\n另外，也有不同的做法是先做粿皮，再炒制馅料，然后包入馅料，最后蒸熟。无论哪种做法，都需要注意比例和火候，以保证红桃粿的口感和品质。\n红桃粿口感香软可口，可以蒸、煎、煮等多种吃法。在潮汕地区，红桃粿常常作为节日食品或祭祖用品，寓意着祈福祈寿和吉祥如意。"
    },
    {
        id: 5,
        title: "春卷",
        likes: 4,
        url: new URL("@/assets/ms5.jpg", import.meta.url).href,
        cons: "春卷的做法相对简单，以下是其基本步骤的简要描述：\n1.准备馅料：将选好的肉类（如猪肉、虾仁）洗净、切丝或切丁，用料酒、生抽、胡椒粉、葱姜末等调料腌制一段时间，使其更入味。蔬菜类则可以直接切丝备用。如果选用香菇，也需要提前泡发并切丝。\n2.炒制馅料：将腌制好的肉类和切好的蔬菜放入热油锅中翻炒，加入适量的盐和其他调料调味，炒熟后盛出备用。确保馅料炒得均匀熟透，口感鲜美。\n3.包春卷：取一张春卷皮，将炒好的馅料放在春卷皮的一端，然后将春卷皮轻轻卷起，边卷边用手指将两侧向中间折叠，使春卷皮包裹住馅料。在春卷皮的另一端涂上少许水或面糊，帮助封口。确保春卷封口紧密，避免炸制时馅料漏出。\n4.炸春卷：将包好的春卷放入热油锅中炸制。油温控制在160-180℃之间，炸至春卷表面金黄酥脆即可捞出沥油。炸制时要小心翻动春卷，避免粘连或炸糊。\n5.装盘享用：将炸好的春卷放在盘子上，稍微冷却后即可享用。春卷外皮酥脆，内馅鲜美，是一道美味可口的小吃。\n希望这个简单的描述能帮助你制作美味的春卷！"
    },
    {
        id: 6,
        title: "粿汁",
        likes: 6,
        url: new URL("@/assets/ms6.jpg", import.meta.url).href,
        cons: "潮州粿汁的做法可以简单描述如下：\n1.准备材料：主要材料包括粿条（粿汁皮）、肚肉（或其他肉类如猪肠、豆腐等）、腐竹、卤蛋等。配料还包括芜荽、蒜头油、葱、粘米粉等。\n2.制作粿汁皮：将研磨好的老米米浆倒在加热的平底锅上，均匀摊开，煎至微焦。晾透后切成顶圆下尖的三角形，放到沸水糊中会自动卷成筒状。\n3.准备汤料：将卤好的肚肉略炒，加入卤汤和调料，煮成粿汁汤料。\n4.煮制粿汁：在锅中加水，初沸时加入米浆和粿汁皮，边煮边搅拌，同时加入微量的盐。分多次加入米浆，以保持汤汁的浓稠度适中。\n5.装盘：将煮好的粿汁舀到碗中，加入腐竹、卤蛋等配料。再加上一小撮“葱珠”（即把葱叶切成葱花，微火加入猪油干煎，等葱花微焦时离火）。\n这样，一碗美味的潮州粿汁就做好了。粿汁柔滑，汤料味道独特，配上卤味更加爽口。记得要趁热享用哦！"
    },
    {
        id: 7,
        title: "潮州卤鹅",
        likes: 1,
        url: new URL("@/assets/ms7.jpg", import.meta.url).href,
        cons: "潮州卤鹅是潮汕地区的特色美食，以下是其简单做法的描述：\n1.准备材料：选用潮汕地区的良种鹅——狮头鹅为主料，再准备桂皮、八角、南姜、香茅、大蒜、酱油、冰糖、盐、清水等调料。\n2.处理鹅：将鹅宰杀后去毛，清水洗净，吊起晾干。然后用盐均匀地抹在鹅身的表皮和内腔，稍停片刻。\n3.制作卤水：将川椒炒至微香，与八角、桂皮、香茅、大蒜等香料（这些香料可以用纱布包成小包）放入锅中，加入酱油、冰糖、清水，微火煮沸，制成卤汤。\n4.卤煮鹅：将处理好的鹅放入已制好的卤汤中（卤汤以浸没鹅身、腹内灌满为度）。慢火煮约十分钟后，将鹅吊离汤面，稍凉后再放入卤汤中继续煮，反复几次，使鹅身内外受热均匀，容易着色。最后，将鹅再放入卤汤中，熬煮约二小时左右，中间要将鹅身翻转数次。\n5.冷却与切片：卤熟后的鹅捞起晾凉，然后切成厚片。\n6.装盘与调味：将切好的卤鹅放在砧板上，淋上卤汁，加上芫荽等配料，调碟蒜泥醋，即可上桌享用。\n这样，一道美味的潮州卤鹅就做好了。卤鹅色泽鲜艳，口感鲜美，肉质嫩滑，是潮汕地区人们喜爱的美食之一。"
    },
    {
        id: 8,
        title: "潮州牛肉火锅",
        likes: 2,
        url: new URL("@/assets/ms8.jpg", import.meta.url).href,
        cons: "潮州牛肉火锅的吃法可以简单描述如下：\n1.准备食材：首先，准备好各种牛肉部位，如嫩肉、肥胼、三花趾、五花趾等，以及其他配菜，如炸腐皮、潮汕粿条、白萝卜和玉米等。牛肉要按照纹路切成薄片，以便快速熟透且口感嫩滑。\n2.汤底选择：选择牛骨清汤作为汤底，其经典搭配包括萝卜、苦瓜黄豆、玉米等。一些店家可能会将牛丸或牛腩提前下锅，这样煮出的汤底更加浓郁。\n3.下锅顺序：在清汤端上桌后，遵循“由瘦到肥，先肉后菜，从耐煮到易熟”的原则下锅。即先下耐煮的牛筋、牛腩、牛肉丸等食材，然后按照牛肉的瘦到肥顺序，如嫩肉、五花趾、三花趾等，最后下竹荪、腐竹、粿条等其他食材。这样可以保持汤底的清澈和原汁原味。\n4.汆烫时间：不同部位的牛肉汆烫时间不同。例如，嫩肉建议汆烫8-10秒，肥胼建议汆烫12秒，三花趾和五花趾建议汆烫8秒。下锅后用筷子搅动，当肉片表面断生时，捞起约2秒使牛肉吊汤，再放到汤中汆熟。整个过程最长不超过20秒，以保持牛肉的嫩滑口感。\n5.享用：涮好的牛肉可以配上沙茶酱或其他酱料食用，口感更佳。此外，炸腐皮、潮汕粿条等配菜也可以根据个人口味选择享用。\n以上就是潮州牛肉火锅的简单吃法描述。在享受美食的同时，也可以根据个人口味和喜好进行调整和创新。"
    },
    {
        id: 9,
        title: "潮州生腌",
        likes: 4,
        url: new URL("@/assets/ms9.jpg", import.meta.url).href,
        cons: "潮州生腌的做法相对独特，以下是一个简单的描述：\n1.准备食材：选择新鲜的海鲜食材，如虾、蟹、贝类等。确保食材的新鲜度是制作生腌的关键。\n2.处理食材：根据食材的种类和大小，进行必要的处理。例如，虾需要去壳去虾线，蟹需要去脐盖、开壳取肺，贝类如血蛤需要用沸水烫后剥开。\n3.制作腌料：潮州生腌的腌料通常包括酱油、鱼露、蒜头、辣椒、白糖、味精、芝麻油等调料。将这些调料按照一定比例混合搅拌，制成腌料。\n4.腌制：将处理好的海鲜食材放入腌料中，确保食材充分浸泡在腌料中。腌制的时间可以根据个人口味和食材种类进行调整，一般从半小时到一天不等。\n5.享用：腌制好的生腌海鲜可以直接食用，也可以搭配一些调料或配菜食用。其口感鲜美，味道独特，是潮汕地区非常受欢迎的美食之一。\n需要注意的是，由于生腌食品涉及到生食海鲜，因此在制作过程中一定要注意食材的新鲜度和卫生条件，避免食品安全问题。同时，在腌制过程中可以根据个人口味和喜好调整腌料的配方和腌制时间，以达到最佳口感。"
    },
    {
        id: 10,
        title: "糖葱薄饼",
        likes: 5,
        url: new URL("@/assets/ms10.jpg", import.meta.url).href,
        cons: "糖葱薄饼是广东潮汕地区的一种特色小吃，以下是其简单做法的描述：\n1.制作薄饼皮：面粉中加入适量开水，趁热揉成光滑的面团。把平底锅烧热，手拿软面团快速往热的平底锅上一贴，然后迅速拿起，锅里就会粘上一张圆圆的薄饼。等薄饼成形后即可拿起备用。\n2.制作糖葱：用白糖和麦芽糖加上少量面粉在锅里煮成浆，然后放凉自然冷却。将冷却后的糖块用模具或长棍拉成细管状，类似于拉面条的动作，使糖内充满空气。待糖成为细管状后，冷却并剪成三寸长的长条，即为糖葱。\n3.准备辅料：花生米炒熟去掉红皮，压碎。黑白芝麻略炒一下。香菜洗净切碎。\n4.组装糖葱薄饼：摊开一张薄饼皮，放上糖葱。撒上碎花生米、黑白芝麻和香菜。将薄饼包成方形或条形即可食用。\n温馨提示：薄饼起包裹糖葱的作用，是很常见的面皮，类似于北京烤鸭的面皮或江浙沪一带的鸡蛋饼的面皮。糖葱以天气为准（天冷则可常温放置，天热则放冰箱，否则可能会融化），薄饼只能放冰箱（常温下不可放久，否则可能变酸或发霉）。\n这样，一道美味的糖葱薄饼就做好了，祝您用餐愉快！"
    },
    {
        id: 11,
        title: "潮州甜汤",
        likes: 4,
        url: new URL("@/assets/ms11.jpg", import.meta.url).href,
        cons: "潮州甜汤是潮汕地区的一道传统甜品，其做法简单而美味。以下是潮州甜汤的简单做法描述：\n1.将干莲子、干百合和薏米用清水浸泡清洗，莲子要去芯，以免有苦味。\n2.白果（银杏）用刀背拍扁外面的硬壳后，撕去内层的薄衣，取出黄澄澄的白果肉。\n3.把干莲子、薏米和百合倒入汤锅中，加入清水，小火熬煮20分钟，直至它们开始微微开花。\n4.等到锅里的莲子和薏米都开始煮开花，并且有淀粉出来的时候，倒入清洗干净的白果。\n5.将切碎的银耳也倒入锅里，根据个人喜好，如果想要银耳口感糯一些，就煮久一些；如果喜欢脆爽一些，银耳烹煮时间就不要太久，避免起胶质。\n6.最后，把鹌鹑蛋和冰糖加入糖水中，鹌鹑蛋因为是煮熟的，所以最后再放。冰糖的用量根据个人喜甜的口味增减，调整甜度。\n7.所有材料都加入后，继续煮几分钟，让甜味和食材充分融合。\n8.关火，盛出甜汤，稍微冷却后即可享用。\n这样一道香甜可口的潮州甜汤就做好了，希望您会喜欢！"
    },
    {
        id: 12,
        title: "咸水粿",
        likes: 3,
        url: new URL("@/assets/ms12.jpg", import.meta.url).href,
        cons: "咸水粿是广东省潮州市的传统小吃，其制作方法如下：\n1.材料准备：大米：适量，用于制作粿皮。菜脯（潮州特产的萝卜干）：适量，用于制作馅料。蒜头：适量，用于翻炒菜脯。其他调料：如盐、辣椒酱等，根据个人口味添加。\n2.制作粿皮：将大米洗净后，用足够的清水浸泡一夜，使米粒变软。倒掉泡米水，将大米放入料理机，加入清水搅打成米浆。让米浆静止沉淀，等沉淀后再继续搅打，重复多次，确保米浆细腻。当米浆静止时，沉淀物与水的比例约为1：1即可。取模具（如小陶钵或茶杯），刷上一层油以防粘底。将搅拌均匀的米浆倒入模具内，放置蒸锅上蒸熟。\n3.制作馅料：选择清甜带芳香的菜脯，切成幼丁。蒜头切碎。锅中加油烧热，用小火慢慢加入菜脯粒、蒜蓉翻炒，用温火把菜脯的香味凸显出来。可以根据个人口味加入少量辣椒酱或盐调味。\n4.组合与享用：粿皮蒸熟后，会形成自然的圆形粿凹。用铁汤匙或其他工具将粿胚从模具中取出。在每个蒸熟的粿胚中间的粿凹处，加入已炒好的菜脯粒等配料。可以根据个人口味添加辣椒酱或其他调料。咸水粿现做现吃，口感最佳。\n这样，一道色泽嫩白、口感润滑的咸水粿就做好了，希望你会喜欢！"
    }
])
const modelShowEvent = (id) => {
    foodsData.value.forEach(data => {
        if (id == data.id) {
            showDrawer.value = true
            showDrawerData.value = data
        }
    })
}

var myChart = null
const container = ref(null)
const initEcharts = () => {
    myChart = proxy.init(container.value)
    const option = {
        dataset: [
            {
                source: toRaw(foodsData.value)
            },
            {
                transform: {
                    type: 'sort',
                    config: { dimension: 'likes', order: 'desc' }
                }
            }
        ],
        tooltip: {},
        xAxis: {
            type: 'category',
            axisLabel: { interval: 0, rotate: 60 }
        },
        yAxis: {
            axisLabel: {
                color: '#02bf83'
            }
        },
        series: {
            type: 'bar',
            showBackground: true,
            itemStyle: {
                color: '#02bf83'
            },
            encode: {
                x: 'title',
                y: 'likes',
                itemId: 'id',
                itemName: 'title'
            },
            datasetIndex: 1
        }
    }
    myChart.setOption(option)
}

watch(foodsData.value, (oldV, newV) => {
    if (myChart) {
        myChart.setOption({
            dataset: [
                {
                    source: newV
                },
            ]
        })
    }
})

const likesTopic = ref(null)
var initEchartsTimer = null
const likesTopicBtnToggle = debounce(() => {
    clearTimeout(initEchartsTimer)
    if (showBadge.value) showBadge.value = false
    likesTopic.value.classList.add('active')
    initEchartsTimer = setTimeout(() => {
        initEcharts()
    }, 400)
}, 200)

const likesTopicBtnClose = debounce(() => {
    clearTimeout(initEchartsTimer)
    likesTopic.value.classList.remove('active')
    if (myChart) {
        myChart.dispose()
        myChart = null
    }
}, 200)

const handleLikes = ref(null)
onMounted(() => {
    handleLikes.value = (id, el) => {
        if (!showBadge.value && !myChart) showBadge.value = true
        if (el.currentTarget.firstChild.dataset.liked == "false") {
            el.currentTarget.setAttribute("class", "likes active")
            el.currentTarget.firstChild.dataset.liked = true
            foodsData.value.forEach(el => {
                if (id == el.id) {
                    el.likes++
                }
            })
        } else {
            el.currentTarget.setAttribute("class", "likes")
            el.currentTarget.firstChild.dataset.liked = false
            foodsData.value.forEach(el => {
                if (id == el.id) {
                    el.likes--
                }
            })
        }
    }
})

onBeforeMount(() => {
    if (myChart) {
        myChart.dispose()
        myChart = null
    }
})
</script>

<template>
    <div class="foods">
        <!-- 点赞排行榜 -->
        <div ref="likesTopic" class="likesTopic">
            <div class="btn" @click="likesTopicBtnToggle">
                <n-badge dot :offset="[5, 0]" :processing="true" :show="showBadge" />
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512">
                        <path d="M480 496H48a32 32 0 0 1-32-32V32a16 16 0 0 1 32 0v432h432a16 16 0 0 1 0 32z"
                            fill="currentColor"></path>
                        <path
                            d="M156 432h-40a36 36 0 0 1-36-36V244a36 36 0 0 1 36-36h40a36 36 0 0 1 36 36v152a36 36 0 0 1-36 36z"
                            fill="currentColor"></path>
                        <path
                            d="M300 432h-40a36 36 0 0 1-36-36V196a36 36 0 0 1 36-36h40a36 36 0 0 1 36 36v200a36 36 0 0 1-36 36z"
                            fill="currentColor"></path>
                        <path
                            d="M443.64 432h-40a36 36 0 0 1-36-36V132a36 36 0 0 1 36-36h40a36 36 0 0 1 36 36v264a36 36 0 0 1-36 36z"
                            fill="currentColor"></path>
                    </svg>
                </span>
                <span>排名</span>
                <div class="close" @click.stop="likesTopicBtnClose">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 24 24">
                        <path
                            d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                            fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <!-- echarts.js矩形图 -->
            <div id="echarts">
                <div ref="container"></div>
            </div>
        </div>
        <div class="title">
            <img src="@/assets/meishi.png" alt="" draggable="false" />
        </div>
        <div class="foods-contents">
            <div v-for="fd in foodsData" @click="modelShowEvent(fd.id)">
                <div class="likes" @click.stop="handleLikes(fd.id, $event)">
                    <span :data-liked="false">
                        <svg class="data-liked:false" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
                            <path
                                d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7c0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4c47.6-20.3 78.3-66.8 78.3-118.4c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7c9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"
                                fill="currentColor"></path>
                        </svg>
                        <svg class="data-liked:true" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
                            <path
                                d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7c0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311h-.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4c47.6-20.3 78.3-66.8 78.3-118.4c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c-.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z"
                                fill="currentColor"></path>
                        </svg>
                    </span>
                </div>
                <div class="imgView" draggable="false">
                    <img :src="fd.url" alt="" draggable="false" />
                </div>
                <div class="title">{{ fd.title }}</div>
            </div>
        </div>
        <n-drawer v-model:show="showDrawer" :width="502">
            <n-drawer-content closable>
                <template #header>
                    {{ showDrawerData.title }}
                    <n-tag type="success" round :bordered="false">
                        {{ showDrawerData.likes }}
                        <template #icon>
                            <svg width="15" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
                                <path
                                    d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7c0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311h-.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4c47.6-20.3 78.3-66.8 78.3-118.4c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c-.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z"
                                    fill="currentColor"></path>
                            </svg>
                        </template>
                    </n-tag>
                </template>
                <img :src="showDrawerData.url" alt="" draggable="false" />
                <p class="drawerP">
                    {{ showDrawerData.cons }}
                </p>
            </n-drawer-content>
        </n-drawer>
    </div>
</template>

<style scoped>
.foods {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.likesTopic {
    position: fixed;
    top: 13rem;
    right: 0;
    width: 0;
    height: 0;
    transition: .3s ease;
    -moz-user-select: none;
    /*mozilar*/
    -webkit-user-select: none;
    /*webkit*/
    -ms-user-select: none;
    /*IE*/
    user-select: none;
}

.likesTopic.active {
    width: 300px;
    height: 300px;
    background-color: #fff;
    opacity: 0.5;
    z-index: 100;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
}

.likesTopic:hover {
    opacity: 1;
    box-shadow: 0 0 15px rgba(2, 191, 131, 0.2);
}

.likesTopic .btn {
    width: 108px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: -4.6rem;
    background: #02bf83;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 4px 10px;
    font-size: 15px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    gap: 10px;
    opacity: 0.5;
    z-index: 10;
    transition: width .4s ease,
        color .4s ease,
        right .4s ease;
}

.likesTopic .btn:hover {
    right: -1.8rem;
    opacity: 1;
}

.likesTopic .btn span:first-of-type {
    width: 17px;
    height: 20px;
}

.n-badge--dot {
    position: absolute;
    top: 0;
    left: 0;
}

.likesTopic.active .btn {
    cursor: auto;
    width: 300px;
    padding-left: 15px;
    padding-top: 5px;
    border-bottom: 1px dashed #02bf8350;
    border-bottom-left-radius: 0;
    justify-content: start;
    right: 0 !important;
    opacity: 1 !important;
    background: transparent;
    color: #02bf83;
}

.likesTopic .btn .close {
    cursor: pointer;
    margin-left: auto;
    width: 20px;
    height: 20px;
    opacity: 0;
    visibility: hidden;
    transform: rotate(0deg);
}

.likesTopic.active .btn .close {
    opacity: 1;
    visibility: visible;
}

.likesTopic .btn .close:hover {
    transform: rotate(90deg);
    transition: .4s ease;
}

#echarts {
    margin-left: 5px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

#echarts div {
    width: 300px;
    height: 280px;
}

.foods>.title {
    width: 50%;
}

.foods-contents {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 40px;
}

.foods-contents>div {
    position: relative;
    cursor: pointer;
    width: 20%;
}

.foods-contents>div .likes {
    --likes-width: 35px;
    position: absolute;
    bottom: 0.4rem;
    right: 1rem;
    width: var(--likes-width);
    height: var(--likes-width);
    background: rgba(2, 191, 131, 0.2);
    color: rgb(2, 191, 131);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    opacity: 0.6;
    transition: .4s ease;
}

.foods-contents>div .likes:hover {
    opacity: 1;
}

.foods-contents>div .likes.active {
    animation: likeOutLine 0.4s ease forwards !important;
    opacity: 1 !important;
}

@keyframes likeOutLine {
    0% {
        outline: 0px solid rgba(2, 191, 131, 0);
    }

    50% {
        outline: 4px solid rgba(2, 191, 131, 0.3);
    }

    100% {
        outline: 8px solid rgba(2, 191, 131, 0);
    }
}

.foods-contents>div .likes span {
    display: block;
    width: calc(var(--likes-width) / 1.3);
    height: calc(var(--likes-width) / 1.3);
    transform-origin: left bottom;
}

.foods-contents>div .likes.active span {
    animation: likeTrans 0.3s ease forwards;
}

@keyframes likeTrans {
    0% {
        transform: translateY(0) rotate(0);
    }

    50% {
        transform: translateY(-5px) rotate(-5deg);
    }

    100% {
        transform: translateY(0) rotate(0);
    }
}

.foods-contents>div:hover .imgView img {
    transform: scale(1.2);
}

.foods-contents .imgView {
    height: 250px;
    overflow: hidden;
}

.foods-contents .imgView img {
    transition: .4s ease;
}

.foods-contents .title {
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
    text-align: center;
    font-size: 18px;
}

.drawerP {
    --drawer-p: 18px;
    font-size: var(--drawer-p);
    line-height: calc(var(--drawer-p) * 1.5);
}

@media (max-width: 1536px) {
    .foods-contents>div {
        width: 30%;
    }

    .foods>.title {
        width: 70%;
    }
}

@media (max-width: 1080px) {
    .foods-contents>div {
        width: 40%;
    }

    .foods>.title {
        width: 80%;
    }
}

@media (max-width: 876px) {
    .foods-contents>div {
        width: 60%;
    }

    .foods>.title {
        width: 90%;
    }
}

@media (max-width: 696px) {
    .foods-contents>div {
        width: 80%;
    }

    .foods>.title {
        width: 100%;
    }
}

@media (max-width: 540px) {
    .foods-contents>div {
        width: 100%;
    }
}
</style>
