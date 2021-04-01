import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './icon.module.scss';

const SVG = ({
  style = {},
  fill,
  width,
  height,
  viewBox,
  SVGClassName = '',
}) => (
  <svg
    style={style}
    width={width}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={classnames(styles.Icon, `${styles.Icon}${SVGClassName}`)}
    fill="none"
  >
    <path
      d="M1 1L5.043 8.41667L1 15.8333"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

SVG.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fill: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  viewBox: PropTypes.string.isRequired,
  SVGClassName: PropTypes.string,
};

export default SVG;
