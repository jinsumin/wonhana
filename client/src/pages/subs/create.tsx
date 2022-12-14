import React, { FormEvent, useState } from "react";
import InputGroup from "../../components/InputGroup";
import axios from "axios";
import Router from "next/router";
import { GetServerSideProps } from "next";

const SubCreate = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post("/subs", { name, title, description });
      Router.push(`/community/${res.data.name}`);
    } catch (error: any) {
      console.error(error);
      setErrors(error.response.data);
    }
  };

  return (
    <div className="flex flex-col justify-center pt-16">
      <div className="w-10/12 mx-auto md:w-96">
        <h1 className="mb-2 text-lg font-medium">커뮤니티 만들기</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="my-2 mt-6">
            <p className="font-medium">Name</p>
            <p className="mb-2 text-xs text-gray-400">
              커뮤니티 이름은 변경할 수 없습니다.
            </p>
          </div>
          <InputGroup
            placeholder="이름"
            value={name}
            setValue={setName}
            error={errors.name}
          />
          <div className="my-2 mt-6">
            <p className="font-medium">Title</p>
            <p className="mb-2 text-xs text-gray-400">
              주제를 나타냅니다. 언제든지 변경 가능합니다.
            </p>
          </div>
          <InputGroup
            placeholder="제목"
            value={title}
            setValue={setTitle}
            error={errors.title}
          />
          <div className="my-2 mt-6">
            <p className="font-medium">Description</p>
            <p className="mb-2 text-xs text-gray-400">커뮤니티 상세 설명</p>
          </div>
          <InputGroup
            placeholder="설명"
            value={description}
            setValue={setDescription}
            error={errors.description}
          />
          <div className="flex justify-end my-6">
            <button className="mt-2 px-4 py-1 h-10 text-sm font-semibold rounded text-white bg-gray-400 border">
              커뮤니티 생성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCreate;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");

    await axios.get("/auth/me", { headers: { cookie } });

    return { props: {} };
  } catch (error) {
    // error code 307 : tempoprary redirect
    res.writeHead(307, { Location: "/login" }).end();
    return { props: {} };
  }
};
