import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useListStore = defineStore('list', () => {
  // state
  const list = reactive([
    {
      name: 'Thataa',
      hobby: 'Melukis',
      description: 'Everyweek'
    },
    {
      name: 'Lian',
      hobby: 'Musik',
      description: null
    }
  ])

  // getter
  const getList = computed(() => list)

  // action
  function addList(params) {
    if (params) {
      list.push(params)
    }
  }

  const removeList = (index) => {
    // use splice to delete instead of filter then assign to existing reactive state
    list.splice(index, 1)
  }

  return { list, getList, addList, removeList }
})