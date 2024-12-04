<template>
    <Transition name='fade'>
    <div v-show="ifSettingsMount">
    <div class='bg-neutral-900 rounded-lg w-auto h-auto p-4 mt-2'>
        <ul class="border-class menu bg-neutral-900 border-current border rounded-box">
  <li>
    <details class='font-bold'>
      <summary class='text-white text-lg' @click="drawer === true ? (drawer = false) : (drawer = true)">
      {{ getItem<string>("language") === "ru" ? "Язык": "Language"}}
      </summary>
      <TransitionGroup name='fade'>
      <ul v-show="drawer" v-for="item in items" :key='item.key'>
        <li @click="selectLanguage(item.key)">
            <a class='text-slate-200 text-base' :class="getItem<string>('language') === item.key ? 'bg-neutral-800': ''">
                {{ item.title }}
            </a>
        </li>
      </ul> 
      </TransitionGroup>
    </details>
  </li>
</ul> 
</div>
<div class='bg-neutral-900 rounded-lg w-auto h-auto p-4 mt-4 menu-currency'>
<ul class="border-class menu bg-neutral-900 border-current border rounded-box element-bar">
  <li>
    <details class='font-bold'>
      <summary class='text-white text-lg' onclick="my_modal_2.showModal()">
      {{ getItem<string>("language") === "ru" ? "Валюта":
         "Currency"}}
      </summary>
          </details>
  </li>
</ul> 
</div>
<dialog id="my_modal_2" class="modal">
  <div class="border-white border modal-box bg-neutral-900 translate-y-1/2 flex flex-row flex-nowrap overflow-x-auto no-scrollbar p-4"> 
        <p v-for="item in filteredListCurrency()" style='cursor: pointer;' :key='item.name' class='bg-neutral-900 font-bold text-lg border-r border-gray-200 pr-4 pl-4 hover:bg-neutral-800' @click="closeModal(item.currency.symbol)"
        :class="stateCurrency === item.currency.symbol ? 'text-success': 'text-white'"> 
            {{ item.currency.code }} 
        </p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>

    </button>
  </form>
</dialog>
</div>
</Transition>
</template>


<script lang='ts' setup>
    import {ref, onMounted} from 'vue';
    import { getCountryList } from "country-data-codes";
    import { setItem, getItem } from 'src/utils/localStorage';
    
    let stateCurrency = ref<string | null>(getItem<string>('currency'))
    let drawer = ref<boolean>(false)
    let ifSettingsMount = ref<boolean>(false) 
    
    const items = ref([
        {title: "English", key: "en"},
        {title: "Russian", key: "ru"},
    ])

    onMounted((): void => {
        setTimeout((): void => {
            ifSettingsMount.value = true
        }, 100)
    })

    function closeModal(symbol: string | boolean): void {
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
        setItem('currency', symbol)
        typeof symbol === "string" ? (stateCurrency.value = symbol): null
        modal.close() 
    }
    
    
    function filteredListCurrency(): ListCurrency[] {
        return getCountryList().filter((item, index, self) => {
            const isUnique = index === self.findIndex((t) => item.currency.symbol === t.currency.symbol);
            const isNotUniversalCurrency = item.currency.code !== "No Universal Currency";
            return isUnique && isNotUniversalCurrency;
        });
    }

    function selectLanguage(key: string): void {
        setItem<string>('language', key)
        location.reload()
    }

    type ListCurrency = {
        id: number,
        name: string,
        isoAlpha2: string,
        isoAlpha3: string,
        isoNumeric: number,
        currency: Currency,
        flag: string,
        callingCodes: string,
        languages: string[],
        emoji: string
    }
    type Currency = {
        code: string,
        name: string,
        symbol: string | boolean
    }
</script>



<style scoped lang='scss'>
details > summary:active, a:active {
    background-color: #272727 !important;
}

.menu-currency > .menu li > details > summary::after {
  display: none; 
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
div.scrollmenu {
  background-color: #333;
  overflow: auto;
  white-space: nowrap;
}

div.scrollmenu a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

div.scrollmenu a:hover {
  background-color: #777;
}
</style>
