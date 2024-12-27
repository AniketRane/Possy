<template>
    <div class="flex space-x-2" role="radiogroup">
      <button
        v-for="option in options"
        :key="option.value"
        :id="option.value"
        type="button"
        :class="[
          'px-4 py-2 rounded-lg focus:outline-none focus:ring-2',
          isSelected(option.value)
            ? 'bg-blue-500 text-white ring-blue-300'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        ]"
        :aria-checked="isSelected(option.value)"
        role="radio"
        @click="selectOption(option.value)"
        @keydown.enter.space.prevent="selectOption(option.value)"
        tabindex="0"
      >
        {{ option.label }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];
  
  const selectedValue = ref(options[0].value);
  
  const isSelected = (value) => selectedValue.value === value;
  
  const selectOption = (value) => {
    selectedValue.value = value;
  };
  </script>
  
  <style scoped>
  /* Optional: Additional styling for improved accessibility */
  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Blue ring */
  }
  </style>
  