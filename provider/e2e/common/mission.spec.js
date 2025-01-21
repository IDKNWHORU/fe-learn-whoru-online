// @ts-check
import { test, expect } from "@playwright/test";

test("미션 완료 기능 테스트", async ({ page }) => {
  // 학습 참여 페이지로 이동
  await page.goto("/participation");
  await page.waitForNavigation();

  // 학습 참여 페이지에 접속했는지 확인
  await expect(page.locator('h1:has-text("학습 참여")')).toBeVisible();
  // e2e 테스트 학습 페이지로 이동
  await page.locator('a:has-text("e2e 테스트 학습")').click();
  await page.waitForNavigation();

  // e2e 테스트 학습 페이지에 접속했는지 확인
  await expect(page.locator('h2:has-text("e2e 테스트 학습")')).toBeVisible();
  // e2e 테스트 학습 페이지로 이동 후 "e2e 테스트 미션" 페이지로 이동
  await page.locator('a:has-text("e2e 테스트 미션")').click();
  await page.waitForNavigation();

  // e2e 테스트 미션 상세 페이지에 접속했는지 확인
  await expect(page.locator('h4:has-text("e2e 테스트 미션")')).toBeVisible();
  // e2e 테스트 미션 제출하기 버튼 클릭
  await page.locator('a:has-text("제출하기")').click();
  await page.waitForNavigation();
  await page.waitForTimeout(1000);
  // 미션 제출 페이지에 접속했는지 확인
  await expect(page.locator('h1:has-text("제출 내용")')).toBeVisible();
  // 미션 제출 내용 작성
  await page
    .locator(
      ".mission-submit-content .toastui-editor-ww-container > .toastui-editor > .ProseMirror"
    )
    .fill(`테스트 미션 제출 내용`);
  // 미션 제출 버튼 클릭
  await page.locator('button:has-text("제출하기")').click();
  await page.waitForNavigation();
  // 미션 상세 페이지로 이동
  await page.locator('button:has-text("돌아가기")').click();
  // 미션 상태가 제출됨인지 확인
  await expect(page.locator('p:has-text("제출됨")')).toBeVisible();
});
