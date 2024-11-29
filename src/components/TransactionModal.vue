<template>
 <dialog id="my_modal_1" class="modal">
    <div class="modal-box bg-neutral-900 border border-white">
        <div class='text-white group font-bold'>
            <h3 class="text-lg flex justify-center mb-4">New Income</h3>
            <input type="number" v-model='amount' placeholder="Amount" class="input bg-neutral-900 input-bordered w-full mb-4" />
            <input type="text" v-model='description' placeholder="Description" class="input bg-neutral-900 input-bordered w-full mb-4" />
             <input type="text" v-model='datetime' placeholder="Datetime" class="input bg-neutral-900 input-bordered w-full mb-4" />
            <form @submit.prevent='addTag(tag)' class='flex flex-nowrap'>
                <input type="text" v-model="tag" placeholder="Tag" class="input bg-neutral-900 input-bordered w-3/4 max-w-xs mr-4" />
                <button class='btn btn-outline btn-info ml-4 w-1/4 active:bg-sky-950'>
                    +
                </button>
            </form>
            <p class='mt-4 ml-1 text-sm text-info'> 
                {{ tags.join(", ") }}
            </p>
            <div class='flex w-full mt-16'>
                    <form class='w-8/12 mr-2'>
                        <button class='btn btn-outline w-full btn-success active:bg-emerald-950'>
                            Add
                        </button>
                    </form>
                    <form method='dialog' class='w-1/4'>
                        <button class="btn w-full btn-outline btn-error active:bg-rose-950 ml-4" @click="clearData()">Close</button>
                    </form>
            </div>
        </div>
    </div>
 </dialog>
</template>

<script setup lang='ts'>
    import { ref } from 'vue';
    let tag = ref<string>('')
    let description = ref<string>('')
    let amount = ref<number>()
    let datetime = ref()
    let tags = ref<string[]>([])
    function addTag(addedTag: string): void {
        if (addedTag.trim().length !== 0) { 
            const tagsArray = [...[...new Set(addedTag.split(" "))].filter(item => item).map(item => item.trim())];
            tags.value = [...new Set([...tags.value, ...tagsArray])]
        }
    }

    function clearData(): void {
        tag.value = ''
        tags.value = []
        description.value = ''
        amount.value = undefined
    }
</script>
