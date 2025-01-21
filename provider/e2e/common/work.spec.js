// @ts-check
import { test, expect } from "@playwright/test";

test("작업 기능 테스트", async ({ page }) => {
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
  // 작업 상세 페이지에서 작업물 추가 버튼 클릭
  await page.locator('button:has-text("작업물 추가")').click();
  await page.waitForNavigation();

  // 빈 작업물 생성 확인
  await expect(
    page.locator('h3:has-text("작업물 제목을 입력해주세요")').last()
  ).toBeVisible();
  // 작업물 상세 페이지 이동
  await page
    .locator('h3:has-text("작업물 제목을 입력해주세요")')
    .last()
    .click();
  await page.waitForNavigation();
  await page.waitForTimeout(1000);

  // 작업물 상세 페이지에 접속했는지 확인
  await expect(page.locator('h1:has-text("작업물 추가")')).toBeVisible();
  // 작업물 제목 입력
  const timestamp = Date.now();
  await page
    .locator('input[id="title"]')
    .fill(`e2e 테스트 작업물 - ${timestamp}`);
  // 작업물 내용 입력
  await page
    .locator(".toastui-editor-ww-container > .toastui-editor > .ProseMirror")
    .first()
    .fill("e2e 테스트 작업물 내용");
  await page.locator('button:has-text("저장하기")').click();
  await page.waitForNavigation();

  await page.locator('button:has-text("돌아가기")').click();
  await page.waitForNavigation();
  await expect(
    page.locator(`h3:has-text("e2e 테스트 작업물 - ${timestamp}")`)
  ).toBeVisible();
});
