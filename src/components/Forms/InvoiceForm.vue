<template>
    <div class="w-full mt-10 mb-12">
        <form class="space-y-6">
            <h1 class="text-md font-bold">Details</h1>

            <div class="mt-2 w-1/4">
                <InputField label="Invoice #" v-model="invoiceData.number" type="number" inputId="number" />
            </div>

            <InputField label="Invoice To" v-model="invoiceData.to" type="text" inputId="to"/>
            <InputField label="Invoice From" v-model="invoiceData.from" type="text" inputId="from" />
            <InputField label="Invoice Date" v-model="invoiceData.date" type="date" inputId="date" />
            <InputField label="Invoice Subject" v-model="invoiceData.subject" type="text" inputId="subject" />
            <InputField label="Invoice Headers" v-model="invoiceData.headers" type="text" inputId="headers" />

            <hr>

            <h1 class="text-md font-bold">Pay Rate Info</h1>

            <InputField label="Monthly Rate" v-model="invoiceData.payRateInfo.monthlyRate" type="number" inputId="monthlyRate" />
            <InputField label="Daily Rate" v-model="invoiceData.payRateInfo.dailyRate" type="number" inputId="dailyRate" />
            <InputField label="Friday Rate" v-model="invoiceData.payRateInfo.fridayRates" type="number" inputId="fridayRates" />
            <InputField label="Hourly Rate" v-model="invoiceData.payRateInfo.hourlyRate" type="number" inputId="hourlyRate" />
            
            <hr>

            <h1 class="text-md font-bold">Invoice Items</h1>
            <div class="flex flex-col gap-y-2">
                <label class="text-sm font-bold">Weekdays</label>
                <hr>
                <InputField :hidden="true" label="Description" v-model="invoiceData.items.weekdays.description" :inputValue="invoiceData.items.weekdays.description" type="string" inputId="weekdaysDescription" addOnClass="flex-1 py-2 px-2 border-2 border-gray-200" />
                <div class="text-sm  font-light inline-flex gap-2">
                    <InputField label="Quanity" v-model="invoiceData.items.weekdays.quantity" type="number" inputId="weekdaysQty" />
                    <InputField label="Unit Price" v-model="invoiceData.items.weekdays.unitPrice" type="number" inputId="weekdaysUnitPrice" />
                </div>
            </div>

            <div class="flex flex-col gap-y-2">
                <label class="text-sm font-bold">Fridays</label>
                <hr>
                <InputField :hidden="true" label="Description" v-model="invoiceData.items.fridays.description" :inputValue="invoiceData.items.fridays.description" type="string" inputId="fridaysDescription" addOnClass="flex-1 py-2 px-2 border-2 border-gray-200" />
                <div class="text-sm  font-light inline-flex gap-2">
                    <InputField label="Quanity" v-model="invoiceData.items.fridays.quantity" type="number" inputId="fridaysQty" />
                    <InputField label="Unit Price" v-model="invoiceData.items.fridays.unitPrice" type="number" inputId="fridaysUnitPrice" />
                </div>
            </div>

            <div class="flex flex-col gap-y-2">
                <label class="text-sm font-bold">Overtime Weekdays</label>
                <hr>
                <InputField :hidden="true" label="Description" v-model="invoiceData.items.otWeekdays.description" :inputValue="invoiceData.items.otWeekdays.description" type="string" inputId="otWeekdaysDescription" addOnClass="flex-1 py-2 px-2 border-2 border-gray-200" />
                <div class="text-sm  font-light inline-flex gap-2">
                    <InputField label="Quanity" v-model="invoiceData.items.otWeekdays.quantity" type="number" inputId="otWeekdaysQty" />
                    <InputField label="Unit Price" v-model="invoiceData.items.otWeekdays.unitPrice" type="number" inputId="otWeekdaysUnitPrice" />
                </div>
            </div>

            <div class="flex flex-col gap-y-2">
                <label class="text-sm font-bold">Overtime Fridays</label>
                <hr>
                <InputField :hidden="true" label="Description" v-model="invoiceData.items.otFridays.description" :inputValue="invoiceData.items.otFridays.description" type="string" inputId="otFridaysDescription" addOnClass="flex-1 py-2 px-2 border-2 border-gray-200" />
                <div class="text-sm  font-light inline-flex gap-2">
                    <InputField label="Quanity" v-model="invoiceData.items.otFridays.quantity" type="number" inputId="otFridaysQty" />
                    <InputField label="Unit Price" v-model="invoiceData.items.otFridays.unitPrice" type="number" inputId="otFridaysUnitPrice" />
                </div>
            </div>

            <div class="flex flex-col gap-y-2">
                <label class="text-sm font-bold">Overtime Weekends</label>
                <hr>
                <InputField label="Description" v-model="invoiceData.items.otWeekends.description" :inputValue="invoiceData.items.otWeekends.description" type="string" inputId="otWeekendsDescription" addOnClass="flex-1 py-2 px-2 border-2 border-gray-200" />
                <div class="text-sm font-light inline-flex gap-2">
                    <InputField label="Quanity" v-model="invoiceData.items.otWeekends.quantity" type="number" inputId="otWeekendsQty" />
                    <InputField label="Unit Price" v-model="invoiceData.items.otWeekends.unitPrice" type="number" inputId="otWeekendsUnitPrice" />
                </div>
            </div>

            <div class="flex justify-end gap-6">
                <button type="submit"
                    class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save
                </button>
                <button type="submit"
                    :onClick="handleUpdate"
                    class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Preview
                </button>
            </div>
        </form>
    </div>
</template>
  
<script lang="ts">
import { useInvoiceStore } from '../../stores/invoice';
import { defineComponent } from 'vue';
import InputField from '@/components/Fragments/Forms/InputField.vue'

export default defineComponent({
    components: {
        InputField
    },
    setup() {
        const { invoiceData, updateInvoiceData } = useInvoiceStore();

        const handleUpdate = () => {
            updateInvoiceData(invoiceData);
        }

        return {
            invoiceData,
            handleUpdate,
        }
    }
});
</script>