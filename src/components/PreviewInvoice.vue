<template>
    <div class="w-full bg-white min-h-screen h-[100%vh]">
        <div class="p-20">
            <div class="inline-flex items-center gap-2">
                <h1 class="font-bold text-3xl text-gray-600 uppercase">Invoice</h1>
                <span class="font-bold text-3xl text-gray-700">{{ invoiceNumber }}</span>
            </div>

            <p class="text-gray-700">{{ invoiceDate }}</p>

            <div class="mb-12"></div>

            <div class="flex justify-between mt-4 w-full">
                <div class="flex flex-col w-1/2">
                    <span class="text-sm font-bold text-gray-600">From:</span>
                    <h2 class="text-gray-800">{{ invoiceData.from }}</h2>
                </div>
                <div class="flex flex-col w-1/2">
                    <span class="text-bold text-gray-600 text-sm font-bold">To:</span>
                    <h2 class="text-gray-800">{{ invoiceData.to }}</h2>
                </div>
            </div>

            <div class="flex flex-col w-full mt-4">
                <span class="text-sm font-bold text-gray-600">Subject:</span>
                <h2 class="text-gray-800">{{ invoiceData.subject }}</h2>
            </div>

            <div class="flex-1 p-6 border-2 border-gray-200 bg-gray-100 rounded-md mt-8">
                <div v-for="(rate, key) in invoiceData.payRateInfo" :key="key" class="inline-flex w-full">
                    <span class="w-1/4 font-light">{{ formatLabel(key) }}</span>
                    <p class="font-light text-md">
                        : <span class="text-xl mr-2">₱</span> 
                        {{ formatNumber(rate) }}
                    </p>
                </div>
            </div>

            <div v-if="tableHeaders.length" class="container mx-auto">
                <table class="min-w-full table-auto bg-white rounded my-6 border-2 border-gray-100">
                    <thead>
                    <tr class="border-b bg-gray-100 text-sm">
                        <th v-for="header in tableHeaders" :key="header" :class="['text-left', 'p-3', 'px-5', 'uppercase', header == 'unit price' || header == 'qty' ? 'text-center' : '']">{{ header }}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in invoiceData.items" :key="stripHtmlTags(item.description)" class="border-b hover:bg-gray-100">
                            <td class="p-3 px-5" v-html="item.description"></td>
                            <td class="p-3 px-5 text-center max-w-12">{{ item.quantity }}</td>
                            <td class="p-3 px-5 text-center max-w-18">{{ formatNumber(item.unitPrice) }}</td>
                            <td class="p-3 px-5 font-bold max-w-22"><span class="text-xl mr-1">₱</span> {{ calculateTotalForItem(item) }}</td>
                        </tr>
                        <tr class="uppercase text-lg font-bold bg-gray-100">
                            <td colspan="3" class="text-right py-2">Total Due:</td>
                            <td class="pl-5 py-2 max-w-22"><span class="text-xl mr-1">₱</span> {{ calculateOverallTotal }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { format } from 'date-fns';
import { useInvoiceStore } from '@/stores/invoice';

const { invoiceData } = useInvoiceStore();

const invoiceNumber = computed(() => invoiceData.number ? `000${invoiceData.number}` : 0);

const invoiceDate = computed(() => invoiceData.date ? format(invoiceData.date.toString(), 'MMMM dd, yyyy') : '');

const tableHeaders = computed(() => {
    let parsedHeaders: string[] = [];

    if (invoiceData.headers) {
        let headers = invoiceData.headers.split(',');
        headers.forEach((header) =>  parsedHeaders.push(header.split('_').join(' ')));
    }
    return parsedHeaders;
});

const formatNumber = (num: number | string): string => {
    if (typeof num === 'number') {
        num = num.toFixed(2);
    } else if (typeof num !== 'string') {
        return num.toString();
    }
    
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return parts.join('.');
}

// Define a function to calculate the total for a given item
const calculateTotalForItem = (item: { quantity: number; unitPrice: number }): string => {
    const quantity = item.quantity || 0;
    const unitPrice = item.unitPrice || 0;
    return formatNumber(quantity * unitPrice);
};

const calculateOverallTotal = computed(() => {
    let total = 0;
    // Iterate over the values of the items object
    Object.values(invoiceData.items).forEach((item: { quantity: number; unitPrice: number }) => {
        total += item.quantity * item.unitPrice;
    });
    return formatNumber(total);
});

const formatLabel = (key: string): string => {
    return key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
}
</script>