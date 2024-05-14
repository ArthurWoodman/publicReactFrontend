import classes from "./Input.module.css";
export default function Input({label, id, applyDefaultClasses = true, ...props})
{
    return <p className={applyDefaultClasses ? classes.control : ''}>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} {...props} required />
    </p>;
}