<script setup>
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWeixin, faWeibo, faTiktok } from '@fortawesome/free-brands-svg-icons'

</script>

<template>
    <footer>
        <ul>
            <li>
                <FontAwesomeIcon :icon="faWeixin" />
            </li>
            <li>
                <FontAwesomeIcon :icon="faWeibo" />
            </li>
            <li>
                <FontAwesomeIcon :icon="faTiktok" />
            </li>
        </ul>
        <p>
            版权所有丨禁止盗版<br />
            潮州欢迎您！
        </p>
    </footer>
</template>

<style scoped>
footer {
    width: 100%;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: linear-gradient(to right, #02bf83, #00569b);
}

footer ul {
    display: flex;
    gap: 3rem;
}

footer ul li {
    cursor: pointer;
    color: #fff;
    font-size: 40px;
    opacity: 0.5;
    transform: translateY(0);
    transition: .4s ease;
}

footer ul li:hover {
    opacity: 1;
    transform: translateY(-0.2rem);
}

footer p {
    --footer-p: 14px;
    color: #fff;
    text-align: center;
    font-size: var(--footer-p);
    line-height: calc(1.5 * var(--footer-p));
}
</style>
