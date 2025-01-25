import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendURL } from "../backend";

const SideBar = ({
  sideBarOpen,
  setSideBarOpen,
  loginPage,
  setloginPage,
}: any) => {
  const [delayedAnimation, setDelayedAnimation] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const location = useLocation();

  const handleToggle = () => {
    setTimeout(() => {
      setDelayedAnimation(!delayedAnimation);
    }, 550);
  };
  const handleClose = () => {
    setSideBarOpen(!sideBarOpen);
    if (!sideBarOpen) setDelayedAnimation(!delayedAnimation);
    else handleToggle();
  };
  const navigate = useNavigate();

  const handleNavigate = async () => {
    setSideBarOpen(!sideBarOpen);
    setDelayedAnimation(!delayedAnimation);
    setloginPage(true);
    if (token) {
      const res = await fetch(`${backendURL}api/logout`, {
        method: "POST",

        body: JSON.stringify({ JwtToken: token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        console.log("Logout successful");
        localStorage.removeItem("suvam_token");
        window.location.reload();
      }
    } else {
      navigate("/login");
    }
  };

  const handleBlogs = async (blogType: string) => {
    navigate(`${blogType}`);
    handleClose();
  };

  useEffect(() => {
    // Function to get a specific cookie value by name
    // const getCookie = (name: string): string | null => {
    //   const cookies = document.cookie
    //     .split("; ")
    //     .find((row) => row.startsWith(`${name}=`));
    //   return cookies ? cookies.split("=")[1] : null;
    // };
    // // Example: Access a cookie named "userToken"
    // const userToken = getCookie("admin_token");
    const userToken = localStorage.getItem("suvam_token");
    setToken(userToken);
  }, [sideBarOpen]);

  useEffect(() => {
    if (location.pathname === "/login") setloginPage(true);
    else setloginPage(false);
  }, []);

  return (
    <div
      className={`h-full ${loginPage ? "hidden" : "block"}  ${
        delayedAnimation ? "w-full" : "w-0"
      }  absolute ${
        !sideBarOpen
          ? "bg-none "
          : "bg-white/30  shadow-lg backdrop-blur-sm border border-white/30 overflow-hidden"
      } `}
    >
      <div
        className={` h-dvh ${
          sideBarOpen ? "w-60" : "w-0"
        } bg-red-300 transition-all duration-500 `}
      >
        <div className=" p-3 " onClick={handleClose}>
          {sideBarOpen ? <CloseIcon /> : <HamIcon />}
        </div>
        <ul
          className={`flex flex-col gap-4 p-4 ${
            !sideBarOpen ? " hidden" : " block"
          }`}
        >
          <li
            className=" border-b-2 p-2 cursor-pointer text-xl font-medium"
            onClick={() => handleBlogs("/fictional")}
          >
            Fictional
          </li>
          <li
            className=" border-b-2 p-2 cursor-pointer text-xl font-medium"
            onClick={() => handleBlogs("/non-fictional")}
          >
            Non-fictional
          </li>
          {token ? (
            <li
              className=" border-b-2 p-2 cursor-pointer text-xl font-medium"
              onClick={() => {
                navigate("/addblog");
                handleClose();
              }}
            >
              Add Blog
            </li>
          ) : null}
          <li
            className=" border-b-2 p-2 cursor-pointer text-xl font-medium"
            onClick={handleNavigate}
          >
            {token ? "Logout" : "Login"}
          </li>
        </ul>
      </div>
    </div>
  );
};

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-7 ml-auto cursor-pointer mt-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

const HamIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-7 ml-auto cursor-pointer mt-5 absolute"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

export default SideBar;
