import { BiDownArrow } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { DateTime } from "ts-luxon";
import { Todo } from "../../Types/Types";

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const [tab, setTab] = useState(false);

  return (
    <div className="xl:w-[48%] w-screen  m-1 border border-white flex flex-col h-fit rounded-xl border-l-[14px] border-l-green-400">
      <div className="flex items-center gap-6 px-10 py-2">
        <input type="checkbox" name="" id="" className="w-6 h-6 rounded" />
        <div className="flex flex-col flex-wrap flex-1 sm:flex-row">
          <span className="flex-1 text-sm sm:text-xl">{todo.title}</span>
          <span className="text-sm md:text-xl">
            {DateTime.fromJSDate(
              typeof todo.dueDate === "string"
                ? new Date(todo.dueDate)
                : todo.dueDate
            )
              .toLocaleString(DateTime.DATE_SHORT)
              .slice(0, 5)}
          </span>
        </div>

        <div
          className="py-4 text-xl cursor-pointer"
          onClick={() => setTab(!tab)}
        >
          <BiDownArrow />
        </div>
      </div>
      <div className={`${tab ? "block" : " hidden"} p-5`}>
        <div className="mb-6 border-b" />
        <div className="flex flex-col gap-6 md:flex-row">
          <p className="flex-1 text-sm font-light md:text-xl">
            {todo.description}
          </p>
          <div className="flex justify-start gap-5 text-3xl md:px-6 md:flex-col">
            <div className="transition-transform duration-200 hover:scale-125">
              <AiFillEdit />
            </div>
            <div className="transition-transform duration-200 hover:scale-125">
              <AiFillDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
