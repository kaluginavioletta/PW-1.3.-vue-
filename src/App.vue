<script setup>

import draggable from 'vuedraggable';

  export default {
    name: 'App',
    components: {
      draggable
    },
    data() {
      return {
        newTask: "",
        arrBacklog: [
          {name: "Запланированные задачи"},
          {name: "Задачи в работе"},
          {name: "Тестирование"},
          {name: "Выполненные задачи"}
        ],
        arrInWork: [],
        arrTested: [],
        arrDone: []
      }
    },
    methods: {
      add() {
        if(this.newTask) {
          this.arrBacklog.push({name: this.newTask});
          this.newTask = "";
        }
      }
    }
  }

</script>

<template>
    
    <div class="container mt-5">
      <div class="row">
        <div class="col form-inline">
          <b-form-input v-model="newTask" placeholder="Добавить задачу" @keyup.enter="add"></b-form-input>
        </div>
      </div>
    </div>

</template>

<style scoped>


</style>
