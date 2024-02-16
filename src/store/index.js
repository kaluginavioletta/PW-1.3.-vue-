import { createStore } from 'vuex'

const store = createStore({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task)
    },
    updateTask(state, updatedTask) {
      const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id)
      state.tasks.splice(taskIndex, 1, updatedTask)
    },
    deleteTask(state, taskId) {
      const taskIndex = state.tasks.findIndex(task => task.id === taskId)
      state.tasks.splice(taskIndex, 1)
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('https://your-api-endpoint.com/tasks')
        commit('setTasks', response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async addTask({ commit }, task) {
      try {
        const response = await axios.post('https://your-api-endpoint.com/tasks', task)
        commit('addTask', response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async updateTask({ commit }, updatedTask) {
      try {
        await axios.put(`https://your-api-endpoint.com/tasks/${updatedTask.id}`, updatedTask)
        commit('updateTask', updatedTask)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTask({ commit }, taskId) {
      try {
        await axios.delete(`https://your-api-endpoint.com/tasks/${taskId}`)
        commit('deleteTask', taskId)
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    tasks: state => state.tasks
  }
})

export default store