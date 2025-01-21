// @ts-check
import { test, expect } from "@playwright/test";

test("프로필 수정 기능 테스트", async ({ page }) => {
  // 프로필 페이지로 이동
  await page.goto("/profile");
  await page.waitForTimeout(1000);

  // 프로필 페이지에 접속했는지 확인
  await expect(page.locator('p:has-text("안녕하세요")')).toBeVisible();
  // 프로필 수정 페이지로 이동
  await page.locator('a[class*="profile_setting_button"]').click();
  await page.waitForNavigation();
  await page.waitForTimeout(1000);

  // 프로필 수정 페이지에 접속했는지 확인
  await expect(page.locator('h1:has-text("프로필 수정")')).toBeVisible();
  // 프로필 수정
  const timestamp = Date.now();
  await page
    .locator(".toastui-editor-ww-container > .toastui-editor > .ProseMirror")
    .fill(`e2e 테스트 계정 자기소개 - ${timestamp}`);
  await page.locator('button:has-text("프로필 저장")').click();
  await page.waitForNavigation();

  // // 프로필 수정 내용 확인
  await page.goto("/profile");
  await page.waitForNavigation();
  // // 아티클 완료하기 버튼 클릭
  await expect(
    page.locator(`p:has-text("e2e 테스트 계정 자기소개 - ${timestamp}")`)
  ).toBeVisible();
});
