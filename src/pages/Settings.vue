<template>
    <Transition name='fade'>
    <div v-if='ifSettingsMount' class='bg-neutral-900 rounded-lg w-auto h-auto p-4 mt-2'>
        <ul class="border-class menu bg-neutral-900 border-current border rounded-box">
  <li>
    <details class='font-bold'>
      <summary class='text-white' @click="drawer === true ? (drawer = false) : (drawer = true)">
      {{ getItem<string>("language") === "ru" ? "Язык":
         "Language"}}
      </summary>
      <TransitionGroup name='fade'>
      <ul v-show="drawer" v-for="item in items" :key='item.key'>
        <li @click="selectLanguage(item.key)">
            <a class='text-slate-200' :class="getItem<string>('language') === item.key ? 'bg-neutral-800': ''">
                {{ item.title }}
            </a>
        </li>
      </ul>
      </TransitionGroup>
    </details>
  </li>
</ul>  
    </div>
    </Transition>
</template>

<script lang='ts' setup>
    import {ref, onMounted} from 'vue';
    import { setItem, getItem } from 'src/utils/localStorage';
    let drawer = ref(false)
    let ifSettingsMount = ref(false) 
    onMounted(() => 
        setTimeout( () => {
            ifSettingsMount.value = true
        }, 100)
    )
    const items = ref([
        {title: "English", key: "en"},
        {title: "Russian", key: "ru"},
    ])
    function selectLanguage(key: string): void {
        setItem<string>('language', key)
        location.reload()
    }
</script>

<style scoped lang='scss'>
details > summary:active, a:active {
    background-color: #272727 !important;
}

.fade-enter-active {
    transition: opacity 0.2 ease;
}

.fade-enter-from {
    opacity: 0
}

.fade-enter-to {
    opacity: 1
}

.border-class {
    border-color: white;
    border-width: 1px;
}

</style>
