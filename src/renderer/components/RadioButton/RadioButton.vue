<template>
    <label
      :class="[
        'flex items-center cursor-pointer space-x-2 p-2 rounded transition border-2',
        { 'border-blue-500': isChecked, 'border-[transparent]': !isChecked }
      ]"
      :tabindex="0"
    >
      <input
        type="radio"
        :value="value"
        :name="groupName"
        v-model="selectedValue"
        class="hidden"
      />
      <div
        :class="[
          'w-4 h-4 rounded-full border-2 flex items-center justify-center',
          { 'border-blue-500': isChecked, 'border-gray-300': !isChecked }
        ]"
      >
        <div
          v-if="isChecked"
          class="w-2 h-2 rounded-full bg-blue-500"
        ></div>
      </div>
      <!-- Slot for custom label content -->
      <span class="w-full">
        <slot></slot>
      </span>
    </label>
  </template>
  
  <script setup>
  import { inject, computed } from 'vue';
  
  // Props
  const props = defineProps({
    value: {
      type: [String, Number],
      required: true,
    },
  });
  
  // Injecting the radio group context
  const selectedValue = inject('selectedValue');
  const groupName = inject('groupName');
  
  // Determine if the current radio button is selected
  const isChecked = computed(() => selectedValue.value === props.value);
  </script>
  
  <style scoped>
  /* Additional custom styles can be added here */
  </style>
  