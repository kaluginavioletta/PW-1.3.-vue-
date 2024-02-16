new Vue({
    el: '#app',
    data() {
        return {
          newTask: "",
          columns: [
            { id: 1, name: "Запланированные задачи" },
            { id: 2, name: "Задачи в работе" },
            { id: 3, name: "Тестирование" },
            { id: 4, name: "Выполненные задачи" },
          ],
          newTask: {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toLocaleString(),
                lastChange: null,
                return: null,
                isOverdue: false
          },
            plannedTasks: [],
            progressTasks: [],
            testingTasks: [],
            completedTasks: [],
            editedTask: null,
            editedTaskIndex: null,
            editedColumn: null,
        }
    },
    methods: {
        addTask() {
            if (!this.newTask.title) {
                alert('Необходимо указать заголовок задачи');
                return;
            }
            if (!this.newTask.description) {
                alert('Необходимо указать описание задачи');
                return;
            }
            if (!this.newTask.deadline) {
                alert('Необходимо указать дэдлайн (срок сдачи задачи)');
                return;
            }
            if (new Date(this.newTask.deadline) <= new Date(new Date().setDate(new Date().getDate()))) {
                alert('Недействительная дата дэдлайна (минимум должен быть - завтра)');
                return;
            }
            this.plannedTasks.push({...this.newTask});
            this.newTask = {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toLocaleString(),
                lastChange: null
            }
        },
        tasksInColumn(columnId) {
          return this.tasks.filter(task => task.columnId === columnId);
        },
        statusClass() {
            if (this.status === 'completed') {
              return 'badge-success';
            } else if (this.status === 'in progress') {
              return 'badge-warning';
            } else {
              return 'badge-secondary';
            }
        },
        moveTask(column) {
            this.$emit('move', this.task, column);
        },
        submit() {
            this.$emit('submit', this.task);
        },
        editTask() {
            this.$emit('edit', this.task);
        },
        deleteTask() {
            this.$emit('delete', this.task);
        },
        moveTask(column) {
            this.$emit('move', this.task, column);
        },
    },
});