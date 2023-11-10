import { BiDownArrow } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { DateTime } from "ts-luxon";
import { Todo } from "../../Types/Types";
import TodoModal from "./TodoModal";
import axios from "axios";

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const [tab, setTab] = useState(false);
  const [modal, setModal] = useState(false);
  const [complete, setComplete] = useState(todo.complete);

  let color = "";
  switch (todo.priority) {
    case 1:
      color = "border-l-green-500";
      break;
    case 2:
      color = "border-l-yellow-500";
      break;
    case 3:
      color = "border-l-red-500";
      break;
  }

  const handleComplete = async () => {
    const { data } = await axios({
      method: "post",
      url: "todo/todo-complete",
      data: {
        id: todo._id,
      },
      withCredentials: true,
    });
    console.log(data);
    setComplete(!complete);
  };

  return (
    <>
      <div
        className={`xl:w-[48%] w-screen  m-1 border border-white flex flex-col h-fit rounded-xl border-l-[14px] ${color} `}
        key={todo._id}
      >
        <div className="flex items-center gap-6 px-10 py-2 ">
          <input
            type="checkbox"
            name=""
            onChange={handleComplete}
            checked={complete}
            className="w-6 h-6 rounded cursor-pointer"
          />
          <div className="flex flex-col flex-wrap flex-1 sm:flex-row">
            <span
              className={`flex-1 text-sm  sm:text-xl ${
                complete && "line-through text-zinc-500"
              }`}
            >
              {todo.title}
            </span>
            <span className="text-sm md:text-xl">
              {DateTime.fromJSDate(
                typeof todo.dueDate === "string"
                  ? new Date(todo.dueDate)
                  : todo.dueDate
              )
                .setZone("UTC")
                .toLocaleString({ month: "short", day: "numeric" })}
            </span>
          </div>

          <div
            className="py-4 text-xl cursor-pointer"
            onClick={() => setTab(!tab)}
          >
            <BiDownArrow />
          </div>
        </div>
        <div
          className={`${
            tab ? "animate-flip-down animate-duration-[400ms]" : " hidden"
          } p-5 `}
        >
          <div className="mb-6 border-b" />
          <div className="flex flex-col gap-6 md:flex-row">
            <p className="flex-1 text-sm font-light md:text-xl">
              {todo.description}
            </p>
            <div className="flex justify-start gap-5 text-3xl md:px-6">
              <div
                className="transition-transform duration-200 hover:scale-125"
                onClick={() => setModal(true)}
              >
                <AiFillEdit />
              </div>
              <div className="transition-transform duration-200 hover:scale-125">
                <AiFillDelete />
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && <TodoModal task={todo} setModal={setModal} />}
    </>
  );
};

export default TodoItem;
