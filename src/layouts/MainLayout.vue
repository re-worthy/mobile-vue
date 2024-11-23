<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" class='h-36 w-auto'> 
      <q-footer reveal elevated class='rounded-lg'>
            <q-list class="btm-nav w-auto bg-neutral-900 m-2 rounded-lg">
                <q-item :active="false" :to='item.link' v-ripple="false" v-for='item in drawer_items' :key='item.icon'>
                    <q-item-section>
                        <button to="item.link">
                            <q-icon size="1.5rem" :style="useRoute().fullPath === item.link ? 'color: oklch(var(--su))': ''" :name='item.icon'/>
                        </button>
                    </q-item-section>
                </q-item> 
            </q-list>
      </q-footer>
      <q-page-container>
            <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
    import { getItem } from 'src/utils/localStorage';
    import {ref, onMounted, onBeforeMount } from 'vue';
    import { useRouter, useRoute  } from 'vue-router';
    const router = useRouter()
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
    const drawer_items = ref([
        {icon: "home", link: '/main'},
        {icon: 'settings', link: '/settings'},
        {icon: 'info', link: '/info'},
        {icon: "logout", link: '/login'},
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
