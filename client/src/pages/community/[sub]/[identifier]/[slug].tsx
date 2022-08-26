import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { Comment, Post } from "../../../../types";
import Link from "next/link";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "../../../../context/auth";
import classNames from "classnames";

const PostPage = () => {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { authenticated, user } = useAuthState();
  const [newComment, setNewComment] = useState("");

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );

  const { data: comments, mutate } = useSWR<Comment[]>(
    identifier && slug ? `/posts/${identifier}/${slug}/comments` : null
  );

  console.log("comments", comments);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      return;
    }
    try {
      await axios.post(`/posts/${post?.identifier}/${post?.slug}/comments`, {
        body: newComment,
      });
      mutate();
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const vote = async (value: number, comment?: Comment) => {
    if (!authenticated) router.push("/login");

    // reset
    if (
      (!comment && value === post?.userVote) ||
      (comment && comment.userVote === value)
    ) {
      value = 0;
    }

    try {
      await axios.post("./votes", {
        identifier,
        slug,
        commentIdentifier: comment?.identifier,
        value,
      });
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
                {/* post up & down 기능 */}
                <div className="flex-shrink-0 w-10 text-center rounded-l">
                  {/* up */}
                  <div
                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                    onClick={() => vote(1)}
                  >
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={classNames({
                        "text-red-500": post.userVote === 1,
                      })}
                    />
                  </div>
                  <p className="text-xs font-bold">{post.voteScore}</p>
                  {/* down */}
                  <div
                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
                    onClick={() => vote(-1)}
                  >
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className={classNames({
                        "text-blue-500": post.userVote === -1,
                      })}
                    />
                  </div>
                </div>
                <div className="py-2 pr-2">
                  <div className="flex items-center">
                    <p className="text-xs text-gray-400">
                      Posted by
                      <FontAwesomeIcon icon={faCircleInfo} className="ml-2" />
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
                      <span className="font-bold">
                        {post.commentCount} Comments
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="pr-6 mb-4 ml-10">
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

              {/* 댓글 리스트 */}
              {comments?.map((comment) => (
                <div className="flex" key={comment.identifier}>
                  <div className="flex-shrink-0 w-10 text-center rounded-l">
                    {/* up */}
                    <div
                      className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                      onClick={() => vote(1, comment)}
                    >
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className={classNames({
                          "text-red-500": comment.userVote === 1,
                        })}
                      />
                    </div>
                    <p className="text-xs font-bold">{comment.voteScore}</p>
                    {/* down */}
                    <div
                      className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
                      onClick={() => vote(-1, comment)}
                    >
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        className={classNames({
                          "text-blue-500": comment.userVote === -1,
                        })}
                      />
                    </div>
                  </div>
                  <div className="py-2 pr-2">
                    <p className="mb-1 text-xs leading-none">
                      <Link href={`/user/${comment.username}`}>
                        <a className="mr-1 font-bold hover:underline">
                          {comment.username}
                        </a>
                      </Link>
                      <span className="text-gray-600">
                        {`
                          ${comment.voteScore}
                          posts
                          ${dayjs(comment.createdAt).format(
                            "YYYY-MM-DD HH:mm"
                          )}  
                        `}
                      </span>
                    </p>
                    <p>{comment.body}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
