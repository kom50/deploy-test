import fs from 'node:fs';
const __dirname = process.cwd()

export interface Todo {
    id: number;
    userId: number;
    completed: boolean;
    todo: string;
}

const rawTodos = fs.readFileSync(`${__dirname}/server/assets/data.json`, 'utf8');
const todos: Todo[] = JSON.parse(rawTodos);


function findTodoById(id: number): Todo | null {
    return todos.find((todo) => todo.id == id) || null
}

function getAllTodos(): Todo[] {
    return todos
}

function findTodoByUserId(userId: number): Todo[] {
    return todos.filter((todo) => todo.userId == userId)
}

function findTodoWithComplete(completed: boolean): Todo[] {
    return todos.filter((todo) => todo.completed == completed)
}

export default defineEventHandler(async (event) => {
    const { id, completed, userId } = getQuery(event)

    if (id) return findTodoById(id as number)
    else if (userId) return findTodoByUserId(userId as number)
    else if (completed) return findTodoWithComplete(completed === 'true')
    else if (!id && !completed && !userId) return getAllTodos()
});
