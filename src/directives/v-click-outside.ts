import type { DirectiveBinding } from 'vue'

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const onClickOutside = (event: MouseEvent) => {
      // Check if the click was outside the element and its children
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event) // Call the method provided in the directive value
      }
    }
    document.addEventListener('click', onClickOutside);
    (el as any).onClickOutside = onClickOutside
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', (el as any).onClickOutside);
  }
}
