<template>
    <v-container max-width="1000" class="mt-5 mx-auto">
        <v-card
            title="Клиенты"
            flat
            class="elevation-5 pa-0 rounded-lg"
        >
            <template v-slot:text>
            <v-text-field
                v-model="search"
                label="Поиск"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
                clearable
            ></v-text-field>
            </template>

            <v-data-table-server
                fixed-header
                height="600px"
                striped="even"
                :headers="headers"
                :items="customers"
                :items-length="totalCustomers"
                :loading="pending"
                class="elevation-0"
                v-model:options=options
            >
            <!-- Custom Footer with Forward/Backwards Buttons -->
            <template #bottom>
                <div class="d-flex justify-center pa-4 border-t">
                    <v-btn
                        class="mr-1"
                        :disabled="store.page <= 1"
                        @click="store.page = 1"
                        density="comfortable"
                        icon="mdi-page-first"
                        variant="tonal"
                        rounded
                    ></v-btn>
                    <v-btn
                        class="mr-1"
                        :disabled="store.page <= 1"
                        @click="store.page--"
                        density="comfortable"
                        icon="mdi-chevron-left"
                        variant="tonal"
                        rounded
                    ></v-btn>

                    <span class="mx-4 mt-auto mb-auto text-caption">Страница {{ store.page }} из {{ pageCount }}</span>

                    <v-btn
                        class="ml-1"
                        :disabled="store.page >= pageCount"
                        @click="store.page++"
                        density="comfortable"
                        icon="mdi-chevron-right"
                        variant="tonal"
                        rounded
                    ></v-btn>
                    <v-btn
                        class="ml-1"
                        :disabled="store.page >= pageCount"
                        @click="store.page = pageCount"
                        density="comfortable"
                        icon="mdi-page-last"
                        variant="tonal"
                        rounded
                    ></v-btn>
                </div>
            </template>
            </v-data-table-server>
        </v-card>
        
    </v-container>
</template>

<script setup>
import { useDebounceFn } from '@vueuse/core'
const { formatDate } = useDateConverter()

const store = useClientStore()

const search = ref('')


// Loading states
const overlay = ref(false)
const pending = ref(false)

const customers = ref([])
const totalCustomers = ref(0)
const pageCount = computed(() => Math.ceil(totalCustomers.value / 50))

const options = ref({
    page: store.page,
    itemsPerPage: 50,
    sortBy: [],
})

const headers = [
    { title: 'Фамилия клиента', key: 'LAST_NAME' },
    { title: 'Имя клиента', key: 'NAME' },
    { title: 'Дата рождения', key: 'BIRTHDATE' },
]




async function fetchCustomers() {
    overlay.value = true
    pending.value = true
    
    const res = await $fetch(`https://b24-6bvl6h.bitrix24.ru/rest/1/a3p29ejngz9z0662/crm.contact.list`, {
        method: 'post',
        body: {
            ...(store.searchTerm
                ? {
                    filter: {
                    "=%LAST_NAME": `%${store.searchTerm}%`
                    }
                }
                : {}),
            "start": (store.page-1) * 50,
            "order": {
                [store.orderBy]: store.orderDirection
            }
        }
    })

    totalCustomers.value = res.total
    customers.value = res.result

    // Format dates
    customers.value = customers.value.map(customer => {
        customer.BIRTHDATE = formatDate(customer.BIRTHDATE);
        return customer;
    });

    overlay.value = false
    pending.value = false
}

const debouncedFetchCustomers = useDebounceFn(fetchCustomers, 500)

watch(search, (newValue) => {
    store.changeSearchTerm(newValue)
})
watch(options, (newOptions) => {
    if (options.value.sortBy.length) {

        store.orderBy = options.value.sortBy[0].key
        store.orderDirection = options.value.sortBy[0].order

    }
    
})
// Fetch customers whenever options change
watch(store, debouncedFetchCustomers, { deep: true, immediate: true })

</script>