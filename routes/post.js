const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/posts", async (req, res) => { // 게시글 전체조회 : 제목, 작성자명, 작성 날짜를 조회 / 작성날짜기준으로 내림차순 정렬
  const post = await Post.find({}).sort("-date");
  
  res.json({ post: post.map (res => ({
    title: res.title,
    user: res.user,
    date: res.date
  }))});
});

router.post("/posts", async (req, res) => { // 게시글 작성 : 제목, 작성자명, 비밀번호, 작성 내용을 입력
  const date = new Date();
  const { userId, user, title, comment, password } = req.body;

  const post = await Post.find({ userId });
  if (post.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 있는 데이터입니다." })
  }

  const createdPost = await Post.create({
    userId,
    user,
    title,
    comment,
    password,
    date
  });

  res.json({ post: createdPost });
});

router.get("/posts/:userId", async (req, res) => { // 게시글 상세조회 : 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기
  const { userId } = req.params;

  const post = await Post.find({ userId });

  res.json({ post: post.map (res => ({
    title: res.title,
    user: res.user,
    date: res.date,
    comment: res.comment
  }))});
});

router.delete("/posts/:userId", async (req, res) => { // 게시글 삭제 API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
  const { userId } = req.params;
  const { password } = req.body;

  const post = await Post.findOne({ userId });

  if (post.password === password) {
    await post.delete();
    res.send ("삭제성공");
  } else {
    res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 틀립니다." })
  }
});

router.put("/posts/:userId", async (req, res) => { // 게시글 수정 API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
  const { userId } = req.params;
  const { password, title, comment } = req.body;

  const post = await Post.findOne({ userId });
  if (post.password === password) {
    await post.updateOne({ title });
    await post.updateOne({ comment });
  } else {
    res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 틀립니다." })
  }
  res.json({ success: true });
});

module.exports = router;