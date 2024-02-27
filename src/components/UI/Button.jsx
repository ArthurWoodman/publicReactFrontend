import classes from '../MainNavigation.module.css';
export default function Button({children, textOnly, className, ...props}) {
    let cssClasses = textOnly ? 'text-button' : 'button';

    if (className) {
        cssClasses += ' ' + className;
    }

    return (
        <button className={classes[cssClasses]} {...props}>
            {children}
        </button>
    );
}