<script setup lang="ts">
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import axios from 'axios';
import navbarMobile from '../components/navbar/navbarMobile.vue';
import navbarDesktop from '../components/navbar/navbarDesktop.vue';
import logo from '../components/logo.vue';

const isDesktop = useMediaQuery('(min-width: 1281px)');

interface NewsPreview {
    title: string;
    publishDate: string;
    imgURL: string;
}

const news = ref<NewsPreview[]>([]); // aqui tem que definir o tipo News
const error = ref<string>("");
const howManyPages = ref<number>(-1);
const currentPage = ref(1);

async function getNews() {
	const response = await axios.get(`https://financi.fly.dev/get-all-news?page=${1}&size=10`);
	
	const json = await response.data;
	
	howManyPages.value = json.pages;
	news.value = json.data;
}

console.log(getNews());

</script>

<template>  
    <div class="container">
        <div id="desktop" v-if = isDesktop>
            <nav id="navbarDesktop">
                <navbarDesktop/>
            </nav>
            <div id="content">
                <header>
                    <h3>Notícias</h3>
                </header>
                <div id="filter">
                    <img src="../assets/Filter.png">
                    <input type="text" placeholder="Filtrar">
                </div>
                <li v-for="{imgURL, publishDate, title } in news">
                    <div class="newsDesktop">
                        <img class="imgExample" :src="imgURL" alt="Imagem da notícia">
                        <div class="newsInfo">
                            <p class="title">{{ title }}</p> 
                            <p class="date">{{ new Date(publishDate).toLocaleDateString("pt-BR") }}</p>
                        </div>
                    </div>
                </li>
            </div>
            <footer>
                <logo/>
            </footer>
        </div>
        <div id="mobile" v-else>
            <div id="subContainer">
                <header>
                    <h3>Notícias</h3>
                    <div id="newsImg">
                        <img src="../assets/News.png" alt="Notícia">
                    </div>
                </header>
                <li v-for="{imgURL, publishDate, title } in news">
                    <div class="newsMobile">
                        <img class="imgExample" :src="imgURL" alt="Imagem da notícia">
                        <div class="newsInfo">
                            <p class="title">{{ title }}</p> 
                            <p class="date">{{ new Date(publishDate).toLocaleDateString("pt-BR") }}</p>
                        </div>
                    </div>
                </li>
            </div>
            <nav class="navbarMobile"> 
                <navbarMobile/>
            </nav>            
        </div>
    </div>
</template>

<style scoped>

    #content {
        display: flex;
        flex-direction: column;
        width: 55vw;
        background-color: #1E211E;
        padding: 0rem 3rem;
        gap: 1rem;
        border-radius: 0.5rem;
        min-height: 90vh;
    }

    .newsInfo {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow-x: hidden;
        padding-right: 1rem;
    }

    .newsMobile {
        display: flex;
        background-color: #1E211E;
        min-height: 5em;
        width: 100%;
        border-radius: 0.5em;
    }

    .newsDesktop {
        display: flex;
        background-color: #2B2E2B;
        min-height: 5em;
        width: 100%;
        border-radius: 0.5em;
    }

    #navbarDesktop {
        width: 100vw;
        padding-bottom: 2rem;
    }

    #subContainer {
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: start;
        justify-content: center;
        width: 100vw;
        padding: 0 1rem;
    }

    #desktop {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
    }

    #mobile {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
    }
    
    #filter {
        background-color: #2B2E2B;
        display: flex;
        border-radius: 0.3rem;
        padding: 0.4rem 0.4rem;
        max-width: 800px;
    }

    #newsImg {
        display: flex;
        align-items: center;
        justify-content: end;
        padding-right: 10%;
        width: 100%;
    }
    .imgExample {
        border-radius: 1.5rem;
        padding: 1rem;
        width: 5em;
        height: auto;
        aspect-ratio: auto 1/1;
    }
    .navbarMobile {
        position: fixed;
        bottom: 2em;
    }

    .container {
        display: flex;
        background-color: #222622;
        justify-content: center;
        padding-bottom: 10em;
        min-height: 100vh;
    }
    
    .trending {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 0.5em;
        background-color: #3D403D;
        font-weight: 600;
        padding: 0.4rem 0.8rem;
    }
    
    .title {
        font-size: medium;
        font-weight: 500;
        padding-top: 1.5em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    
    .author {
        padding-bottom: 1rem;
        font-size: medium;
        font-weight: 400;
        opacity: 0.5;
    }
    
    .date {
        text-align: left;
        width: 100%;
    }
    
    input {
        background-color: #2B2E2B;
        border-style: none;
        color: white;
        font-weight: 600;
        width: 60vw;
    }

    h3 {
        color: white;
        padding: 2rem 0rem;
        font-size: 1.5em;
    }
     
    li {
        list-style: none;
        color: white;
        width: 100%;
    }

    header {
        display: flex;
        width: 100%;
    }
    
</style>