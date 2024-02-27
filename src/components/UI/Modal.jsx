import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";

import classes from "./Modal.module.css"

export default function Modal({children, onClose, open, className='' }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open]);

    return createPortal(
        <dialog ref={dialog} className={`${classes[className]} ${classes["modal"]}`} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}