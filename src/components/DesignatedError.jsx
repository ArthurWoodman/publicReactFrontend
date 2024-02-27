import classes from "./DesignatedError.module.css";

export default function DesignatedError({title, message}) {
    return (
        <div className={classes.error}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}
