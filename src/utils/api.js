import axios from "axios";
import { generateId } from "./string";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

const token = localStorage.getItem('token');

console.log(token);

api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';



const API_URL = 'http://localhost:8000';

const postTask = (task) => {
  return fetch(`${API_URL}/task`, {
    method: 'POST',
    mode: 'cors',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task),
}).then(res => res = res.json())
.catch(error => console.error('Error:', error))
}

const getAllTasks = () => {
  return fetch(`${API_URL}/task`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }).then(res => res = res.json());
}

const getAllBoards = () => {
  return fetch("http://localhost:8000/board", {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((response) => response.json())
  .catch(error => console.error('Error:', error));
}

const deleteTask = (taskId) => {
  return fetch(`${API_URL}/task/${taskId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }).then(res => res = res.json())
}

const patchTask = (taskId, data) => {
  return fetch(`${API_URL}/task/${taskId}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
  }).then(res => res = res.json())
  .catch(error => console.error('Error:', error))
}

const clearCompleted = () => {
  return fetch(`${API_URL}/task/clear`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }).then(res => res = res.json())
  .catch(error => console.error('Error:', error))
}

const login = ({email, password}) => {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  }).then(res => res = res.json())
  .catch(error => console.error('Error:', error))
}

const register = ({email, password}) => {
  return fetch(`${API_URL}/register`, {
    method: 'POST',
    mode: 'cors',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  }).then(res => res = res.json())
  .catch(error => console.error('Error:', error))
}


export default {
  postTask,
  getAllTasks,
  deleteTask,
  patchTask,
  clearCompleted,
  login,
  register,
  getAllBoards,
}