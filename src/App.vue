<script setup lang="ts">
import { NxtButton, NxtFireworks } from "@future-harry/nxt-styles";
import { ref } from "vue";
import { RouterView } from "vue-router";

const isEnd = ref(false);

function handleEnding() {
    isEnd.value = true;
    document.body.style.background = "black";
    document.body.style.color = "white";
    document.body.style.transition = "1s ease-in-out";
}
</script>

<template>
    <div class="app" :class="{ ending: isEnd }">
        <RouterView />
        <NxtFireworks v-if="isEnd" :enabled="true" />
        <NxtButton class="end-btn" @on-click="handleEnding">Einde</NxtButton>
    </div>
</template>

<style src="@future-harry/nxt-styles/dist/style.css"></style>

<style lang="scss" scoped>
.app {
    width: 100%;
    height: 100vh;
    padding: unset;
    margin: unset;
}

.end-btn {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
}
</style>
