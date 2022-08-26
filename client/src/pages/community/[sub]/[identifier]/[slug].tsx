import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { Post } from "../../../../types";
import Link from "next/link";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "../../../../context/auth";

const PostPage = () => {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { authenticated, user } = useAuthState();
  const [newComment, setNewComment] = useState("");

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return;
    }
    try {
      await axios.post(`/posts/${post?.identifier}/${post?.slug}/comments`, {
        body: newComment,
      });
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      <div className="w-full md:mr-3 md:w-8/12">
        <div className="bg-white rounded">
          {post && (
            <>
              <div className="flex">
                <div className="py-2 pr-2">
                  <div className="flex items-center">
                    <p className="text-xs text-gray-400">
                      Posted by <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                      {console.log("post user", post.username)}
                      <Link href={`/user/${post.username}`}>
                        <a className="mx-1 hover:underline">
                          /user/{post.username}
                        </a>
                      </Link>
                      <Link href={post.url}>
                        <a className="mx-1 hover:underline">
                          {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
                        </a>
                      </Link>
                    </p>
                  </div>
                  <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                  <p className="my-3 text-sm">{post.body}</p>
                  <div className="flex">
                    <button>
                      <FontAwesomeIcon icon={faMessage} />
                      {/* <i className="mr-1 fas fa-comment-alt fa-xs"></i> */}
                      <span className="font-bold">
                        {post.commentCount} Comments
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="pr-6 mb-4">
                  {authenticated ? (
                    <div>
                      <p className="mb-1 text-xs">
                        <Link href={`/user/${user?.username}`}>
                          <a className="font-semibold text-blue-500">
                            {user?.username}
                          </a>
                        </Link>{" "}
                        으로 댓글 작성
                      </p>
                      <form onSubmit={handleSubmit}>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focuse:border-gray-600"
                          onChange={(e) => setNewComment(e.target.value)}
                          value={newComment}
                        ></textarea>
                        <div className="flex justify-end">
                          <button
                            className="px-3 py-1 text-white bg-gray-400 rounded"
                            disabled={newComment.trim() === ""}
                          >
                            댓글 작성
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-2 py-4 border border-gray200 rounded">
                      <p className="font-semibold text-gray-400">
                        댓글 작성을 위해서 로그인을 해주세요.
                      </p>
                      <div>
                        <Link href={`/login`}>
                          <a className="px-3 py-1 text-white bg-gray-400 rounded">
                            로그인
                          </a>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
