import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { GET_DISHES } from '../../../../redux/actionTypes/actionType';
import Dish from '../Dish/Dish';
import styles from './SubcategoryItem.module.scss';

const { REACT_APP_URL } = process.env;

function SubcategoryItem() {
  const dispatch = useDispatch();
  const { subcategoryId } = useParams();

  useEffect(() => {
    fetch(`${REACT_APP_URL}api/menu/categories/${subcategoryId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((categories) => dispatch({ type: GET_DISHES, payload: categories }));
  }, [dispatch, subcategoryId]);

  const dishes = useSelector((state) => state.dishesReducer.dishes);
  console.log(dishes, 'DISHES');

  return (
    <div className={styles.main__block}>
      <Link to={`/menu/subcategory/${subcategoryId}/new`}>
        <button className={styles.buttonMain}>Добавить позицию</button>
      </Link>
      <div className={styles.dish__block}>
        {dishes.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}

export default SubcategoryItem;
