<template>
    <Transition name='fade'>
    <div v-if='ifMainMount' class='stats shadow flex justify-between bg-neutral-900 w-auto h-auto p-2 pr-3 pl-3 mt-2 rounded-lg text-white font-bold text-lg'>
      <div class="stat">
        <div class="stat-title text-lx text-white">
         {{ getItem<string>("language") === "ru" ? "Баланс": "Balance" }} 
        </div> 
            <div class="stat-value text-success text-2xl"> 
              $ 3999,99 
            </div>
            <div class="stat-desc mt-1 text-white">
                21% more than last month
            </div>
        <div class="stat-actions">
            <button class="btn btn-outline btn-sm btn-success active:bg-emerald-950">Add Transaction</button>
        </div>
      </div>
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
