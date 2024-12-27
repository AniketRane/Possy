<script setup>
import { useRouter } from "vue-router";
import Table from "./../components/Table.vue"
import POSLayout from "@/layouts/POSLayout.vue";
import { useOrdersStore } from "../store/orders";
import { onMounted, onUnmounted } from "vue";
import { getCurrentInstance } from "vue";
import { ref } from "vue";

const router = useRouter();

const tables = ref([
    {
        name: "T1",
        chairs: 2
    },
    {
        name: "T2",
        chairs: 5
    },
    {
        name: "T3",
        chairs: 4
    },
    {
        name: "T4",
        chairs: 2
    }
])

const ordersStore = useOrdersStore();

const selectTable = (table) => {
    router.push({ name: "order.create",
        params: {
            table: table.name
        }
    });
}

const checkTableOccupancy = (table) => {
    if(ordersStore.tables[table.name]?.timestamp) {
        return ordersStore.tables[table.name].timestamp;
    } else {
        return 0;
    }
}

let intervalId;

const getTimeEllapsed = (occupiedAt) => {
    if (!occupiedAt) return;
      const now = Date.now();
      const seconds = Math.floor((now - occupiedAt) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
      if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
      if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
      return `${seconds}s`;
}

const refreshTimeEllaapsed = () => {
    let elememts = document.querySelectorAll('[data-occupied-at]');
    elememts.forEach((element) => {
        element.innerHTML = getTimeEllapsed(element.getAttribute('data-occupied-at'));
    })
}

onMounted(() => {
    refreshTimeEllaapsed();
    intervalId = setInterval(() => {
        refreshTimeEllaapsed();
    }, 1000);
})

onUnmounted(() => {
    clearInterval(intervalId);
})

</script>
<template>
    <POSLayout>

        <div>

        </div>

        <div class="p-4 bg-[#ededed] dark:bg-gray-800 h-full">
            <div class="text-2xl">Tables</div>
            <div class="flex gap-16 p-6">
                <div v-for="(table, i) in tables" :key="i">
                    <Table :chairs="table.chairs" 
                        :name="table.name" @click="selectTable(table)" 
                        :occupiedAt="checkTableOccupancy(table)"
                        :timestamp="table.timestamp"/>
                </div>
            </div>
        </div>
    </POSLayout>
</template>