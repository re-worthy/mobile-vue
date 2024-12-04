<template>
    <Transition name='fade'>
    <div v-if="ifMainMount">
    <div class='stats shadow flex justify-between bg-neutral-900 w-auto h-auto p-2 pr-3 pl-3 mt-2 rounded-lg text-white font-bold text-lg'>
      <div class="stat">
        <div class="stat-title text-lx text-white">
         {{ getItem<string>("language") === "ru" ? "Баланс": "Balance" }} 
        </div> 
            <div class="stat-value text-success text-2xl"> 
              {{ getItem<string>('currency') !== null ? getItem<string>('currency'): ''}} 3999,99 
            </div>
            <div class="stat-desc mt-1 text-white">
                {{ getItem<string>("language") === "ru" ? "На 25% больше": "More than 25% last month" }}
            </div>
        <div class="stat-actions">
            <button class="btn btn-outline btn-sm btn-success active:bg-emerald-950" onclick="my_modal_1.showModal()">
                {{ getItem<string>("language") === "ru" ? "Добавить транзакцию": "Add Transaction"}}
            </button>
        </div>
      </div>
    </div>
    <div>
        <div class="bg-neutral-900 w-auto rounded-lg text-white font-bold h-auto p-2 mt-4">
            <form class='flex justify-start flex-nowrap' @submit.prevent='handleSearchInput()'>
            <input v-model='searchInput' @input="handleReactiveInput" type="text" :placeholder="getItem<string>('language') === 'ru' ? 'Поиск': 'Search'" class="text-base input w-full input-bordered bg-neutral-900 p-4" />
            <button type='submit' class="btn w-auto btn-outline btn-success active:bg-emerald-950 ml-2">

  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"></path></svg>
                </button>   
            </form>
        </div>
    </div>
        <TransactionModal />
    </div>
    </Transition>
</template>


<script setup lang='ts'>
    import { getItem } from 'src/utils/localStorage';
    import TransactionModal from './../components/TransactionModal.vue';
    import {onMounted, ref} from 'vue';
    
    let searchInput = ref<string>('')
    let ifMainMount = ref<boolean>(false)
    
    onMounted(() => setTimeout(() => {
        ifMainMount.value = true
    }, 100))

    const handleReactiveInput = () => {
        handleSearchInput()
    }

    function handleSearchInput(): void {
        console.log(searchInput.value)
    }


</script>

<style scoped lang='scss'>

.fade-enter-active {
    transition: opacity 0.2 ease;
}

.fade-enter-from {
    opacity: 0
}

.fade-enter-to {
    opacity: 1
}

</style>
