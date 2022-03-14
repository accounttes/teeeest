import React from 'react';
import { Card } from './components/Card/Card';
import { styled } from '@mui/material/styles';

import Slider from '@mui/material/Slider';

import './css/styles.min.css';
import './components/Card/css/Card.min.css';

const NewSlider = styled(Slider)(({ theme }) => ({
  color: 'grey',
  height: 1,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 17,
    width: 17,
    backgroundColor: '#fff',
    border: '0px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 0,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 1,
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

function App() {
  let apiUrl = 'http://localhost:3001/sortedCards-0';
  const [cards, setCards] = React.useState([]);

  const axios = require('axios').default;

  React.useEffect(() => {
    axios
      .get(apiUrl)
      .then(function (resp) {
        setCards(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [value1, setValue1] = React.useState([0, 100]);
  const newItems1 = cards.filter((item) => {
    return item.minPrice >= value1[0] && item.minPrice <= value1[1];
  });

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState([0, 100]);
  const newItems2 = cards.filter((item) => {
    return (
      Number(item.name.slice(8, -3)) >= value2[0] && Number(item.name.slice(8, -3)) <= value2[1]
    );
  });

  const newItems3 = newItems1.filter((item) => {
    return newItems2.includes(item);
  });

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  function setSort(param) {
    axios
      .get(`http://localhost:3001/sortedCards-${param}`)
      .then(function (resp) {
        setCards(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleCheckbox(e, param) {
    if (e.target.checked) {
      setSort(param);
    } else {
      setSort(0);
      document.querySelectorAll('input[type=checkbox]').forEach((el) => (el.checked = false));
    }
  }

  return (
    <section className="main">
      <div className="main__cards">
        <div className="main__head">
          <h1 className="main__h1">Найдено 236 планировок</h1>
          <div className="main__param">
            <input type="radio" id="radioButton" />
            <span className="main__filter">Фильтр</span>
            <button className="main__reset" onClick={(e) => handleCheckbox(e, 0)}>
              Сбросить все
            </button>
          </div>
        </div>
        <div className="main__btnGroup">
          <button className="main__btn main__button-1" onClick={() => setSort(10)}>
            До 50 м²
          </button>
          <button className="main__btn main__button-2">Готовое жилье</button>
          <button className="main__btn main__button-3">Два санузла</button>
          <button className="main__btn main__button-4">Балкон</button>
          <button className="main__btn main__button-5">Дом сдан</button>
        </div>

        <div className="main__filterBtn">
          <div className="main__filterGroup">
            <button className="main__filterText">Сначала дешевле</button>
            <img src="images/doubleArrow.png" alt="doubleArrow" />
          </div>

          <div className="main__viewGroup">
            <button className="main__viewBtn main__viewBtn-1">
              <img src="/images/list.png" alt="list" />
            </button>
            <button className="main__viewBtn main__viewBtn-2">
              <img src="/images/bar.png" alt="bar" />
            </button>
          </div>
        </div>

        <div className="main__items">
          {newItems3 && newItems3.map((item, index) => <Card key={index} item={item}></Card>)}
        </div>
      </div>

      <div className="main__filters">
        <div className="main__filter__wrapper">
          <div className="main__numberRooms">
            <h3 className="main__numberRooms__h3">Количество комнат</h3>
            <button className="main__numberRooms__btn" onClick={() => setSort(10)}>
              С
            </button>
            <button className="main__numberRooms__btn">1</button>
            <button className="main__numberRooms__btn">1+</button>
            <button className="main__numberRooms__btn">2</button>
            <button className="main__numberRooms__btn">2+</button>
            <button className="main__numberRooms__btn">3</button>
            <button className="main__numberRooms__btn">3+</button>
            <button className="main__numberRooms__btn">4...</button>
          </div>

          <div className="main__features">
            <h3 className="main__features__h3">Особенности планировки</h3>

            <ul className="main__features__list">
              <li className="main__features__item">
                <input
                  className="main__features__input"
                  type="checkbox"
                  name="a"
                  value="1417"
                  onClick={(e) => handleCheckbox(e, 1)}
                />
                2 и более санузла
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Большая лоджия
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Гардеробная
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Кухня-гостиная
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Лоджия
              </li>
              <li className="main__features__item">
                <input type="checkbox" name="a" value="1417" />
                Постирочная
              </li>
            </ul>
            <button className="main__features__btn">
              Показать все <img src="/images/arrowDown.png" alt="arrowDown"></img>
            </button>
          </div>

          <div className="main__project">
            <div className="main__project__header">
              <h3 className="main__project__h3">Проект</h3>
              <button className="main__project__btn">Выбрать на карте</button>
            </div>

            <div className="main__project__btns">
              <button
                className="main__project__btn main__project__btn-1"
                onClick={() => setSort(2)}>
                <img src="images/logos/znak.png" alt="logo-znak" /> ZNAK
              </button>
              <button className="main__project__btn main__project__btn-2">
                <img src="images/logos/lomonosova.png" alt="lomonosova-znak" />
                На Ломоносова
              </button>
              <button className="main__project__btn main__project__btn-3">
                <img src="images/logos/vasilki.png" alt="logo-vasilki" />
                Васильки
              </button>
              <button className=" main__project__btn main__project__btn-4">
                <img src="images/logos/kalinina.png" alt="logo-kalinina" />
                На Калинина
              </button>
            </div>
          </div>
          <div className="main__house">
            <h3 className="main__house__h3">Дом</h3>
            <button className="main__house__btn">Выбрать на генплане</button>
          </div>

          <div className="main__price">
            <h3 className="main__price" readOnly>
              Стоимость, ₽
            </h3>
            <div className="main__price__inputNumbers">
              <input
                className="main__price__from main__price__input"
                value={'от ' + value1[0]}
                defaultValue={[0, 0]}
                readOnly
              />
              <input
                className="main__price__before main__price__input"
                value={'до ' + value1[1]}
                readOnly
              />
            </div>
            <NewSlider
              getAriaLabel={() => 'Minimum distance'}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
            />
          </div>

          <div className="main__area">
            <h3 className="main__area">Площадь, м²</h3>
            <div className="main__area__inputNumbers">
              <input
                className="main__area__from main__area__input"
                value={'от ' + value2[0]}
                readOnly
                placeholder="от"
              />
              <input
                className="main__area__before main__area__input"
                value={'до ' + value2[1]}
                readOnly
              />
            </div>
            <NewSlider
              getAriaLabel={() => 'Minimum distance'}
              value={value2}
              onChange={handleChange2}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
            />
          </div>

          <div className="main__deadline">
            <div className="main__deadline__header">
              <h3 className="main__deadline__h3">Срок сдачи</h3>
            </div>

            <div className="main__deadline__btns">
              <button
                className="main__deadline__btn main__deadline__btn-1"
                onClick={() => setSort(3)}>
                Дом сдан
              </button>
              <button className="main__deadline__btn main__deadline__btn-2">1 кв. 2021</button>
              <button className="main__deadline__btn main__deadline__btn-3">3 кв. 2021</button>
              <button className=" main__deadline__btn main__deadline__btn-4">1 кв. 2022</button>
              <button className=" main__deadline__btn main__deadline__btn-5">2 кв. 2022</button>
              <button className=" main__deadline__btn main__deadline__btn-6">1 кв. 2023</button>
            </div>
          </div>

          <div className="main__viewWindow">
            <h3 className="main__viewWindow__h3">Вид из окна</h3>

            <ul className="main__viewWindow__list">
              <li className="main__viewWindow__item">
                <input
                  className="main__viewWindow__input"
                  type="checkbox"
                  name="a"
                  value="1417"
                  onClick={(e) => handleCheckbox(e, 4)}
                />
                Двор
              </li>
              <li className="main__viewWindow__item">
                <input className="main__viewWindow__input" type="checkbox" name="a" value="1417" />
                Панорама города
              </li>
              <li className="main__viewWindow__item">
                <input className="main__viewWindow__input" type="checkbox" name="a" value="1417" />
                Закат
              </li>
              <li className="main__viewWindow__item">
                <input className="main__viewWindow__input" type="checkbox" name="a" value="1417" />
                Парк, площадь
              </li>
              <li className="main__viewWindow__item">
                <input className="main__viewWindow__input" type="checkbox" name="a" value="1417" />
                Рассвет
              </li>
            </ul>
          </div>

          <div className="main__height">
            <div className="main__height__header">
              <h3 className="main__height__h3">Высота потолков, м</h3>
            </div>

            <div className="main__height__btns">
              <button className="main__height__btn main__height__btn-1" onClick={() => setSort(5)}>
                2,5 стандарт
              </button>
              <button className="main__height__btn main__height__btn-2">2,7 комфорт </button>
              <button className="main__height__btn main__height__btn-3">3,0 хайфлет </button>
              <button className=" main__height__btn main__height__btn-4">3,3 хайфлет </button>
            </div>
          </div>

          <div className="main__features">
            <h3 className="main__features__h3">Преимущества квартиры</h3>

            <ul className="main__features__list">
              <li className="main__features__item">
                <input
                  className="main__features__input"
                  type="checkbox"
                  name="a"
                  value="1417"
                  onClick={(e) => handleCheckbox(e, 6)}
                />
                Мало соседей на этаже
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Арочные окна
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Ванная с окном
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Гостиная с двумя окнами
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                До 3-х квартир на этаже
              </li>
              <li className="main__features__item">
                <input type="checkbox" name="a" value="1417" />
                Кухня с окном в рабочей зоне
              </li>
            </ul>
            <button className="main__features__btn">
              Показать все <img src="/images/arrowDown.png" alt="arrowDown"></img>
            </button>
          </div>

          <div className="main__features">
            <h3 className="main__features__h3">Преимущества дома</h3>

            <ul className="main__features__list">
              <li className="main__features__item">
                <input
                  className="main__features__input"
                  type="checkbox"
                  name="a"
                  value="1417"
                  onClick={(e) => handleCheckbox(e, 7)}
                />
                Велосипедная
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Колясочная
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Кладовые
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Двор без машин
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Закрытая территория
              </li>
              <li className="main__features__item">
                <input type="checkbox" name="a" value="1417" />
                Подземный паркинг
              </li>
            </ul>
            <button className="main__features__btn">
              Показать все <img src="/images/arrowDown.png" alt="arrowDown"></img>
            </button>
          </div>
          <div className="main__features">
            <h3 className="main__features__h3">Инфраструктура</h3>

            <ul className="main__features__list">
              <li className="main__features__item">
                <input
                  className="main__features__input"
                  type="checkbox"
                  name="a"
                  value="1417"
                  onClick={(e) => handleCheckbox(e, 8)}
                />
                Школа
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Детский сад
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Двор-парк
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Магазины
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Велодорожки
              </li>
              <li className="main__features__item">
                <input type="checkbox" name="a" value="1417" />
                Спортивные зоны
              </li>
            </ul>
            <button className="main__features__btn">
              Показать все <img src="/images/arrowDown.png" alt="arrowDown"></img>
            </button>
          </div>
          <div className="main__features">
            <h3 className="main__features__h3">Формат дома</h3>

            <ul className="main__features__list">
              <li className="main__features__item">
                <input
                  className="main__features__input"
                  type="checkbox"
                  name="a"
                  value="1417"
                  onClick={(e) => handleCheckbox(e, 9)}
                />
                Малоэтажный
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Среднеэтажный
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Клубный дом
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Таунхаус
              </li>
              <li className="main__features__item">
                <input className="main__features__input" type="checkbox" name="a" value="1417" />
                Квадрохаус
              </li>
              <li className="main__features__item">
                <input type="checkbox" name="a" value="1417" />
                Лайнхаус
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
