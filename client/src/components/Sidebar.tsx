import { AiFillGithub, AiFillProject, AiFillPlusSquare } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Outlet } from "react-router-dom";
import TodoModal from "./Todo/TodoModal";
import { useState } from "react";
import { SidebarContext } from "../context/sidebarContext";

const Sidebar = () => {
  const [modal, setModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <SidebarContext.Provider value={{ sidebar, setSidebar }}>
        <main className="flex">
          <div className={`${!sidebar && "hidden"} md:flex`}>
            <div
              className={`h-screen text-white bg-black absolute md:relative w-screen md:w-[7vw] xl:w-[5vw] flex flex-col items-center gap-8 px-8`}
            >
              <div
                className="absolute text-4xl left-5 md:hidden top-7"
                onClick={() => setSidebar(false)}
              >
                <RxHamburgerMenu />
              </div>
              <div
                id="side-top"
                className="pb-6 mt-3 text-5xl border-b group icon"
              >
                <AiFillGithub />
                <span className="sidebar-tooltip group-hover:scale-100">
                  Check out my Github
                </span>
              </div>

              <div
                id="side-main"
                className="flex flex-col flex-1 gap-6 text-4xl"
              >
                <div className="icon group">
                  <FaTasks />
                  <span className="sidebar-tooltip group-hover:scale-100">
                    Todos
                  </span>
                </div>
                <div className="icon group">
                  <AiFillProject />
                  <span className="sidebar-tooltip group-hover:scale-100">
                    Projects
                  </span>
                </div>
                <div className="icon group" onClick={() => setModal(true)}>
                  <AiFillPlusSquare />
                  <span className="sidebar-tooltip group-hover:scale-100">
                    New Todo
                  </span>
                </div>
              </div>
              <div
                id="side-bottom"
                className="flex flex-col items-center gap-8 mb-12 text-4xl"
              >
                <div className="icon group">
                  <BiLogOutCircle />
                  <span className="sidebar-tooltip group-hover:scale-100">
                    Log-out
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Outlet />
          {modal && <TodoModal setModal={setModal} />}
        </main>
      </SidebarContext.Provider>
    </>
  );
};

export default Sidebar;
