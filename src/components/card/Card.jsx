import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import splitCC from 'split-camelcase';
import _ from 'lodash';

import styles from './Card.module.scss';

const Card = ({ title, address, type, price }) => {
  return (
    <Link to="/" className={styles.CardLink}>
      <div className={styles.Card}>
        <div className={styles.CardInner}>
          <img
            className={styles.CardImage}
            src={`https://via.placeholder.com/377x227.png`}
            alt=""
          />
          <div
            className={classnames(styles.CardLabel, {
              [styles.CardLabelPrimary]: type === 'IndependentLiving',
              [styles.CardLabelSecondary]: type === 'SupportAvailable',
            })}
          >
            {`${type === 'SupportAvailable' ? 'Restaurant &' : ''} ${splitCC(
              type
            ).join(' ')}`}
          </div>
        </div>
        <div className={styles.CardInfo}>
          <h2 className={classnames(styles.CardTitle)}>
            {title
              .split(' ')
              .map((str, index) => (index === 0 ? _.capitalize(str) : str))
              .join(' ')}
          </h2>
          <p className={classnames(styles.CardAddress)}>{address}</p>
          <p className={classnames(styles.CardPrice)}>
            <span>New Properties for Sale from</span>
            {'\u00A0'}
            <span>
              <strong>{`£${price.toLocaleString()}`}</strong>
            </span>
          </p>
          <p className={styles.CardNote}>Shared Ownership Available</p>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Card;
