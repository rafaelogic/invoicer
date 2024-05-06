<template>
  <div>
    <!-- Optional label -->
    <label v-if="label" :for="inputId" :class="['block', 'text-sm', 'font-medium', 'text-gray-700', labelClass]">{{ label }}</label>
    <!-- Input element with dynamic attributes -->
    <input v-model="inputValue" :id="inputId" :class="`${inputClass} ${addOnClass}`" :placeholder="placeholder" :type="type" :disabled="disabled" :hidden="hidden" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String as PropType<string>,
      default: ''
    },
    labelClass: {
      type: String as PropType<string>,
      default: ''
    },
    inputId: {
      type: String as PropType<string>,
      required: true
    },
    inputClass: {
      type: String as PropType<string>,
      default: 'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
    },
    addOnClass: {
      type: String as PropType<string>,
      default: ''
    },
    modelValue: {
      required: true
    },
    type: {
      type: String as PropType<string>,
      default: 'text'
    },
    placeholder: {
      type: String as PropType<string>,
      default: ''
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    hidden: {
      type: Boolean as PropType<boolean>,
      default: false,
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      }
    });

    return {
      inputValue
    }
  }
});
</script>