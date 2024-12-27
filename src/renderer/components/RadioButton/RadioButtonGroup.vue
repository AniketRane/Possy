<template>
    <div>
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { provide, ref, watch } from 'vue';
  
  // Props
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  });
  
  // Emit event for two-way binding
  const emit = defineEmits(['update:modelValue']);
  
  // Internal state to manage the selected value
  const selectedValue = ref(props.modelValue);
  
  // Provide the selected value and group name to child components
  provide('selectedValue', selectedValue);
  provide('groupName', props.name);
  
  // Watch for changes in the modelValue prop
  watch(
    () => props.modelValue,
    (newVal) => {
      selectedValue.value = newVal;
    }
  );
  
  // Emit the updated value when the internal state changes
  watch(selectedValue, (newVal) => {
    emit('update:modelValue', newVal);
  });
  </script>
  
  <style scoped>
  /* Additional custom styles can be added here */
  </style>
  