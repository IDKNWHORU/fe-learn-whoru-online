// components/common/Input.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./input";

describe("Input 컴포넌트 테스트", () => {
  it("renders Input with label", () => {
    render(<Input label="Test Label" id="test-input" />); // id prop 추가
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("renders Input with placeholder", () => {
    render(<Input placeholder="Test Placeholder" />);
    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });

  it("renders Input with hint text", () => {
    render(<Input hint="Test hint" />);
    expect(screen.getByText("Test hint")).toBeInTheDocument();
  });

  it("renders Input with error message", () => {
    render(<Input error="Test error" />);
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test input" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders textarea Input", () => {
    render(<Input type="textarea" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders select Input", () => {
    render(
      <Input type="select">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Input>
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders checkbox Input", () => {
    render(<Input type="checkbox" placeholder="checkbox test" id="checkbox" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByLabelText("checkbox test")).toBeInTheDocument();
  });

  it("renders radio Input", () => {
    render(<Input type="radio" placeholder="radio test" id="radio" />);
    expect(screen.getByRole("radio")).toBeInTheDocument();
    expect(screen.getByLabelText("radio test")).toBeInTheDocument();
  });
});
