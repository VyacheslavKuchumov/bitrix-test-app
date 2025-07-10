

export const useClientStore = defineStore('client', () => {

    const searchTerm = ref('');
    const page = ref(1);
    const pageSize = ref(50);
    const orderBy = ref('LAST_NAME');
    const orderDirection = ref('ASC');

    
    watch([searchTerm, orderBy, orderDirection], () => {
        page.value = 1; // Reset to first page on new search
    });

    return {
        searchTerm,
        page,
        pageSize,
        orderBy,
        orderDirection,
        
    };

},{
    persist: true,
});