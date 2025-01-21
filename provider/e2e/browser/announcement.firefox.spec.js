// e2e/announcement.spec.jsx
import { test, expect } from "@playwright/test";

test("firefox에서 공고 페이지 기능 테스트", async ({ page }) => {
  await page.goto("/announcement");
  await page.waitForNavigation();

  // 공고 목록 페이지 이동
  await expect(page.locator('h1:has-text("공고 목록")')).toBeVisible();

  // "e2e 테스트 공고" 상세 페이지 이동
  await page.locator('a:has-text("e2e 테스트 공고")').click();
  await page.waitForNavigation();
  await expect(page.locator('h2:has-text("e2e 테스트 공고")')).toBeVisible();
  // "e2e 테스트 공고" 상세 페이지로 이동 후 "firefox e2e 테스트 작업" 페이지로 이동
  await page.locator('h3:has-text("firefox e2e 테스트 작업")').click();
  await page.waitForNavigation();
  // "firefox e2e 테스트 작업" 상세 페이지에 접속했는지 확인
  await expect(
    page.locator('h1:has-text("firefox e2e 테스트 작업")')
  ).toBeVisible();
  // "firefox e2e 테스트 지원서" 작성 페이지로 이동
  await page.locator('a:has-text("지원하기")').click();
  await page.waitForNavigation();
  await page.waitForTimeout(1000);
  // 작업 지원서 작성
  await expect(page.locator('input[name="title"]')).toHaveValue(
    "firefox e2e 테스트 지원서"
  );
  await page
    .locator(".toastui-editor-ww-container > .toastui-editor > .ProseMirror")
    .fill("firefox 테스트 지원서 내용");
  await page.locator('button:has-text("제출하기")').click();
  await page.waitForNavigation();
});
