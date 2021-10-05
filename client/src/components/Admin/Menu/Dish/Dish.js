import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DEL_DISH } from '../../../../redux/actionTypes/actionType';
import styles from './Dish.module.scss';

const { REACT_APP_URL } = process.env;

function Dish({ dish }) {
  let { data } = dish['File.data'];
  let base64 = new Buffer(data).toString('base64');
  let type = dish['File.type'];

  const dispatch = useDispatch();

  const deleteDish = () => {
    dispatch({ type: DEL_DISH, payload: dish.id });
    // console.log('delete')
    fetch(`${REACT_APP_URL}api/menu/${dish.id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(console.log);
  };

  return (
    <div className={styles.card}>
      <div>
        <div className='uk-card uk-card-default'>
          <div className='uk-card-media-top'>
            <img src={`data:${type};base64,${base64}`} width='250' height='200' alt='IMG' />
          </div>
          <div className={styles.title}>
            <p>{dish.name}</p>
          </div>
          <div className={styles.buttonsGroup}>
            <Link to={`/menu/position/${dish.id}`}>
              <button className={styles.buttonMain}>Редактировать</button>
            </Link>
            <button onClick={deleteDish} className={styles.buttonMain}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dish;
