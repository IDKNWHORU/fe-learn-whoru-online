// @ts-check
import { test, expect } from "@playwright/test";

test("작업물 코멘트 기능 테스트", async ({ page }) => {
  // 작업 목록 페이지로 이동
  await page.goto("/work");
  await page.waitForNavigation();

  // 작업 목록 페이지에 접속했는지 확인
  await expect(page.locator('h1:has-text("작업 목록")')).toBeVisible();
  // e2e 테스트 작업 상세 페이지로 이동
  await page
    .getByRole("link", { name: "e2e 테스트 작업", exact: true })
    .click();
  await page.waitForNavigation();

  // e2e 테스트 작업 상세 페이지에 접속했는지 확인
  await expect(page.locator('h1:has-text("작업")')).toBeVisible();
  await page.waitForTimeout(1000);
  // e2e 테스트 작업물 코멘트 상세 페이지 이동
  await page.locator('h3:has-text("e2e 테스트 작업물 코멘트")').click();
  await page.waitForNavigation();
  await page.waitForTimeout(1000);

  // e2e 테스트 작업물 코멘트 상세 페이지에 접속했는지 확인
  await expect(page.locator('input[id="title"]')).toHaveValue(
    "e2e 테스트 작업물 코멘트"
  );
  // 코멘트 내용 입력
  const timestamp = Date.now();
  await page
    .locator(".toastui-editor-ww-container > .toastui-editor > .ProseMirror")
    .last()
    .type(`e2e 테스트 작업물 코멘트 내용 - ${timestamp}`);
  await page.locator('button:has-text("작성하기")').click();
  await page.waitForNavigation();

  await expect(
    page
      .locator(".comment > .frame-143 > .frame-142")
      .last()
      .locator(".comment-viewer")
  ).toHaveText(`e2e 테스트 작업물 코멘트 내용 - ${timestamp}`);
});
