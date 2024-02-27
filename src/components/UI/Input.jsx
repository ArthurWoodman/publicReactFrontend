import classes from "./Input.module.css";
export default function Input({label, id, ...props})
{
    return <p className={classes.control}>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} {...props} required />
    </p>;
}