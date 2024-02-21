import { useLocation } from "react-router-dom";
import plusImg from "./../../../assets/plus-square-svgrepo-com.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";

const Theme = () => {
  const { state } = useLocation();
  const navigation = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["thema"],
    queryFn: async () => {
      const response = await fetch("/api/fetch_theme_pages", {
        body: { id },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonResponse = await response.json();
      return {
        themeName: jsonResponse.theme_name,
        pages: jsonResponse.pages,
      };
    },
  });
  if (error) console.log(error);

  const handleDelete = useMutation({
    mutationFn: async () => {
      const response = axios.post("/api/delete_theme", id);
      const status = response.json();
      return status.success;
    },
  });
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <div className="w-[80%] h-screen pt-20 pl-8 mx-auto">
      <div className="flex flex-row pb-12">
        <h1
          className={`text-4xl font-semibold w-[16rem] h-[3rem] bg-[#EBEDEF] placeholder:text-black focus:outline-none`}
        >
          {data?.themeName}
        </h1>
        <motion.button
          onClick={handleDelete}
          className="flex px-4 py-2 text-lg font-semibold text-white uppercase bg-red-500 border rounded-lg place-self-end w-fit"
        >
          DELETE THEME
        </motion.button>
      </div>
      <div className="grid grid-cols-3 gap-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col w-[16rem] h-[8rem] rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700"
        >
          {/* <Link to='/admin/thema/bladzijde'> */}
          <div className="flex flex-row">
            <div className="inline-block p-6 text-2xl font-semibold text-center">
              Nieuwe pagina toevoegen{" "}
              <img
                className="inline-block w-10 h-10"
                src={plusImg}
                alt="plus icon"
              />
            </div>
          </div>
          {/* </Link> */}
        </motion.button>

        {data.pages.length === 0 ? (
          <p className="text-lg text-center">
            {data.themeName} currently does not have a page.
          </p>
        ) : (
          data.pages.map((page) => (
            <motion.button
              key={page.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigation(`/admin/thema/${state}`);
              }}
              className="flex flex-col w-[16rem] h-[8rem] rounded-md bg-black text-white bg-gradient-to-br from-sky-300 to-blue-700"
            >
              <p className="p-6 text-2xl font-semibold text-center">
                {page.page_name}
              </p>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
};

export default Theme;