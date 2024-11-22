<template>
  <q-list v-for="item in items" :key="item.title_en">
    <Transition name='fade'>
    <div v-if='ifInfoMount' class='bg-neutral-900 rounded-lg w-auto h-auto p-4 mt-6' 
         @click.prevent='redirectClick(item.link)'
    >
      <q-item icon='info'>
        <q-item-section class='p-2'>
          <q-item-label class='text-lg text-white font-bold'>
            {{ getItem<string>("language") === "ru" ? item.title_ru:
                item.title_en
            }}
          </q-item-label>
          <q-item-label class='text-sm font-light text-white'>
           {{  getItem<string>("language") === "ru" ? item.description_ru:
               item.description_en
            }}
          </q-item-label>
        </q-item-section>
            <q-avatar class='mt-2' text-color="white" :icon="item.icon" />
        </q-item>
    </div>
    </Transition>
  </q-list>
</template>

<script setup lang='ts'>
    import {getItem} from 'src/utils/localStorage';
import {ref, onMounted} from 'vue';
    let ifInfoMount = ref(false) 
    onMounted(() => 
        setTimeout( () => {
            ifInfoMount.value = true
        }, 100)
    )
    const items = ref([
        { title_en: "GitHub", title_ru: "GitHub", icon: "code", description_en: "View open source code.", description_ru: "Открыть исходный код.",
          link: "https://github.com/readyyyk/worthy"},
        { title_en: "Donate", title_ru: "Донат",icon: "currency_bitcoin", description_en: "For a cup of coffee.", description_ru: "На чашечку кофе.",link: 'https://google.com' },
        { title_en: "License", title_ru: "Лицензия", icon: 'gpp_good', description_en: "Free license GPL-3.", description_ru: "Свободная лциензия GPL-3.",link: "https://www.gnu.org/licenses/gpl-3.0.en.html" }

    ])
    function redirectClick(link: string): void {
        window.open(link, '_blank');
    }
</script>
