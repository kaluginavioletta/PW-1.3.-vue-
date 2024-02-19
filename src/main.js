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
        },
        dragAndDrop() {
            const tasksListElement = document.querySelector(`.task`);
            const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);
            
            // Перебираем все элементы списка и присваиваем нужное значение
            for (const task of taskElements) {
              task.draggable = true;
            }

            tasksListElement.addEventListener(`dragstart`, (evt) => {
                evt.target.classList.add(`selected`);
              })
              
              tasksListElement.addEventListener(`dragend`, (evt) => {
                evt.target.classList.remove(`selected`);
              });
              tasksListElement.addEventListener(`dragover`, (evt) => {
                // Разрешаем сбрасывать элементы в эту область
                evt.preventDefault();
              
                // Находим перемещаемый элемент
                const activeElement = tasksListElement.querySelector(`.selected`);
                // Находим элемент, над которым в данный момент находится курсор
                const currentElement = evt.target;
                // Проверяем, что событие сработало:
                // 1. не на том элементе, который мы перемещаем,
                // 2. именно на элементе списка
                const isMoveable = activeElement !== currentElement &&
                  currentElement.classList.contains(`tasks__item`);
              
                // Если нет, прерываем выполнение функции
                if (!isMoveable) {
                  return;
                }
              
                // Находим элемент, перед которым будем вставлять
                const nextElement = (currentElement === activeElement.nextElementSibling) ?
                    currentElement.nextElementSibling :
                    currentElement;
              
                // Вставляем activeElement перед nextElement
                tasksListElement.insertBefore(activeElement, nextElement);
              });
              
              const getNextElement = (cursorPosition, currentElement) => {
                // Получаем объект с размерами и координатами
                const currentElementCoord = currentElement.getBoundingClientRect();
                // Находим вертикальную координату центра текущего элемента
                const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
              
                // Если курсор выше центра элемента, возвращаем текущий элемент
                // В ином случае — следующий DOM-элемент
                const nextElement = (cursorPosition < currentElementCenter) ?
                    currentElement :
                    currentElement.nextElementSibling;
              
                return nextElement;
              };

              tasksListElement.addEventListener(`dragover`, (evt) => {
                evt.preventDefault();
              
                const activeElement = tasksListElement.querySelector(`.selected`);
                const currentElement = evt.target;
                const isMoveable = activeElement !== currentElement &&
                  currentElement.classList.contains(`tasks__item`);
              
                if (!isMoveable) {
                  return;
                }
              
                // evt.clientY — вертикальная координата курсора в момент,
                // когда сработало событие
                const nextElement = getNextElement(evt.clientY, currentElement);
              
                // Проверяем, нужно ли менять элементы местами
                if (
                  nextElement && 
                  activeElement === nextElement.previousElementSibling ||
                  activeElement === nextElement
                ) {
                  // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
                  return;
                }
              
                tasksListElement.insertBefore(activeElement, nextElement);
              });
            
        }
    }
})