import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "../components/InputGroup";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-content h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <div className="mb-2 text-lg font-medium">회원가입</div>
          <form>
            <InputGroup
              placeholder="이메일을 입력하세요."
              value={email}
              setValue={setEmail}
              error={errors.email}
            />
            <InputGroup
              placeholder="사용자명을 입력하세요."
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder="비밀번호를 입력하세요."
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full h-12 py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              회원가입
            </button>
          </form>
          <small>
            이미 가입하셨나요?
            <Link href="/login">
              <a className="ml-1 text-blue-600 uppercase">로그인</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
