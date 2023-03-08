<template>
    <div class="view_div">
        <el-calendar v-model="value">
            <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                </p>
            </template>
        </el-calendar>
    </div>
</template>

<script>
    export default {
        name: "zfjCalendar",
        data() {
            return {
                name: "demoView",
                value: new Date(),
            }
        }
    }
</script>

<style scoped>

</style>