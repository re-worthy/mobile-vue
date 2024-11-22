<template>
    <Transition name='fade'>
    <div v-if="ifLoginMount" class='flex items-center justify-center h-screen'>
         <div class="w-auto h-auto bg-neutral-900 text-white rounded-lg   p-2 pb-4 m-4">

            <div class='flex justify-center' >
                <h1 class='text-h5 m-4'> 
                    {{ auth_show }}
                </h1>
            </div>
            <Transition name='fade'>
            <div :key='resultSubmit.message' v-if="resultSubmit.code !== 0" class='flex justify-start ml-5'>
                <h1 class='text-base font-extrabold mr-2'
                :class="resultSubmit.code > 0 ? 'text-rose-600' : 'text-green-600'"
                >
                    {{ resultSubmit.message }}
                </h1>
            </div>
            </Transition>
            <form @submit.prevent="auth_show == 'Sign In' ? submitLogin() : submitRegister()">
            <div class='flex justify-start pl-4 pr-4'>
                <input v-model='username' style='background-color: #363434;' type="text" placeholder="Username" class="mt-4 mb-6 input w-full input-base-content" />
                <input type='password' v-model='password' style='background-color: #363434;' placeholder="Password" class="input mb-6 w-full input-base-content">
                <Transition name='fade'>
                <input type='password' v-show="auth_show == 'Sign Up'" v-model='password_repeat' style='background-color: #363434;' placeholder="Repeat Password" class="input w-full mb-6 input-base-content"/>
                </Transition>
            </div>
            <div class='grid sm:grid-cols-2 md:grid-cols-4 p-4'>
                <button type='submit' class="btn btn-outline btn-accent md:mr-4 mb-4">Submit</button>
                <button class="btn btn-info btn-outline" @click.prevent="changeAuthShow()">
                    {{  auth_show == 'Sign In' ? 'Sign Up':  'Sign In' }}
                </button>
            </div>
             </form>
    </div>
    </div>
    </Transition>
</template>

<script setup lang='ts'>
    import {ref, onBeforeMount, onMounted} from 'vue';
    import { setItem, getItem } from 'src/utils/localStorage';
    import {useRouter} from 'vue-router';
    onBeforeMount(() => {
        if (getItem<string>('token')) {
            router.push('main')
        }
    })
    onMounted(() => setTimeout(() => {
        ifLoginMount.value = true
    }, 100))
    const router = useRouter()
    let ifLoginMount = ref(false)
    let auth_show = ref('Sign In')
    let password = ref('');
    let username = ref('');
    let password_repeat = ref('')
    let resultSubmit = ref({
        code: 0,
        message: ''
    })
    function validateField(form: string): string | number {
        if (password.value.trim().length < 6 || username.value.trim().length < 6) {
            return "Password and username must be at least 6 characters long."
        }
        if (form === "Sign Up") {
            if (password_repeat.value.trim() !== password.value.trim()) {
                return 'The passwords do not match.'
            }
        } 
        return 1
        }

    function submitLogin() {
        const result: string | number = validateField("Sign In")
        if (typeof result === 'number') {
            setItem<string>("token", "token")
             router.push({ path: '/main' }) 
        }
        else {
            resultSubmit.value.message = result
            resultSubmit.value.code = 1
        }
    }

    function submitRegister(): void {
        const result: string | number = validateField('Sign Up')
        if (typeof result === 'number') {
            setItem<string>('token', 'token')
            router.push({ path: '/main' }) 
        }
        else {
            resultSubmit.value.message = result
            resultSubmit.value.code = 2
        }
    }

    function changeAuthShow(): void {
        password.value = ''
        username.value = ''
        password_repeat.value = ''
        resultSubmit.value.message = ''
        resultSubmit.value.code = 0
        auth_show.value == 'Sign In' ? (auth_show.value = 'Sign Up'): (auth_show.value = 'Sign In')
    }
</script>

<style lang='scss' scoped>

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1; 
  }

</style>
