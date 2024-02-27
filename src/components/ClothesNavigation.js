import classes from './ClothesNavigation.module.css';
import {NavLink, useRouteLoaderData} from "react-router-dom";

function ClothesNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
                to="/clothes"
                className={({isActive}) => isActive ? classes.active : undefined}
                end
            >
              All Clothes
            </NavLink>
          </li>
          { token && <li>
            <NavLink
                to="/clothes/new"
                className={({isActive}) => isActive ? classes.active : undefined}
            >
              New Item
            </NavLink>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default ClothesNavigation;
