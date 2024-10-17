<template>
  <div>
    <label v-if="label" :for="inputId" :class="['block', 'text-sm', 'font-medium', 'text-gray-700', labelClass]">{{ label }}</label>

    <div v-if="!editMode" @click="toggleEditMode" :class="dClass">
      {{ mode === 'str' ? inputValue : formatNumber(inputValue) }}
    </div>
    <input v-else v-model="inputValue" :id="inputId" :class="iClass" :placeholder="placeholder" :type="type" :disabled="disabled" :hidden="hidden" @blur="toggleEditMode" />
  </div>
</template>

<script lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, ref, defineComponent, type PropType } from 'vue';
import clickOutside from '../../../directives/v-click-outside';

export default defineComponent({
  directives: {
    clickOutside,
  },
  props: {
    divClass: {
      type: String as PropType<string>,
      default: ''
    },
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
    },
    mode: {
      type: String as PropType<string>,
      default: 'str'
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

    const editMode = ref(false);
    const toggleEditMode = () => {
      editMode.value = !editMode.value;
    }

    const iClass = computed(() => {
      return twMerge('mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md', props.inputClass);
    });

    const dClass = computed(() => {
      return twMerge('text-sm transition duration-300 hover:bg-gray-100 border-b-2 border-gray-300', props.divClass);
    });

    const formatNumber = (num: any): string => {
      if (typeof num === 'number') {
        num = num.toFixed(2);
        num = num.includes('.') ? num : `${num}.00`;
      } else if (typeof num !== 'string') {
        return String(num);
      }

      const parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      return parts.join('.');
    };

    return {
      inputValue,
      toggleEditMode,
      editMode,
      iClass,
      dClass,
      formatNumber
    };
  }
});
</script>