<template>
  <div>
    <h1> Get data from server </h1>
    <p v-if="pending">Loading...</p>
    <table v-else class="todo-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Todo</th>
          <th>Completed</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.todo }}</td>
          <td :class="{ completed: todo.completed }">{{ todo.completed ? 'Yes' : 'No' }}</td>
          <td>{{ todo.userId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

interface Todo {
  id: number;
  userId: number;
  completed: boolean;
  todo: string;
}

const { data: todos, pending } = await useAsyncData<{ data: Todo }>('todos', () => $fetch('/api/todos'))

</script>

<style>
.todo-table {
  border-collapse: collapse;
  width: 100%;
}

.todo-table th,
.todo-table td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.todo-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.todo-table .completed {
  text-decoration: line-through;
  color: #ccc;
}
</style>