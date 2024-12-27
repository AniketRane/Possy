<script setup>
import { computed } from 'vue';
import { FwbBadge } from 'flowbite-vue'

const props = defineProps({
    name: {
        type: String
    },
    chairs: {
        type: Number,
        default: 0
    },
    occupiedAt: {
        type: Number,
        default: 0
    },
})

const chairsArray = computed(() => {
    let arr = {
        top: [],
        bottom: [],
        left: [],
        right: []
    }
    if(props.chairs == 0) {
        return arr;
    }
    for (let i = 1; i <= props.chairs; i++) {
        if(i == 3) {
            arr.left.push(i);
        } else if(i == 4) {
            arr.right.push(i);
        } else if(i % 2 === 0) {
            arr.bottom.push(i);
        } else {
            arr.top.push(i);
        }
    }
    return arr;
})

</script>
<template>
    <div class="table-view" :class="{ 'occupied': (occupiedAt > 0) }">
        <div class="chairs-top">
            <div class="chair" v-for="i in chairsArray.top" :key="i"></div>
        </div>
        <div class="table">
            <div class="name">
                {{ name }}
            </div>
            <div class="text-sm">
                {{ chairs }} people
            </div>

            <!-- <div class="status">
                <div class="status-indicator"></div>
                <div class="status-text">Occupied</div>
            </div> -->

            <div class="occupied-at" :data-occupied-at="occupiedAt" v-if="occupiedAt"></div>
            
        </div>
        <div class="chairs-bottom">
            <div class="chair" v-for="i in chairsArray.bottom" :key="i"></div>
        </div>
        <div class="chairs-right">
            <div class="chair" v-for="i in chairsArray.right" :key="i"></div>
        </div>
        <div class="chairs-left">
            <div class="chair" v-for="i in chairsArray.left" :key="i"></div>
        </div>
    </div>
</template>
<style lang="scss">



.table-view {
    
    &{
        display: inline-grid;
        grid-template-areas: 
            "a b c"
            "d e f"
            "g h i";
    }

    .table {
        grid-area: e;
        background-color: white;
        border: 3px solid transparent;
        aspect-ratio: 1;
        min-width: 130px;
        width: 100%;
        height: 130px;
        border-radius: 10px;

        position: relative;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 14px;

        &:is(.dark *){
            background-color: #313a47;
        }

        .name {
            font-weight: bold;
            font-size: 20px;
        }

        .occupied-at, .available {
            bottom: 0;
            right: 0px;
            position: absolute;
            width: 100%;
            padding: 2px 10px 4px 10px;
        }

        .occupied-at{
            background-color: #FF5722;
        }

        .available {
            background-color: green;
        }

        .status {
            display: flex;
            align-items: center;
            gap: 5px;
            // margin-top: 10px;
            .status-indicator {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #FF5722;
            }
            .status-text {
                font-size: 14px;
            }
        }

    }
    .chair {
        background-color: #dcdcdc;
        border-radius: 10px;
        &:is(.dark *){
            background-color: #19222d;
        }
    }
    .chairs-left {
        grid-area: d;
        height: 50%;
        display: flex;
        height: 100%;
        align-items: center;
        margin-right: 2px;
        .chair {
            width: 18px;
            height: 48px;
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        }
    }
    .chairs-right {
        grid-area: f;
        height: 50%;
        display: flex;
        height: 100%;
        align-items: center;
        margin-left: 2px;
        .chair {
            width: 18px;
            height: 48px;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
        }
    }
    .chairs-top {
        display: flex;
        gap: 10px;
        margin-bottom: 2px;
        margin-left: 10px;
        margin-right: 10px;
        grid-area: b;
        justify-content: center; 
        .chair {
            width: 48px;
            height: 18px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
    .chairs-bottom {
        display: flex;
        gap: 10px;
        margin-top: 2px;
        margin-left: 10px;
        margin-right: 10px;
        grid-area: h;
        justify-content: center;   
        .chair {
            width: 48px;
            height: 18px;
            border-top-right-radius: 0;
            border-top-left-radius: 0;
        }
    }

    .available {

    }

    &:hover {
        cursor: pointer;
        .table {
            border-color: rgb(139, 139, 255);
        }
        .chair {
            background-color: rgba(139, 139, 255, 0.526) !important;
        }
    }

}
</style>