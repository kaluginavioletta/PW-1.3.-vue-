new Vue({
    el: '#app',
    data(){
        return {
            showForm: false,
            newTask: {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toLocaleString(),
                lastChange: null,
                recovery: null,
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
    methods:{
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
        toggleForm() {
            this.showForm = !this.showForm;
        },
        deleteTask(taskIndex) {
            this.plannedTasks.splice(taskIndex, 1);
        },
        startEditing(taskIndex, column) {
            this.editedTask = { ...this[column][taskIndex] };
            this.editedTaskIndex = taskIndex;
            this.editedColumn = column;
        },    
        finishEditing() {
            this[this.editedColumn][this.editedTaskIndex] = { ...this.editedTask, lastChange: new Date().toLocaleString() };
            this.cancelEditing();
        },
        cancelEditing() {
            this.editedTask = null;
            this.editedTaskIndex = null;
            this.editedColumn = null;
        },        
        moveToInProgress(taskIndex) {
            const taskToMove = this.plannedTasks.splice(taskIndex, 1)[0];
            this.progressTasks.push(taskToMove);
        },
        moveToTesting(taskIndex) {
            const taskToMove = this.progressTasks.splice(taskIndex, 1)[0];
            this.testingTasks.push(taskToMove);
        },
        returnToInProgress(taskIndex) {
            if (!this.testingTasks[taskIndex].recovery) {
                alert('Необходимо указать причину возврата');
                return;
            }
            const taskToMove = this.testingTasks.splice(taskIndex, 1)[0];
            this.progressTasks.push(taskToMove);
        },
        moveToCompleted(taskIndex) {
            const taskToMove = this.testingTasks.splice(taskIndex, 1)[0];
            taskToMove.isOverdue = new Date(taskToMove.deadline) < new Date();
            this.completedTasks.push(taskToMove);
        }
    }
})