import React from 'react';
import { calcTime, convertMoney } from '../../utils';

const MovieInfoBar = ({ time, budget, revenue, directors = [], screenplay = [] }) => {

  return (

    <>

      {
        directors.length > 0 && <p style={{ marginTop: '3rem' }}>{directors.length > 1 ? 'Directors: ' : 'Director: '}<strong>{directors.map(director => director.name).join(', ')}</strong></p>
      }

      {
        screenplay.length > 0 && <p style={{ marginBottom: '3rem' }}>Screenplay: <strong>{screenplay.map(writer => writer.name).join(', ')}</strong></p>
      }


      <ul className="promotes">
        <li className="promote box-shawdow">
          <i className="fas fa-3x fa-clock color--yellow align--center"></i>
          <h3 className="promote__title align--center">Runtime</h3>
          <p className="promote__text align--center">{calcTime(time)}</p>
        </li>
        <li className="promote box-shawdow">
          <i className="fas fa-3x fa-money-bill-alt color--yellow align--center"></i>
          <h3 className="promote__title align--center">Budget</h3>
          <p className="promote__text align--center">{convertMoney(budget)}</p>
        </li>
        <li className="promote box-shawdow">
          <i className="fas fa-3x fa-ticket-alt color--yellow align--center"></i>
          <h3 className="promote__title align--center">Revenue</h3>
          <p className="promote__text align--center">{convertMoney(revenue)}</p>
        </li>
        <li className="promote box-shawdow">
          <i className="fas fa-3x fa-language color--yellow align--center"></i>
          <h3 className="promote__title align--center">Language</h3>
          <p className="promote__text align--center">English</p>
        </li>
      </ul>
    </>

  )
}

export default MovieInfoBar;