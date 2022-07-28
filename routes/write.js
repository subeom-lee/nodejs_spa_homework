const express = require("express");
const Write = require("../schemas/write");
const router = express.Router();

router.get("/writes/:userId", async (req, res) => { // 댓글 목록 조회 : 조회하는 게시글에 작성된 모든 댓글을 목록 조회 / 작성 날짜 기준으로 내림차순 정렬
  const write = await Write.find({}).sort("-date");

    res.json({ write: write.map (res => ({
      userId: res.userId,
      comment: res.comment,
      date: res.date
    }))});
});

router.post("/writes/:userId", async (req, res) => { // 댓글 작성 : 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 메세지 return / 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가
  const date = new Date();
  const { userId, user, commentId, comment, password } = req.body;
  const write = await Write.find({ userId });
  if (write.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 있는 데이터입니다." })
  }
  if (comment.length === 0) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "댓글 내용을 입력해주세요." });
  }
  const createdWrite = await Write.create({
    userId,
    user,
    commentId,
    comment,
    password,
    date
  });

  res.json({ write: createdWrite });
});

router.put("/writes/:userId", async (req, res) => { // 댓글 수정 : 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
  const { userId } = req.params;
  const { password, comment } = req.body;

  const write = await Write.findOne({ userId });
  if (comment.length === 0) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "댓글 내용을 입력해주세요." });
  }
  if (write.password === password) {
    await write.updateOne({ comment });
  } else {
    res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 틀립니다." })
  }

  res.json({ success: true });
});

router.delete("/writes/:userId", async (req, res) => { // 댓글 삭제 : 원하는 댓글을 삭제하기
  const { userId } = req.params;
  const { password } = req.body;

  const write = await Write.findOne({ userId });

  if (write.password === password) {
    await write.delete();
    res.send ("삭제성공");
  } else {
    res
      .status(400)
      .json({ success: false, errorMessage: "비밀번호가 틀립니다." })
  }
});

module.exports = router;