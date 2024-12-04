<template>
 <dialog id="my_modal_1" class="modal">
    <div class="modal-box bg-neutral-900 border border-white">
        <div class='text-white group font-bold'>
            <h3 class="text-lg flex justify-center mb-4">
                {{ getItem<string>("language") === "ru" ? "Новая транзакция": "New Income" }}
            </h3>
            <input type="number" v-model='amount' :placeholder="getItem<string>('language') === 'ru' ? 'Сумма': 'Amount'" class="border input bg-neutral-900 input-bordered w-full mb-4" />
            <input type="text" v-model='description' :placeholder="getItem<string>('language') === 'ru' ? 'Описание': 'Description'" class="input bg-neutral-900 input-bordered w-full mb-4" />
             <input type='datetime-local' v-model='datetime' class="input bg-neutral-900 input-bordered w-full mb-4" />
                <input type="text" v-model="tag" :placeholder="getItem<string>('language') === 'ru' ? 'Метки': 'Tags'" class="input bg-neutral-900 input-bordered w-full mb-4" @keydown.space.prevent='addTag(tag)' /> 
            <div class="badge badge-outline badge-info gap-2 mt-4 mr-2" v-for='(tagItem, index) in tags' :key="tagItem">
                <svg
                    @click.prevent="replaceTag(index)"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block h-4 w-4 stroke-current">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"></path>
                 </svg>
                    {{ tagItem }}
            </div>
            <div class='flex w-full mt-10'>
                    <form method='dialog' class='w-full'>
                        <button class='btn btn-outline w-full btn-success active:bg-emerald-950 text-xl mb-4'>
                                {{ getItem<string>("language") === "ru" ? "Добавить": "Add" }}
                        </button>
                        <button class="btn w-full btn-outline btn-error active:bg-rose-950 text-xl" 
                        @click="clearData()">
                            {{ getItem<string>("language") === "ru" ? "Закрыть": "Close" }}
                        </button>
                    </form>
            </div>
        </div>
    </div>
 </dialog>
</template> 

<script setup lang='ts'>
    import {getItem} from 'src/utils/localStorage';
    import { ref } from 'vue';
    
    let tag = ref<string>('')
    let description = ref<string>('')
    let amount = ref<number>()
    let datetime = ref<string>(new Date().toISOString().slice(0, 16))
    let tags = ref<string[]>([])
    
    function addTag(addedTag: string): void {
        if (addedTag.trim().length !== 0) { 
            const tagsArray = [...new Set(addedTag.split(" "))].filter(item => item).map(item => item.trim());
            tags.value = [...new Set([...tags.value, ...tagsArray])]
            tag.value = ''
        }
    }

    function clearData(): void {
        tag.value = ''
        tags.value = []
        description.value = ''
        amount.value = undefined
    }

    function replaceTag(id: number): void {
        tags.value.splice(id, 1)
    }
</script>

<style scoped lang='scss'>


</style>
