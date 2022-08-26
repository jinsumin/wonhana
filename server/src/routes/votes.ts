import { Request, Response, Router } from "express";
import userMiddleware from "../middlewares/user";
import authMiddleware from "../middlewares/auth";
import { User } from "../entities/User";
import Post from "../entities/Post";
import Vote from "../entities/Vote";
import Comment from "../entities/Comment";

const vote = async (req: Request, res: Response) => {
  const { identifier, slug, commentIdentifier, value } = req.body;
  // -1, 0, 1 의 value 만 오는지 체크
  if (![-1, 0, 1].includes(value)) {
    return res.status(400).json({ value: "-1, 0, 1 의 값만 가능합니다." });
  }

  try {
    const user: User = res.locals.user;

    let post: Post = await Post.findOneByOrFail({ identifier, slug });
    let vote: Vote | undefined;
    let comment: Comment;

    if (commentIdentifier) {
      // 댓글 식별자가 있는 경우 댓글로 vote 찾기
      comment = await Comment.findOneByOrFail({
        identifier: commentIdentifier,
      });
      vote = await Vote.findOneBy({
        username: user.username,
        commentId: comment.id,
      });
    } else {
      // post 로 vote 찾기
      vote = await Vote.findOneBy({ username: user.username, postId: post.id });
    }

    if (!vote && value === 0) {
      // vote 이 없고 value 가 0 인 경우 오류 반환
      return res.status(404).json({ error: "Vote을 찾을 수 없습니다." });
    } else if (!vote) {
      // 새로운 vote
      vote = new Vote();
      vote.user = user;
      vote.value = value;

      // 게시물에 속한 vote or 댓글에 속한 vote 인지 판별
      if (comment) vote.comment = comment;
      else vote.post = post;
      await vote.save();
    } else if (value === 0) {
      vote.remove();
    } else if (vote.value !== value) {
      vote.value = value;
      await vote.save();
    }

    post = await Post.findOneOrFail({
      where: {
        identifier,
        slug,
      },
      relations: ["comments", "comments.vote", "sub", "votes"],
    });

    post.setUserVote(user);
    post.comments.forEach((e) => e.setUserVote(user));

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "문제가 발생하였습니다." });
  }
};

const router = Router();
router.post("/", userMiddleware, authMiddleware, vote);

export default router;
