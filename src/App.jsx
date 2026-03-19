import Sidebar from "./components/Menubar";
import IndexRoutes from "./routes/IndexRoutes";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <IndexRoutes />
    </div>
  );
};

export default App;
