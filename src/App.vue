<template>
    <div id="app">
        <div id="view">
            <transition name="el-fade-in-linear">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<style scoped>
    #app {
        background-color: pink;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    #view {
        overflow: auto;
        background-color: #d9d9d9;
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
</style>

