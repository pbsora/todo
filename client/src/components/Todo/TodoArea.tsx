import TodoItem from "./TodoItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../../Types/Types";
import { RxHamburgerMenu } from "react-icons/rx";

const TodoArea = () => {
  const [allTodos, setAllTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/todo/all-todos",
        withCredentials: true,
      });

      setAllTodos(data);
    };
    getTodos();
  }, []);

  return (
    <>
      <div className="p-4 text-3xl ">
        <RxHamburgerMenu />
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-2 py-5 text-white md:px-10 lg:justify-start ">
        {allTodos && allTodos.map((todo) => <TodoItem todo={todo} />)}
      </div>
    </>
  );
};

export default TodoArea;
