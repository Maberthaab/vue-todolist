<script setup>
import { ref, onMounted } from 'vue'

import { useListStore } from '@/stores/list'
// components
import BaseInput from '@comp/BaseInput.vue'

//store container
const store = useListStore()
// initial input / default input
const defaultInput = {
  title: '',
  description: '',
  category: '',
  completed: false
}

// ref input
// spread syntax
const input = ref({ ...defaultInput })

const editing = ref(false)
// function reset form
const resetForm = () => {
  Object.assign(input.value, defaultInput)
  editing.value = false
}

// function yg menerima submit form
async function onSubmit() {
  // event.preventDefault();
  const data =({ ...input.value })
  if (editing.value === false) {
    // add list via store
    store.addList(data)
  } else {
    // edit list
    await store.editList(editing.value, data)
  }
  // add list via store
  store.addList({ ...input.value })

  // reset form
  resetForm()
}

function detailList(index) {
  const detail = store.getDetail(index)
  input.value = { ...detail.value }
  editing.value = index
}

function toggleComplete(id) {
  const detail = store.getDetail(id)
  store.editList(id, {
    // pass all entries in detail object
    ...detail.value,
    // take completed value then toggle it
    completed: !detail.value.completed
  })
}

onMounted(async () => await store.initList())

</script>

<template>
 <div class="container">

<h1>Test {{ $route.params?.id }}</h1>


<!-- add v-model to integrate data binding with ref -->
<!-- add event handler listener when keyup enter -->
<!-- method handler with addList function -->

<!-- event modifier .enter, .prevent -->
<form class="form" @submit.prevent="onSubmit" @reset="resetForm">
      <BaseInput v-model="input.title" name="title" placeholder="Tidur" required />
      <BaseInput v-model="input.description" name="description" placeholder="Everyday" />
      <BaseInput v-model="input.category"  name="category" placeholder="Todolist" required />
      <div class="checkbox">
        <input type="checkbox" v-model="input.completed" name="completed" /> Completed
      </div>
      <button type="reset">Cancel</button>
      <button type="submit">{{ editing !== false? 'Save' : 'Submit' }}</button>
    </form>

<h4>Tasks</h4>
<ol class="list">
   <!-- (item, index) -->
   <template v-for="(item, index) in store.getList" :key="index">
        <!-- null chaining (?.), nullish coalescing (??); ternary operator; not operator -->
      
        <li :class="{ strike: item?.completed }" @dblclick="toggleComplete(item.id)">
          <button class="red" @click="() => store.removeList(item.id)" :disabled="editing !== false">&times;</button>

          <button class="orange" @click="() => detailList(item.id)" :disabled="editing !== false">&#9998;</button>
          {{ item?.title }} -
          {{ !!item?.description ? item.description : '' }}

        
</li>
</template>
</ol>
  </div>
</template>

<!-- style default bersifat global -->
<!-- scoped untuk melimitasi hanya di komponen -->
<style scoped lang="scss">
/* body = font-size: 16px (1rem) */
.form {
  .input {
    /* 2rem = 16px * 2 */
    margin-block-end: 1rem;
    width: 100%;
  }
  margin-block-end: 2rem;
}
.list {
  /* rem, em, vh, vw */
  padding-block: 1rem;
  & > .strike {
    text-decoration: line-through;
  }
}

.checkbox {
  width: 100%;
}

button {
  .red {
    color: red;
  }
  .orange {
    color: orange;
  }
}
</style>