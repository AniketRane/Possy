<template>
  
  <POSLayout :showRightSidebar="true" :showSideNavs="true">
    
    <fwb-modal  class="variant-modal" v-if="variantModal" @close="() => { variantModal = false }" position="center" size="md">
      <template #header>
        <div class="flex items-center text-lg">
          Select variant of {{ selectedItem.name }}
        </div>
      </template>
      <template #body>
        <div>

          <RadioButtonGroup v-model="selectedItemVariant">
            <RadioButton v-for="(variant, i) in selectedItem.variants" :key="i" :value="variant.id">
              <div class="flex gap-2">
                <div class="grow">{{ variant.name }}</div>
                <div>₹{{ variant.price }}</div>
              </div>
            </RadioButton>
          </RadioButtonGroup>

          <fwb-button class="w-full mt-4" @click="addVariant">
            Add Variant
          </fwb-button>

        </div>
      </template>
    </fwb-modal>

    <template #bottom>
      <div class="p-2 flex gap-3 justify-center">
        
          <fwb-button class="" color="alternative" @click="save">
            <div class="flex items-center gap-2">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" /><path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 4l0 4l-6 0l0 -4" /></svg>
              Save
              <span class="text-xs bg-pink-200 text-pink-800 px-1 py-[.1rem] rounded">
                Ctrl+S
              </span>
            </div>
          </fwb-button>
          <fwb-button class="" color="alternative" @click="print2">
            <div class="flex items-center gap-2">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-printer"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>
              Print
              <span class="text-xs bg-pink-200 text-pink-800 px-1 py-[.1rem] rounded">
                Ctrl+P
              </span>
            </div>
          </fwb-button>
          <fwb-button class="" color="alternative" @click="newKot">
            <div class="flex items-center gap-1">
              <div>KOT</div>
              <fwb-badge type="pink">Ctrl+K</fwb-badge>
            </div>
          </fwb-button>
          <fwb-button class="" color="alternative" @click="newKotAndPrint">
            <div class="flex items-center gap-1">
              <div>KOT + Print</div>
              <fwb-badge type="pink">Ctrl+L</fwb-badge>
            </div>
          </fwb-button>

      </div>
    </template>

    <template #rightSidebar>
      
      <div class="flex flex-col h-full">

        <div class="bg-white dark:bg-gray-800 flex items-center border-b dark:border-gray-700">
          
          <div class="flex w-full">
            <div class="grow p-4 border-r dark:border-gray-700">
              <div class="font-bold">Table {{ route.params.table }}</div>
              <div class="text-xs text-gray-400">
                {{ new Date().toLocaleString() }}
              </div>
            </div>
            <div class="flex items-center">
              <button class="px-6 hover:bg-green-500 hover:text-white h-full">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
              </button>
            </div>
          </div>

        </div>

        <div ref="orderItemHolder" class="grow overflow-y-auto">

          <div class="p-6 flex flex-col gap-2">

            <template v-for="(kot, k) in orderItems" :key="k">
              <div class="bg-white rounded-lg p-4 dark:bg-gray-800">
                <div class="flex">
                  <div class="flex items-center grow">
                    <fwb-badge v-if="kot.saved">
                      KOT {{ k+1 }}
                    </fwb-badge>
                    <fwb-badge v-else-if="orderItems.length > 1" type="yellow">
                      New KOT
                    </fwb-badge>
                    <div class="text-xs text-gray-400">
                      {{ kot.timestamp }}
                    </div>
                  </div>
                  <fwb-button v-if="kot.saved" color="alternative" size="xs" @click="printKot(k)">
                    <span class="flex items-center gap-1">
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-printer"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>
                      Print
                    </span>
                  </fwb-button>
                </div>
                <table class="order-item__table">
                  <tr v-if="kot.items.length == 0">
                    <td class="text-xs text-gray-400" colspan="3">
                      <i>Add items to the order</i>
                    </td>
                  </tr>
                  <tr v-else v-for="(item, i) in kot.items" :key="i">
                    <td>
                      <div class="flex items-center gap-3">
                        <button v-if="!kot.saved" class="text-red-500" @click="removeItem(k, i)">
                          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                        </button>
                        <div>
                          <div>
                            {{ item.name }} <span v-if="item.variant">- {{ item.variant }}</span>
                          </div>
                          <div class="text-xs text-gray-500">₹{{ item.price }} x {{ item.quantity }}</div>    
                        </div>
                      </div>
                    </td>
                    <td>
                      <QualityControl v-if="!kot.saved" v-model="item.quantity" />
                    </td>
                    <td>
                      <div class="flex justify-center">
                        <button v-if="!kot.saved" class="text-gray-500">
                          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-notes"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M9 7l6 0" /><path d="M9 11l6 0" /><path d="M9 15l4 0" /></svg>
                        </button>
                      </div>
                    </td>
                    <td class="text-end">
                      ₹{{ item.price * item.quantity }}
                    </td>
                  </tr>
                </table>
              </div>
            </template>

            
          </div>

          

        </div>

        <div class="bg-white dark:bg-gray-800 px-6 py-2 border-t dark:border-gray-700">
          
          <div>
            <table class="w-full">
              <tr class="text-sm">
                <td>Subtotal</td>
                <td class="text-end">₹ {{ subtotal }}</td>
              </tr>
              <tr class="text-sm text-gray-400">
                <td>Tax</td>
                <td class="text-end">₹ {{ tax }}</td>
              </tr>
              <tr class="font-bold">
                <td>Total</td>
                <td class="text-end">₹ {{ total }}</td>
              </tr>
            </table>
          </div>

          

        </div>
      </div>
    </template>

    <div class="h-full flex flex-col">
      <div class="py-2 px-4 border-b dark:border-gray-700">
        <div class="grid grid-cols-2 gap-3 py-4">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 flex gap-1">
              <fwb-badge type="pink">Ctrl+F</fwb-badge>
              Search Item
            </label>
            <fwb-input ref="primarySearchRef" v-model="primarySearch" @input="onPrimarySearch"></fwb-input>
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 flex gap-1">
              <fwb-badge type="pink">Ctrl+D</fwb-badge>
              Shortcode
            </label>
            <fwb-input ref="codeSearchRef" v-model="codeSearch" @input="onCodeSearch"></fwb-input>
          </div>
        </div>
        <div class="flex gap-2 flex-wrap">
          <div v-for="(category, i) in categories" :key="i" class="py-2 px-4 rounded-full border cursor-pointer" @click="selectMenuItem(category.id)"
            :class="[ (selectedCategory == category.id) ? 'bg-blue-700 border-blue-500 text-white' : 'bg-white dark:bg-gray-800 dark:border-gray-700' ]"
            :tabindex="i == 0 ? 0 : -1">
            <div>
              {{ category.name }}
            </div>
          </div>
        </div>
      </div>
      <div id="group-0" class="p-3 grow overflow-y-auto">
        <div class="grid-container">
          <DishCard data-card-grid v-for="(item, i) in filterDishes" :key="i" :item="item" @click.stop="addOrderItem(item)" :tabindex="i == 0 ? 0 : -1"/>
        </div>
      </div>

    </div>

    


  </POSLayout>

</template>
<script setup>
import POSLayout from "@/layouts/POSLayout.vue";
import { useMenuStore } from "@/store/menu";
import { FwbInput, FwbButton, FwbBadge, FwbModal, FwbTooltip } from 'flowbite-vue'
import { computed, onMounted, ref, watch } from "vue";
import QualityControl from "@/components/QuantityControl.vue";
import NegativeTone from "./../assets/wav/negative-tone.wav";
import DeleteTone from "./../assets/wav/delete-tone.wav";
import hotkeys from 'hotkeys-js';
import DishCard from "./../components/DishCard.vue";
import { Howl } from 'howler';
import { useSettingsStore } from "@/store/settings";
import { FwbListGroup, FwbListGroupItem, FwbRadio } from 'flowbite-vue'
import { createApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import Receipt from './../components/Receipt.vue';
import { useRestaurantStore } from "../store/restaurant";
import receiptCss from "./../scss/receipt.css?inline";
import kotReceiptCss from "./../scss/kot_receipt.css?inline";
import dayjs from "dayjs";
import KOTReceipt from "../components/KOTReceipt.vue";
import { useRoute } from "vue-router";
import { useOrdersStore } from "../store/orders";
import { GridNavigator } from 'grid-navigator'

import RadioButton from "../components/RadioButton/RadioButton.vue";
import RadioButtonGroup from "../components/RadioButton/RadioButtonGroup.vue";

const elementsProvider = () => document.querySelectorAll('[data-card-grid]');

const selectCallback = (e, selectNow) => {
  if (selectNow){
    e.tabIndex = 0
    e.focus()
  } else e.tabIndex = -1
}

onMounted(() => {

// setTimeout(() => {
  const myNav = new GridNavigator({ elementsProvider, selectCallback })
  const grid  = document.getElementById('group-0')
  grid.addEventListener('keydown', (e) => {
    if (myNav.onKeyDown(e)) e.stopImmediatePropagation()
  })
// }, 6000)

})

const route = useRoute();

const settingsStore = useSettingsStore();
const restaurantStore = useRestaurantStore();
const menu = useMenuStore();

const ordersStore = useOrdersStore();

const selectedCategory = ref(0);
const primarySearchRef = ref(null);
const codeSearchRef = ref(null);
const primarySearch = ref(null);
const codeSearch = ref(null);

const orderItems = ref([]);

const temp = ref(null);

if(ordersStore.tables[route.params.table]?.data) {
  orderItems.value = ordersStore.tables[route.params.table].data;
}else{
  orderItems.value = [{
    items: [],
    saved: false,
    timestamp: null,
  }];
}

const orderItemHolder = ref(null);

const variantModal = ref(false);

const selectedItem = ref(null);
const selectedItemVariant = ref(null);

Howler.volume(settingsStore.volume / 100);

var itemAddedTone = new Howl({
  src: [NegativeTone]
});

var itemDeletedTone = new Howl({
  src: [DeleteTone]
});

const selectMenuItem = (id) => {
  primarySearch.value = '';
  selectedCategory.value = id;
}

const scrollToBottom = () => {
  setTimeout(() => {
    const element = orderItemHolder.value;
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  }, 100);
}

const addOrderItem = (item) => {
  if('variants' in item) {
    selectedItem.value = item;
    variantModal.value = true;
  }else{
    let kotIndex = orderItems.value.length - 1;
    let index = orderItems.value[kotIndex].items.findIndex(i => i.id == item.id);
    if(index == -1) {
      orderItems.value[kotIndex].items.push({ ...item, quantity: 1 });
    }else{
      orderItems.value[kotIndex].items[index].quantity += 1;
    }
    if(settingsStore.sound) itemAddedTone.play();
    scrollToBottom();
  }
}

const addVariant = () => {

  let kotIndex = orderItems.value.length - 1;

  let index = orderItems.value[kotIndex].items.findIndex(i => {
    return i.id == selectedItem.value.id && i.variant_id == selectedItemVariant.value;
  });

  let selectedVariant = selectedItem.value.variants.find(v => v.id == selectedItemVariant.value);

  if(!selectedVariant) return

  if(index == -1) {
    orderItems.value[kotIndex].items.push({
      id: selectedItem.value.id,
      name: selectedItem.value.name, 
      price: selectedItem.value.price,
      quantity: 1,
      variant_id: selectedVariant.id,
      variant: selectedVariant.name
    });
  }else{
    orderItems.value[kotIndex].items[index].quantity += 1;
  }
  if(settingsStore.sound) itemAddedTone.play();

  variantModal.value = false;

  scrollToBottom();
}

const subtotal = computed(() => {
  let total = 0;
  orderItems.value.forEach(menuItem => {
    menuItem.items.forEach(item => {
      total += item.price * item.quantity;
    });
  });
  return total.toFixed(2);
})

const tax = computed(() => {
  return (subtotal.value * 0.18).toFixed(2);
})

const total = computed(() => {
  return (Number.parseFloat(subtotal.value) + Number.parseFloat(tax.value)).toFixed(2);
})

const removeItem = (kotIndex, index) => {
  orderItems.value[kotIndex].items.splice(index, 1);
  if(settingsStore.sound) itemDeletedTone.play();
}

const newKot = () => {
  orderItems.value[orderItems.value.length - 1].saved = true;
  orderItems.value[orderItems.value.length - 1].timestamp = new Date().toLocaleString();
  orderItems.value.push({
    items: [],
    saved: false,
    timestamp: null,
  });
  scrollToBottom();
}

hotkeys.filter = function(event) {
  return true;
}

hotkeys('ctrl+f', function(event, handler) {
  event.preventDefault()
  focusSearch();
});

hotkeys('ctrl+d', function(event, handler) {
  event.preventDefault()
  focusCodeSearch();
});


hotkeys('ctrl+k', function(event, handler) {
  event.preventDefault()
  newKot();
});

hotkeys('ctrl+l', function(event, handler) {
  event.preventDefault()
  newKotAndPrint();
});

hotkeys('ctrl+p', function(event, handler) {
  event.preventDefault()
  print();
});

const focusSearch = () => {
  let input = primarySearchRef.value.$el.querySelector('input');
  input.focus();
}

const focusCodeSearch = () => {
  let input = codeSearchRef.value.$el.querySelector('input');
  input.focus();
}

const onCodeSearch = () => {
  if(codeSearch.value.length == 3) {
    const dish = findDishByShortcode(codeSearch.value.toLocaleUpperCase());
    if (dish) {
      addOrderItem(dish);
      codeSearch.value = '';
    }
  }
}

const findDishByShortcode = (shortcode) => {
  return menu.items.find(item => item.shortcode == shortcode);
}

const filterDishes = computed(() => {
  let filterDishes = [];
  if(primarySearch.value && primarySearch.value.length > 0) {
    for (const dish of menu.items) {
      if (dish.name.toLocaleLowerCase().includes(primarySearch.value.toLocaleLowerCase())) {
        filterDishes.push(dish);
      }
    } 
    return filterDishes;
  }
  if(selectedCategory.value == 0){
    return menu.items;
  }
  return menu.items.filter(item => item.category_id === selectedCategory.value );
})

const categories = computed(() => {
  return [
    { "id": 0, "name": "All" },
    ...menu.categories
  ];
})

async function generateHTML() {
  const app = createApp(Receipt, {
    order_id: '1234',
    date: dayjs().format('DD MMM YY, hh:mm A'),
    table: '4',
    items: getOrderItemsArray(),
    subtotal: subtotal.value,
    tax: tax.value,
    total: total.value,
    restaurant: restaurantStore
  });
  const html = await renderToString(app);
  const fullHTML = `
    <html>
      <head>
        <style>${receiptCss}</style>
      </head>
      <body>${html}</body>
    </html>
  `;
  return fullHTML;
}

function getOrderItemsArray() {
  const combinedItems = {};
  orderItems.value.forEach(kot => {
    kot.items.forEach(item => {
        if (combinedItems[item.id]) {
            combinedItems[item.id].quantity += item.quantity;
        } else {
            combinedItems[item.id] = { 
              name: item.name,
              price: item.price,
              quantity: 1,
            };
        }
    });
  });
  return Object.values(combinedItems);
}

const print = () => {
  generateHTML().then(html => {
    window.api.printHtml(html)
  });
}

const print2 = () => {

  // printerName: settingsStore.receiptPrinter,

  
  window.api.getPath('appData').then(a => {
    console.log(a);
  });

  return;

  const options = {
    preview: false,
    margin: '0 0 0 0',
    copies: 1,
    timeOutPerLine: 400,
    pageSize: '58mm' // page size
  }

  const data = [
    {
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: 'SAMPLE HEADING',
        style: {fontWeight: "700", textAlign: 'center', fontSize: "24px"}
    },{
        type: 'table',
        // style the table
        style: {border: '1px solid', fontWeight: "500"},
        // list of the columns to be rendered in the table header
        tableHeader: ['Animal', 'Age'],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [
            ['Cat', 2],
            ['Dog', 4],
            ['Horse', 12],
            ['Pig', 4],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: ['Animal', 'Age'],
        // custom style for the table header
        tableHeaderStyle: { color: 'black'},
        // custom style for the table body
        tableBodyStyle: {'border': '1px solid'},
        // custom style for the table footer
        tableFooterStyle: { color: 'black'},
    }
  ]
  window.api.printPOS({
    data: data,
    options: options
  })
}

async function generateKOTHTML(index, items) {
  const app = createApp(KOTReceipt, {
    kot: (index + 1),
    order_id: '1234',
    date: dayjs().format('DD MMM YY'),
    time: dayjs().format('hh:mm A'),
    table: '4',
    items: items
  });
  const html = await renderToString(app);
  const fullHTML = `
    <html>
      <head>
        <style>${kotReceiptCss}</style>
      </head>
      <body>${html}</body>
    </html>
  `;
  return fullHTML;
}

const printKot = (index) => {
  const combinedItems = {};
  orderItems.value[index].items.forEach(item => {
    if (combinedItems[item.id]) {
        combinedItems[item.id].quantity += item.quantity;
    } else {
        combinedItems[item.id] = { 
          name: item.name,
          price: item.price,
          quantity: 1,
        };
    }
  });
  const items = Object.values(combinedItems);
  generateKOTHTML(index, items).then(html => {
    window.api.printHtml(html)
  });
}

const newKotAndPrint = () => {
  newKot();
  printKot(orderItems.value.length - 2);
}


const onPrimarySearch = () => {
  console.log("onPrimarySearch");
  selectedCategory.value = 0;
}

const save = () => {
  let orderDetails = {
    timestamp: Date.now(),
    data: orderItems.value
  }
  if(ordersStore.tables[route.params.table]) {
    orderDetails.timestamp = ordersStore.tables[route.params.table].timestamp;
  }
  ordersStore.tables = {
    ...ordersStore.tables,
    [route.params.table]: orderDetails
  }
}

watch(variantModal, () => {
  if(variantModal.value) {

  } else {
    selectedItem.value = null;
    selectedItemVariant.value = null;
  }
})

</script>