<template>
    <q-layout>
   <q-page-container>
            <router-view v-slot='{ Component }'>
                <Transition name='fade'>
                    <component v-if="ifLoginMount" :is="Component" />
                </Transition>
            </router-view>
    </q-page-container>
</q-layout>
</template>

<script setup lang="ts">
    import {ref, onMounted, onUnmounted} from 'vue';
    let ifLoginMount = ref(false)
    onMounted(() =>
        setTimeout(() => {
            ifLoginMount.value = true
        }, 100)
    )
    onUnmounted(() => 
        setTimeout(() => {
            ifLoginMount.value = false
        }, 100)
    )
</script>

<style scoped lang='scss'>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to  {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
    opacity: 1;
}

</style>
