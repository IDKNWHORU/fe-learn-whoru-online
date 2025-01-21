// @ts-check
import { test, expect } from "@playwright/test";

test("아티클 완료 기능 테스트", async ({ page }) => {
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
  // e2e 테스트 학습 페이지로 이동 후 "e2e 테스트 아티클" 페이지로 이동
  await page.locator('a:has-text("e2e 테스트 아티클")').click();
  await page.waitForNavigation();

  // e2e 테스트 아티클 상세 페이지에 접속했는지 확인
  await expect(page.locator('h1:has-text("e2e 테스트 아티클")')).toBeVisible();
  // 아티클 완료하기 버튼 클릭
  await page.locator('button:has-text("아티클 완료하기")').click();
  await page.waitForNavigation();
  // 아티클 완료 상태로 변경 되었는지 확인
  await expect(page.locator('p:has-text("완료")')).toBeVisible();
});
