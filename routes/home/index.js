"use strict";
const express = require("express");
const router = express.Router();

const homeCtrl = require("./home.ctrl");
const pageCtrl = require("./page.ctrl");
const questCtrl = require("./quest.ctrl");

//메인
router.get("/", homeCtrl.output.home);

//질문지
router.get("/quest", questCtrl.output.quest);
router.post("/quest", questCtrl.process.searchStay);
router.get("/questList", questCtrl.output.list);

//로그인
router.get("/login", homeCtrl.output.login);
router.get("/register", homeCtrl.output.register);

router.post("/login", homeCtrl.process.login);
router.post("/register", homeCtrl.process.register);
router.post("/login", homeCtrl.process.passportLogin);

//글 목록
router.get("/list", pageCtrl.list);

//글 쓰기 작성 화면
router.get("/write", pageCtrl.write);

//글 작성 과정
router.post("/write_process", pageCtrl.writeProcess);

//글 삭제하기
router.delete("/delete", pageCtrl.deletePage);

//상세페이지
router.get("/detail/:id", pageCtrl.detailPage);

//수정 페이지
router.get("/edit/:id", pageCtrl.findEditPage);
router.put("/edit", pageCtrl.editPage);

//검색기능
router.get("/search", pageCtrl.searchPage);

module.exports = router;
