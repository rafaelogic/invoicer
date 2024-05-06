<script setup lang="ts">
import InvoiceForm from '@/components/Forms/InvoiceForm.vue';
import PreviewInvoice from '@/components/PreviewInvoice.vue';
</script>

<template>
  <div class="bg-gray-300 min-h-screen">
    <h1 class="text-4xl text-center font-bold w-full p-2 text-gray-800 bg-gray-200 tracking-wider uppercase">Invoicer</h1>
      <div class="container mx-auto mt-8 flex gap-2 w-full shadow-lg">
        <div class="px-8 w-2/5 bg-white rounded-l-lg">
            <InvoiceForm />
        </div>
        <div class="w-full bg-white rounded-r-lg">
            <PreviewInvoice />
        </div>
      </div>
  </div>
</template>
