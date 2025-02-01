import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./button";

describe("Button 컴포넌트 테스트", () => {
  it("버튼이 올바른 텍스트를 가지고 렌더링되어야 한다.", () => {
    // 렌더링된 Button 컴포넌트가 지정된 텍스트("Test Button")를 포함하는지 확인
    render(<Button>Test Button</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Test Button");
  });

  it("클릭 시 onClick 핸들러가 호출되어야 한다.", () => {
    // onClick prop으로 전달된 함수가 버튼 클릭 시 정확히 한 번 호출되는지 확인
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("primary variant를 사용하여 버튼이 렌더링되어야 한다.", () => {
    // variant prop이 "primary"일 때 버튼이 "primary" CSS 클래스를 포함하는지 확인
    render(<Button variant="primary">Test Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("primary");
  });

  it("secondary variant를 사용하여 버튼이 렌더링되어야 한다.", () => {
    // variant prop이 "secondary"일 때 버튼이 "secondary" CSS 클래스를 포함하는지 확인
    render(<Button variant="secondary">Test Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("secondary");
  });

  it("ghost variant를 사용하여 버튼이 렌더링되어야 한다.", () => {
    // variant prop이 "ghost"일 때 버튼이 "ghost" CSS 클래스를 포함하는지 확인
    render(<Button variant="ghost">Test Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("ghost");
  });

  it("small size를 사용하여 버튼이 렌더링되어야 한다.", () => {
    // size prop이 "small"일 때 버튼이 "small" CSS 클래스를 포함하는지 확인
    render(<Button size="small">Test Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("small");
  });

  it("medium size를 사용하여 버튼이 렌더링되어야 한다.", () => {
    // size prop이 "medium"일 때 버튼이 "medium" CSS 클래스를 포함하는지 확인
    render(<Button size="medium">Test Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("medium");
  });

  it("large size를 사용하여 버튼이 렌더링되어야 한다.", () => {
    // size prop이 "large"일 때 버튼이 "large" CSS 클래스를 포함하는지 확인
    render(<Button size="large">Test Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("large");
  });

  it("아이콘을 사용하여 버튼이 렌더링되어야 한다.", () => {
    // icon prop이 전달될 때, 버튼 내부에 img 태그가 존재하는지 확인
    render(<Button icon="/icon_test.png">Test Button</Button>);
    expect(screen.getByRole("button").querySelector("img")).toBeInTheDocument();
  });

  it("disabled prop이 true일 때 버튼이 비활성화되어야 한다.", () => {
    // disabled prop이 true일 때 버튼이 비활성화되어 클릭할 수 없는 상태인지 확인
    render(<Button disabled>Test Button</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("type prop이 submit 일 때 버튼이 submit 타입으로 렌더링 되어야 한다.", () => {
    // type prop이 "submit"일 때 버튼의 type 속성이 "submit"으로 설정되는지 확인
    render(<Button type="submit">Test Button</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
