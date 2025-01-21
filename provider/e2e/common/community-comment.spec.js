// @ts-check
import { test, expect } from "@playwright/test";

test("커뮤니티 게시글 댓글 작성 기능 테스트", async ({ page }) => {
  await page.goto("/community");
  await page.waitForNavigation();

  // 게시글 목록 페이지에 접속했는지 확인
  await expect(page.locator('h1:has-text("콘텐츠 리스트")')).toBeVisible();

  const timestamp = Date.now();
  //  게시글 목록에서 "e2e 콘텐츠 댓글 테스트" 게시글 확인
  await expect(
    page.locator('h2:has-text("[콘텐츠] e2e 콘텐츠 댓글 테스트")')
  ).toBeVisible();

  // 게시글 상세 페이지로 이동
  await page;
  page.locator('h2:has-text("[콘텐츠] e2e 콘텐츠 댓글 테스트")').click();
  await page.waitForNavigation();

  // e2e 콘텐츠 댓글 테스트 상세 페이지에 접속했는지 확인
  await expect(
    page.locator('h1:has-text("e2e 콘텐츠 댓글 테스트")')
  ).toBeVisible();
  await page.waitForTimeout(1000);
  // 코멘트 작성
  await page
    .locator(".toastui-editor-ww-container > .toastui-editor > .ProseMirror")
    .type(`테스트 코멘트 내용 - ${timestamp}`);
  // 댓글 추가하기 버튼 클릭
  await page.locator('button:has-text("댓글 추가하기")').click();
  await page.waitForTimeout(1000);
  const divSelector = ".comment .frame-143";
  await page.evaluate(async (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, divSelector);
  // 댓글이 추가되었는지 확인
  await expect(
    page.locator(`.comment p:has-text("테스트 코멘트 내용 - ${timestamp}")`)
  ).toBeVisible();
});
