import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useAuthDispatch, useAuthState } from "../context/auth";
import Animation from "./Animation";

const NavBar: React.FC = () => {
  const { loading, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    axios
      .post("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 bg-slate-300 h-13">
      <span className="text-2xl font-semibold text-gray-400 mt-2">
        <Link href="/">
          <a>
            {/* <Animation /> */}
            <Image
              src="/h-logo.png"
              alt="logo"
              width={60}
              height={50}
            ></Image>
          </a>
        </Link>
      </span>
      <div className="max-w-full px-4 w-1/3">
        <div className="relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white my-2">
          <FaSearch className="ml-2 text-gray-400" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="px-3 py-1 bg-transparent rounded focus:outline-none h-11"
          />
        </div>
      </div>

      <div className="flex">
        {!loading &&
          (authenticated ? (
            <button
              className="w-20 px-2 mr-2 text-sm text-center text-white bg-gray-400 rounded h-11"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link href="/login">
                <a className="flex justify-center items-center w-20 mr-2 text-lg text-blue-500 border border-blue-500 rounded h-11">
                  로그인
                </a>
              </Link>
              <Link href="/register">
                <a className="flex justify-center items-center w-20 mr-2 text-lg text-white bg-gray-400 rounded h-11">
                  회원가입
                </a>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
