<script setup>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useSlots } from 'vue';
import { useRouter } from 'vue-router';
import { FwbSidebar, FwbSidebarItem } from 'flowbite-vue'
import { useLayoutStore } from '@/store/layout';

import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import { onMounted } from 'vue';
import { useSettingsStore } from '@/store/settings';

const settingsStore = useSettingsStore();

function onChange(input) {
  
}

function onKeyPress(button){
  console.log("Button pressed", button);
  window.api.fireKeypress(button)
}

const initOnScreenKeyboard = () => {
    if(settingsStore.onScreenKeyboard) {

        new Keyboard({
            preventMouseDownDefault: true,
            onChange: input => onChange(input),
            onKeyPress: button => onKeyPress(button),
            layout: {
                'default': [
                    // '` 1 2 3 4 5 6 7 8 9 0 - = {Backspace}',
                    '{Tab} q w e r t y u i o p [ ] \\ {Backspace}',
                    '{Capslock} a s d f g h j k l ; \' {Enter}',
                    '{Shift} z x c v b n m , . /',
                    '{Space}'
                ]
            },
            mergeDisplay: true,
            display:{
                '{Tab}': 'Tab',
                '{Capslock}': 'Caps',
                '{Shift}': 'Shift',
                '{Space}': 'Space',
                '{Backspace}': '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-backspace"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" /><path d="M12 10l4 4m0 -4l-4 4" /></svg>',
                '{Enter}': '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-corner-down-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" /></svg>',
            }
        });

        new Keyboard("simple-keyboard-numpad", {
            preventMouseDownDefault: true,
            onChange: input => onChange(input),
            onKeyPress: button => onKeyPress(button),
            layout: {
                'default': [
                    '1 2 3',
                    '4 5 6',
                    '7 8 9',
                    '. 0 {Backspace}'
                ]
            },
            mergeDisplay: true,
            display:{
                '{Tab}': 'Tab',
                '{Capslock}': 'Caps',
                '{Shift}': 'Shift',
                '{Space}': 'Space',
                '{Backspace}': '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-backspace"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" /><path d="M12 10l4 4m0 -4l-4 4" /></svg>',
                '{Enter}': '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-corner-down-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6v6a3 3 0 0 1 -3 3h-10l4 -4m0 8l-4 -4" /></svg>',
            }
        });
    }
}

onMounted(() => {

    initOnScreenKeyboard();

    
})



const layoutStore = useLayoutStore();

const router = useRouter();

const slots = useSlots();

const props = defineProps({
    showSideNavs: {
        type: Boolean,
        default: true
    },
    showRightSidebar: {
        type: Boolean,
        default: false
    },
    showLeftSidebar: {
        type: Boolean,
        default: false
    },
});

const middlePaneSize = props.showRightSidebar ? layoutStore.middle : (layoutStore.middle + layoutStore.right);

const onPanesResized = (sizes) => {
    if(sizes[0]?.size) layoutStore.left = sizes[0].size;
    if(sizes[1]?.size) layoutStore.middle = sizes[1].size;
    if(sizes[2]?.size) layoutStore.right = sizes[2].size;
}

</script>
<template>
    <div class="flex flex-col h-screen">
        <!-- <header class="bg-blue-600 text-white p-2 px-6 flex justify-between items-center">
            <div class="flex items-center gap-2">
                <button @click="router.back()">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                </button>
                <div class="text-lg font-semibold">RestroPro</div>
            </div>
        </header> -->
        <div class="grow flex min-h-0 bg-[#f2f1f2] dark:bg-[#1b1b1f]">

            <splitpanes class="default-theme" @resized="onPanesResized">
                <pane v-if="showLeftSidebar || showSideNavs" class="overflow-y-auto" :size="layoutStore.left">
                    <slot v-if="slots.leftSidebar" name="leftSidebar"></slot>
                    <div v-else>
                        <div class="p-2">
                            <div class="text-lg font-semibold">RestroPro</div>
                        </div>
                        <fwb-sidebar class="relative h-auto w-auto main-sidenav">
                            <fwb-sidebar-item to="/tables" :active="router.currentRoute.value.path === '/tables'">Tables</fwb-sidebar-item>
                            <fwb-sidebar-item to="/settings" :active="router.currentRoute.value.path === '/settings'">Settings</fwb-sidebar-item>

                            <fwb-sidebar-item to="/menu" :active="router.currentRoute.value.path === '/menu'">Menu</fwb-sidebar-item>

                            

                        </fwb-sidebar>
                    </div>
                </pane>
                <pane :size="middlePaneSize">
                    <slot name="default"></slot>
                </pane>
                <pane v-if="showRightSidebar" :size="layoutStore.right">
                    <slot name="rightSidebar"></slot>
                </pane>
            </splitpanes>

        </div>
        <div class="bottom-bar border-t dark:border-gray-700">
            
            <div>
                <slot v-if="slots.bottom" name="bottom"></slot>
            </div>

            <div class="flex">
                <div v-if="settingsStore.onScreenKeyboard" class="px-2 pb-2 w-full flex">
                    <div class="w-[80%]">
                        <div class="simple-keyboard"></div>
                    </div>
                    <div class="w-[20%]">
                        <div class="simple-keyboard-numpad"></div>
                    </div>
                    
                    
                </div>
                <!-- <div :class="[ settingsStore.onScreenKeyboard ? 'w-[20%]' : 'w-[100%] flex justify-end' ]">
                    
                </div> -->
            </div>

            
            
        </div>
    </div>
    
</template>