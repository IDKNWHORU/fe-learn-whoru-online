// @ts-check
import { test, expect } from "@playwright/test";

test("커뮤니티 게시글 작성 기능 테스트", async ({ page }) => {
  await page.goto("/community");
  await page.waitForNavigation();

  // 게시글 목록 페이지에 접속했는지 확인
  await expect(page.locator('h1:has-text("콘텐츠 리스트")')).toBeVisible();

  // 게시글 작성 페이지로 이동
  await page.locator('a:has-text("추가하기")').click();
  await page.waitForNavigation();

  const timestamp = Date.now();
  // 게시글 작성
  await page
    .locator('input[name="title"]')
    .fill(`테스트 게시글 제목 - ${timestamp}`);
  await page.locator('select[name="type"]').selectOption("CONTENT");
  await page
    .locator(".toastui-editor-ww-container > .toastui-editor > .ProseMirror")
    .type(`테스트 게시글 내용 - ${timestamp}`);

  await page.locator('button:has-text("저장하기")').click();
  await page.waitForNavigation();

  //  게시글 목록에서 작성한 게시글 확인
  await expect(
    page.locator(`h2:has-text("[콘텐츠] 테스트 게시글 제목 - ${timestamp}")`)
  ).toBeVisible();

  // 게시글 상세 페이지로 이동
  await page
    .locator(`h2:has-text("테스트 게시글 제목 - ${timestamp}")`)
    .click();
  await page.waitForNavigation();

  // 게시글 상세 페이지에 접속했는지 확인
  await expect(
    page.locator(`h1:has-text("테스트 게시글 제목 - ${timestamp}")`)
  ).toBeVisible();
  // 게시글 수정 페이지로 이동
  await page.locator('a:has-text("수정하기")').click();
  await page.waitForNavigation();
  await page.waitForTimeout(1000);

  // 게시글 수정 페이지에 접속했는지 확인
  await expect(page.locator('input[name="title"]')).toHaveValue(
    `테스트 게시글 제목 - ${timestamp}`
  );
  // 게시글 수정 페이지에서 제목을 변경
  await page
    .locator('input[name="title"]')
    .fill(`수정된 테스트 게시글 제목 - ${timestamp}`);
  // 수정후 게시글 저장
  await page.locator('button:has-text("수정하기")').click();
  await page.waitForNavigation();
  // 게시글 목록에서 수정된 게시글 확인
  await page.goto("/community");
  await expect(
    page.locator(`h2:has-text("수정된 테스트 게시글 제목 - ${timestamp}")`)
  ).toBeVisible();
  // 게시글 추천과 삭제를 위해 게시글 상세 페이지로 이동
  await page
    .locator(`h2:has-text("[콘텐츠] 수정된 테스트 게시글 제목 - ${timestamp}")`)
    .click();
  await page.waitForNavigation();
  // 게시글 추천 버튼 클릭
  await page.locator('button:has-text("추천")').click();
  await page.waitForNavigation();
  // 게시글 추천이 되었는지 확인
  await expect(page.locator('p:has-text("추천수: 1")')).toBeVisible();
  // 게시글 추천 해제 버튼 클릭
  await page.locator('button:has-text("추천")').click();
  await page.waitForNavigation();
  // 게시글 추천이 해제 되었는지 확인
  await expect(page.locator('p:has-text("추천수: 0")')).toBeVisible();
  // 게시글 삭제 버튼 클릭
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator('button:has-text("삭제")').click();
  await page.waitForNavigation();
  // 게시글 목록에서 삭제된 게시글 확인 (삭제된 게시글이 목록에 없는지 확인)
  await expect(
    page.locator(`h2:has-text("수정된 테스트 게시글 제목 - ${timestamp}")`)
  ).not.toBeVisible();
});
