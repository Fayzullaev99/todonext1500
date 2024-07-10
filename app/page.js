'use client'
import Image from "next/image";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import plus from "@/images/plus.svg";
import Loader from "@/components/Loader";
import Empty from "@/components/Empty";
import Todos from "@/components/Todos";
import Info from "@/components/Info";

export default function Home() {
  const [edit, setEdit] = useState(null)
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      })
  }, [])


  async function addTodo() {
    if (!newTodo.trim()) return
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify({ text: newTodo }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    setTodos([data, ...todos])
    setNewTodo("")
  }

  async function deleteTodo(id) {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status == 200) {
      setTodos(todos.filter(todo => todo._id != id))
    }

  }

  async function editTodo(todo) {
    setEdit(todo)
  }

  async function updateTodo() {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "PUT",
      body: JSON.stringify({ id: edit._id, text: edit.text, check: edit.check }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status == 200) {
      setTodos(todos.map(todo => todo._id == edit._id ? {...todo,text:edit.text} : todo))
      setEdit(null)
    }

  }

  async function checkTodo(todo) {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "PUT",
      body: JSON.stringify({...todo, id: todo._id, check: !todo.check }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status == 200) {
      setTodos(todos.map(el => el._id == todo._id ? {...el,check: !todo.check} : el))
    }

  }

  return (
    <section className={styles.main}>
      <div className="container">
        {edit ? (
          <div className={styles.main__input}>
            <input
              type="text"
              placeholder="Write your note"
              value={edit?.text}
              onChange={(e) => setEdit({ ...edit, text: e.target.value })}
            />
            <button onClick={updateTodo}>
              Edit
              <Image src={plus} alt="edit" />
            </button>
          </div>
        ) : (
          <div className={styles.main__input}>
            <input
              type="text"
              placeholder="Write your note"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>
              Add
              <Image src={plus} alt="add" />
            </button>
          </div>
        )}
        {
          loading ? <Loader /> : todos.length <= 0 ? (
            <>
              <Info data={todos} />
              <Empty />
            </>
          ) : (
            <>
              <Info data={todos} />
              <Todos data={todos} handler={{ deleteTodo, editTodo, checkTodo }} />
            </>
          )
        }
      </div>
    </section>
  );
}
