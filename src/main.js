Vue.component('taks', {
    template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col form-inline">
          <b-form-input v-model="newTask" placeholder="Добавить задачу" @keyup.enter="add"></b-form-input>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <div class="p-2 alert alert-secondary">
          <h3>Mini Trello</h3>
          <div class="list-group" :list="arrBacklog" group="tasks">
            <div class="list-group-item" v-for="el in arrBacklog" :key="el.name">
              {{ el.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
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
    },

});

new Vue({
    el: '#app', 
});