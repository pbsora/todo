import TodoItem from "./TodoItem";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Todo } from "../../Types/Types";
import { RxHamburgerMenu } from "react-icons/rx";
import { SidebarContext, Sidebar } from "../../context/sidebarContext";

const TodoArea = () => {
  const [allTodos, setAllTodos] = useState<Todo[] | null>(null);
  const { setSidebar } = useContext(SidebarContext) as Sidebar;

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
      <div
        className="p-4 text-3xl text-white md:hidden"
        onClick={() => setSidebar(true)}
      >
        <RxHamburgerMenu />
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-2 py-5 text-white md:px-10 lg:justify-start ">
        {allTodos && allTodos.map((todo) => <TodoItem todo={todo} />)}
      </div>
    </>
  );
};

export default TodoArea;
