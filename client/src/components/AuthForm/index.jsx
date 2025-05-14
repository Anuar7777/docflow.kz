import styles from "./AuthForm.module.css";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";

export default function AuthForm({
  title,
  fields,
  onSubmit,
  submitText,
  footers,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{title}</h2>
      {fields.map((field, index) => {
        if (field.type === "group") {
          return (
            <div key={index} className={styles.row}>
              {field.fields.map((f) => (
                <Input key={f.name} {...f} variant="inputRow" />
              ))}
            </div>
          );
        }

        return <Input key={field.name} {...field} variant="medium" />;
      })}
      <Button text={submitText} />
      <div className={styles.footer}>
        {footers.map((footer) => (
          <Link
            key={footer.href}
            href={footer.href}
            className={styles.footerLink}>
            {footer.text}
          </Link>
        ))}
      </div>
    </form>
  );
}
