import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Todo, Project } from "../../Types/Types";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

type Props = {
  todo?: Todo;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoModal = ({ setModal }: Props) => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    project: "",
    priority: "",
  });
  const [dueDate, setDueDate] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  useEffect(() => {
    const getProjects = async () => {
      const { data } = await axios.get("/project/projects", {
        withCredentials: true,
      });
      setProjects(data);
    };
    getProjects();
  }, []);

  const handleNewTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios({
      method: "post",
      url: "todo/new-todo",
      data: {
        title: todo.title,
        description: todo.description,
        dueDate: dueDate,
        priority: todo.priority,
        project: todo.project,
      },
      withCredentials: true,
    });
    console.log(data);
  };

  console.log(todo);

  return (
    <div className=" absolute top-0 left-0 flex items-center justify-center w-screen h-screen animate-fade animate-duration-[600ms] animate-delay-100 animate-ease-in-out animate-normal bg-black bg-opacity-80 z-50">
      <div
        id="modal"
        className="border-2 border-white relative w-[95vw] h-fit lg:w-2/4 bg-zinc-800 opacity-100 pb-6 animate-jump-in animate-duration-[600ms] animate-delay-100 animate-ease-in-out rounded-xl"
      >
        <div
          className="absolute text-3xl cursor-pointer top-3 right-3"
          onClick={() => setModal(false)}
        >
          <AiOutlineClose />
        </div>
        <form action="#" className="px-5 pt-5 " onSubmit={handleNewTodo}>
          <div className="mt-3">
            <label htmlFor="title" className="block mb-2 text-2xl">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full p-3 rounded-xl bg-zinc-900"
              onChange={handleChange}
              value={todo.title}
            />
          </div>
          <div className="mt-3 ">
            <label htmlFor="description" className="block mb-2 text-2xl">
              Description
            </label>
            <textarea
              name="description"
              cols={30}
              rows={5}
              className="w-full rounded-xl bg-zinc-900 "
              onChange={handleChange}
              value={todo.description}
            />
          </div>
          <div className="w-full m-auto mt-3 ">
            <label htmlFor="title" className="block mb-2 text-2xl">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              className="w-full p-3 rounded-lg bg-zinc-900"
              onChange={handleDate}
              value={dueDate}
            />
          </div>
          <div className="mt-3 ">
            <label htmlFor="title" className="block mb-2 text-2xl">
              Project
            </label>
            <select
              name="project"
              className="w-full p-3 rounded bg-zinc-900 "
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              {projects &&
                projects.map((project) => (
                  <option value={project._id} key={project._id}>
                    {project.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-3 ">
            <label htmlFor="title" className="block mb-2 text-2xl">
              Priority
            </label>
            <select
              name="priority"
              className="w-full p-3 rounded bg-zinc-900 "
              onChange={handleChange}
              value={todo.priority}
            >
              <option value="">Select an option</option>
              <option value="1">Not urgent</option>
              <option value="2">Semi-urgent</option>
              <option value="3">Urgent</option>
            </select>
          </div>
          <div className="flex justify-center w-full mt-10">
            <button
              className="w-2/4 p-4 m-auto text-xl transition-all duration-200 rounded-xl bg-zinc-900 hover:scale-110"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
