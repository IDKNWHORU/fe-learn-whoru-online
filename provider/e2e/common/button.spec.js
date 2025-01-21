// @ts-check
import { test, expect } from "@playwright/test";

test("메인 페이지 접속 테스트", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('button:has-text("로그아웃")')).toBeVisible();
});
