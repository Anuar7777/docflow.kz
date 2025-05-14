import styles from "./Input.module.css";

export default function Input({
  placeholder,
  type,
  name,
  value,
  onChange,
  required = false,
  variant,
}) {
  return (
    <input
      className={`${styles.input} ${styles[variant]}`}
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
}
