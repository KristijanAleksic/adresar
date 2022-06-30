
import Table from "../components/Table/Table";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Table></Table>
  );
  };

export default HomePage;
