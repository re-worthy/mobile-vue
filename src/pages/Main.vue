<template>
    <Transition name='fade'>
    <div v-if='ifMainMount' class='flex justify-between bg-neutral-900 w-auto h-auto p-2 pr-4 pl-4 mt-4 rounded-lg text-white font-bold text-md'>
        <span>
         {{ getItem<string>("language") === "ru" ? "Баланс": "Balance" }} 
        </span>
        <span class='order-last'>
            $ 3999,99
        </span>
    </div>
    </Transition>
</template>


<script setup lang='ts'>
    import { getItem } from 'src/utils/localStorage';
    import {onMounted, ref} from 'vue';
    let ifMainMount = ref(false)
    onMounted(() => setTimeout(() => {
        ifMainMount.value = true
    }, 100))
</script>

<style scoped lang='scss'>

</style>
