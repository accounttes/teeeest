import React from 'react';
import './css/Card.min.css';

export const Card = ({ item }) => {
  return (
    <div className="card">
      <div className="card__wrapper">
        <img className="card__schema__1" src={item.photos[0]} alt="schema" />
        <img
          className={'card__schema__2'}
          src="/images/schemes/schema-2.png"
          alt="schema-2"
          style={{ display: 'none' }}
        />
        <h2 className="card__h2">{item.name}</h2>
        <h3 className="card__subTitle">{item.housingComplexName}</h3>
        <div className="card__text">{`${item.sameLayoutFlatCount} квартир · от ${item.minPrice} млн ₽`}</div>
        <button className="card__btn" onClick={() => alert('ВЫБРАНО)')} style={{ display: 'none' }}>
          выбери свою
        </button>
      </div>
    </div>
  );
};
