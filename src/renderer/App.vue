<script setup>
import { onMounted } from 'vue';
import { useSettingsStore } from './store/settings';
import { useRouter } from 'vue-router';

const settingsStore = useSettingsStore();

const router = useRouter();

const setFontSize = (value) => {
  document.documentElement.style.setProperty('--app-font-size', value + "px")
}

const setTheme = (value) => {
  if(value == "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

setFontSize(settingsStore.fontSize);
setTheme(settingsStore.theme);

settingsStore.$subscribe((mutation, state) => {

  if(state.theme) {
    setTheme(state.theme);
  }

  if(state.fontSize) {
    setFontSize(state.fontSize);
  }
});

const getBgClass = (type) => {
  switch(type) {
    case "success":
      return "bg-green-500"
      break;
    case "error":
      return "bg-red-500"
      break;
    case "warn":
      return "bg-yellow-500"
      break;
    default:
      return "bg-gray-500"
      break;
  }
}

</script>
<template>
  <notifications position="bottom right">

    <template #body="props">
      <div class="p-4 rounded" :class="getBgClass(props.item.type)">
        <div class="flex">
          <div class="grow">{{ props.item.title }}</div>
          <button class="close" @click="props.close">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
        </div>
        <div v-if="props.item.text" class="text-sm mt-2" v-html="props.item.text"/>
      </div>
    </template>

  </notifications>
  <router-view/>
</template>

<style lang="scss">
.vue-notification-group {
  margin: 0px 20px 20px 0px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>