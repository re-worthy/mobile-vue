<template>
    <Transition name='fade'>
    <div v-if="ifLoginMount" class='flex items-center justify-center h-auto font-bold'>
         <div class="w-auto h-auto bg-neutral-900 text-white rounded-lg p-2 pb-4 mb-4 ml-4 mr-4 translate-y-1/3">
        <div class='flex justify-center mb-8' >
            <label class="swap text-h5 mt-4 font-bold">
                <input type="checkbox" disabled :checked="auth_show === 'Sign In' ? true: false" />
                <div class="swap-on">Sign In</div>
                <div class="swap-off">Sign Up</div>
            </label> 
            </div> 
            <form @submit.prevent="submitAuthorization(auth_show)">
            <div class='flex justify-start pl-4 pr-4'> 
                    <input v-model='username' style='background-color: #363434;' type="text" placeholder="Username" class="mb-6 input w-full input-base-content"/>
                                    <input type='password' v-model='password' style='background-color: #363434;' placeholder="Password" class="input mb-6 w-full input-base-content">
                    <input :disabled="auth_show === 'Sign In'" type='password' v-model='password_repeat' style='background-color: #363434;' placeholder="Repeat Password" class="input input-transition w-full mb-6 input-base-content"/>
            </div>
            <div class='grid sm:grid-cols-2 md:grid-cols-4 p-4'>
                <div :class="resultSubmit.code > 0 ? 'tooltip-open tooltip tooltip-error mb-1': ''" :data-tip="resultSubmit.message"> 
</div>
                <button type='submit' class="btn btn-outline btn-success md:mr-4 mb-4 active:bg-emerald-950">Submit</button>
                <button class="btn btn-info btn-outline active:bg-sky-900" @click.prevent="changeAuthShow()">
                    {{  auth_show === 'Sign In' ? 'Sign Up':  'Sign In' }}
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
        setItem<string>("language", "en")
    })
    onMounted(() => setTimeout(() => {
        ifLoginMount.value = true
    }, 100))
    const router = useRouter()
    let ifLoginMount = ref<boolean>(false)
    let auth_show = ref<string>('Sign In')
    let password = ref<string>('');
    let username = ref<string>('');
    let password_repeat = ref<string>('')
    let resultSubmit = ref<Result>({
        code: 0,
        message: ''
    })
    type Result = {
        code: number;
        message: string;
    }
    function validateField(form: string): Result {
        if (username.value.trim().length < 6) {
            return {code: 5, message: "Username must be at least 6 chars."}
        } else if (password.value.trim().length < 6) {
            return {code: 1, message: "Password must be at least 6 chars."}
        }
        
        if (form === "Sign Up") {
            if (password_repeat.value.trim() !== password.value.trim()) {
                return {code: 2, message: 'The passwords do not match.'}
            }
        } 
        return {code: 3, message: ''}
        }

    function submitAuthorization(mode: string) {
        const result = validateField(mode)
        if (result.code === 3) { 
            setItem<string>("token", "token")
            router.push({ path: '/main' }) 
        }
        resultSubmit.value.message = result.message
        resultSubmit.value.code = result.code
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

.input-transition {
  transition: background-color 0.3s ease, opacity 0.3s ease;
}




</style>
