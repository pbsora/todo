import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TodoArea from "./components/TodoArea";

function App() {
  return (
    <>
      <div
        id="container"
        className="border border-white  w-[70vw] h-[70vh] grid grid-cols-8 grid-rows-6"
      >
        <Header />
        <Sidebar />
        <TodoArea />
      </div>
    </>
  );
}

export default App;
