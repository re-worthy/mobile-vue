<template>
  <div class="q-pa-md">
        <q-layout view="hHh Lpr lff">

    <Transition name='fade'>
    <q-header v-if="isHeaderVisible" elevated class='rounded-lg bg-neutral-900 m-2'>
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
                    <Transition name='fade'>
                        <q-toolbar-title class='font-extrabold ml-2' :key="useRoute().fullPath">
                           {{ getCorrectLanguageTitle }} 
                        </q-toolbar-title>
                    </Transition>
        </q-toolbar>
      </q-header>
      </Transition>
  <q-drawer
        v-model="drawer"
        class='w-auto bg-neutral-900 text-white'
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list" v-for='item in drawer_items' :key='item.title_en'>
          <div class='mt-2 pb-4'>
            <q-item clickable v-ripple :to='item.link'>
              <q-item-section avatar> 
                <q-icon :name='item.icon' />
              </q-item-section>
              <q-item-section @click="item.title_en === 'Log Out' ? handleLogOut() : null" class='text-base font-bold'>
                {{ getItem<string>('language') === "ru" ? item.title_ru:
                   item.title_en 
                }}
              </q-item-section>
            </q-item>
            </div>
            </q-list>
        </q-scroll-area>
      </q-drawer>
            <q-page-container>
                <router-view/>
            </q-page-container>
        </q-layout>
  </div>
</template>

<script setup lang="ts">
    import { getItem, removeItem } from 'src/utils/localStorage';
    import {ref, onMounted, onBeforeMount, computed } from 'vue';
    import { useRouter, useRoute  } from 'vue-router';
    const router = useRouter()
    function handleLogOut(): void {
        removeItem('token')
        router.push('login')
    } //
    const getCorrectLanguageTitle = computed<string>(() => {
        const language = getItem<string>("language")
        if (language === 'ru') {
            return useRoute().fullPath === "/main" ? "Worthy":
                   useRoute().fullPath === "/settings" ? "Настройки":
                   "Информация"
        } else {
            return useRoute().fullPath === "/main" ? "Worthy":
                   useRoute().fullPath === "/settings" ? "Settings":
                   "Information"
        }
    })

    onBeforeMount((): void => {   
        if (!getItem<string>('token')) {
            router.push('login')
        }
    })
    let isHeaderVisible = ref(false)
    onMounted((): void => {
        setTimeout((): void => {
            isHeaderVisible.value = true
        }, 100)
    })
    let drawer = ref(false);
    const drawer_items = ref([
        {title_en: "Main", title_ru: "Главная", icon: "home", link: '/main'},
        {title_en: "Settings", title_ru: "Настройки", icon: 'settings', link: '/settings'},
        {title_en: "Info", title_ru: "Информация", icon: 'info', link: '/info'},
        {title_en: "Log Out", title_ru: "Выйти", icon: "logout", link: '/login'},
    ])
</script>

<style lang='scss'>
.q-layout__shadow {
  width: 0%;
}

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
    opacity: 1
}
</style>
