import { BiLoaderAlt } from "react-icons/bi";

const Loading = ({ classStyle }) => {
  return (
    <BiLoaderAlt className={`${classStyle ? classStyle : ""} animate-spin`} />
  );
};

export default Loading;
