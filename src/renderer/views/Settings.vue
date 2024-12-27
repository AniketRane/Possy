<script setup>
import POSLayout from '@/layouts/POSLayout.vue';
import { FwbSelect, FwbToggle, FwbRange, FwbTab, FwbTabs, FwbInput, FwbButton } from 'flowbite-vue'
import { onMounted, ref, watch } from 'vue';
import { useSettingsStore } from './../store/settings';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { toRaw } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';

const activeTab = ref('display');

const router = useRouter();
const notification = useNotification();

const fontSizes = [
    {
        value: 10, name: '10px'
    },
    {
        value: 12, name: '12px'
    },
    {
        value: 14, name: '14px'
    },
    {
        value: 16, name: '16px'
    },
    {
        value: 18, name: '18px'
    },
    {
        value: 20, name: '20px'
    },
    {
        value: 22, name: '22px'
    },
    {
        value: 24, name: '24px'
    },
]

const themeOptions = [
    {
        value: 'light', name: 'Light'
    },
    {
        value: 'dark', name: 'Dark'
    },
];

const printers = ref([]);
const fallbackPrinter = ref(null);

const settingsStore = useSettingsStore();


window.api.getPrinters().then((allPrinters) => {
    allPrinters.forEach(printer => {
        if(printer.isDefault) {
            fallbackPrinter.value = printer.name;
        }
        printers.value.push({
            value: printer.name,
            name: printer.name
        });
    })
});

const receiptPrinter = computed({
    get: () => {
        return settingsStore.receiptPrinter || fallbackPrinter.value;
    },
    set: (value) => {
        settingsStore.receiptPrinter = value;
    }
});

const kotPrinter = computed({
    get: () => {
        return settingsStore.kotPrinter || fallbackPrinter.value;
    },
    set: (value) => {
        settingsStore.kotPrinter = value;
    }
});

watch(() => settingsStore.onScreenKeyboard, (onScreenKeyboard) => {
    if(onScreenKeyboard) {
        router.go();
    }
});

const databaseConnection = ref({ ...settingsStore.databaseConnection })

const testConnection = async () => {
    const rawObject = Object.assign({}, databaseConnection);
    window.api.testDBConnection(toRaw(databaseConnection.value)).then(data => {

        let {connected, error} = data;
        
        if(connected) {
            notification.notify({
                title: "Connection successful",
                type: 'success'
            })
        }else{
            notification.notify({
                title: "Connection failed",
                text: error,
                type: 'error'
            })
        }
    });
}

const saveConnection = () => {
    settingsStore.databaseConnection = databaseConnection.value;
}




onMounted(() => {

})

</script>
<template>
    <POSLayout>
        <template #default>
            <div class="p-4">
                <h1 class="text-2xl font-semibold mb-4">Settings</h1>

                

                <fwb-tabs v-model="activeTab" variant="underline" class="p-5">
                    <fwb-tab name="display" title="Display">
                        <div class="w-[400px] bg-white rounded dark:bg-gray-800 px-6 py-6 flex flex-col gap-6">

                            <div class="flex items-center border-b dark:border-gray-700 pb-6">
                                <div class="grow">
                                    <div class="font-bold">On-screen keyboard</div>
                                    <div class="text-xs text-gray-500 mb-2">
                                        Enable or disable the on-screen keyboard
                                    </div>
                                </div>
                                <div>
                                    <fwb-toggle v-model="settingsStore.onScreenKeyboard"/>
                                </div>
                            </div>

                            <div class="border-b dark:border-gray-700 pb-6">
                                <div class="font-bold">Theme</div>
                                <div class="text-xs text-gray-500 mb-2">
                                    Set the theme for the application
                                </div>
                                <fwb-select v-model="settingsStore.theme" :options="themeOptions"/>
                            </div>
                            <div>
                                <div class="font-bold">Font size</div>
                                <div class="text-xs text-gray-500 mb-2">
                                    Set the font size for the application
                                </div>
                                <fwb-select v-model="settingsStore.fontSize" :options="fontSizes"/>
                            </div>
                        </div>
                    </fwb-tab>
                    <fwb-tab name="sound" title="Sound">
                        <div class="w-[400px] bg-white rounded dark:bg-gray-800 px-6 py-6 flex flex-col gap-6">
                            <div class="flex items-center border-b dark:border-gray-700 pb-6">
                                <div class="grow">
                                    <div class="font-bold">Sound</div>
                                    <div class="text-xs text-gray-500 mb-2">
                                        Enable or disable sound for the application
                                    </div>
                                </div>
                                <div>
                                    <fwb-toggle v-model="settingsStore.sound"/>
                                </div>
                            </div>
                            <div :class="{ 'opacity-20' : !settingsStore.sound }">
                                <div class="flex items-center">
                                    <div class="grow">
                                        <div class="font-bold">Volume</div>
                                        <div class="text-xs text-gray-500 mb-2">
                                            Set the volume for the application
                                        </div>
                                    </div>
                                    <div>
                                        {{ settingsStore.volume }}
                                    </div>
                                </div>
                                <fwb-range class="grow" :disabled="!settingsStore.sound" v-model="settingsStore.volume" :max="100" :min="0" label=""/>
                            </div>
                        </div>
                    </fwb-tab>
                    <fwb-tab name="printer" title="Printer">
                        <div class="w-[400px] bg-white rounded dark:bg-gray-800 px-6 py-6 flex flex-col gap-6">
                            <div class="border-b dark:border-gray-700 pb-6">
                                <div class="font-bold">Receipt printer</div>
                                <div class="text-xs text-gray-500 mb-2">
                                    Set the receipt printer for the application
                                </div>
                                <fwb-select v-model="receiptPrinter" :options="printers"/>
                            </div>
                            <div>
                                <div class="font-bold">KOT printer</div>
                                <div class="text-xs text-gray-500 mb-2">
                                    Set the KOT printer for the application
                                </div>
                                <fwb-select v-model="kotPrinter" :options="printers"/>
                            </div>
                        </div>
                    </fwb-tab>
                    <fwb-tab name="database_connection" title="Database Connection">

                        <div class="w-[400px] bg-white rounded dark:bg-gray-800 px-6 py-6 flex flex-col gap-5">
                            <div class="pb-1">
                                <div class="grid grid-cols-5 gap-4">
                                    <div class="col-span-4">
                                        <fwb-input v-model="databaseConnection.host" label="Host"/>
                                    </div>
                                    <div>
                                        <fwb-input v-model="databaseConnection.port" label="Port"/>
                                    </div>
                                </div>
                            </div>
                            <div class="pb-1">
                                <fwb-input v-model="databaseConnection.database" label="Database"/>
                            </div>
                            <div class="pb-1">
                                <fwb-input v-model="databaseConnection.user" label="User"/>
                            </div>
                            <div class="pb-1">
                                <fwb-input v-model="databaseConnection.password" label="Password"/>
                            </div>

                            <FwbButton color="alternative" @click="testConnection">Test Connection</FwbButton>
                            
                            <FwbButton @click="saveConnection">Save</FwbButton>
                                
                            
                            
                            

                        </div>

                        

                    </fwb-tab>

                </fwb-tabs>



            </div>
        </template>
    </POSLayout>
</template>