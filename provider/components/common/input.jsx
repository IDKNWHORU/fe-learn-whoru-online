"use client";

import React from "react";
import style from "./input.module.css";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  hint,
  error,
  className = "",
  id, // id prop 추가
  ...props
}) => {
  // id prop이 없을 경우, 고유한 id 생성 (label-input 연결 목적)
  const inputId = id || `input-${Math.random().toString(36).substring(2, 15)}`;

  return (
    <div className={`${style.wrapper} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={style.label}>
          {label}
        </label>
      )}{" "}
      {/* htmlFor 속성 추가 */}
      {type === "textarea" ? (
        <textarea
          id={inputId} // id 속성 적용
          name={props.name}
          className={style.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      ) : type === "select" ? (
        <select
          id={inputId} // id 속성 적용
          name={props.name}
          className={style.input}
          value={value}
          onChange={onChange}
          {...props}
        >
          {props.children}
        </select>
      ) : type === "checkbox" || type === "radio" ? (
        <div className={style.inlineInput}>
          <input
            type={type}
            id={inputId} // id 속성 적용
            name={props.name}
            className={style.input}
            value={value}
            onChange={onChange}
            {...props}
          />
          {placeholder && (
            <label htmlFor={inputId} className={style.placeholder}>
              {placeholder}
            </label>
          )}
        </div>
      ) : (
        <input
          type={type}
          id={inputId} // id 속성 적용
          name={props.name}
          className={style.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
      {hint && <p className={style.hint}>{hint}</p>}
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default Input;
