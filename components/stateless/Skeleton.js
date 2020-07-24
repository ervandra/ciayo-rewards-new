import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SkeletonWrapper = styled.div`
  position: relative;
  transition: ${props => props.theme.transitionActive};
  overflow: hidden;
  .skeleton-item {
    min-width: 100%;
    background: url(/static/assets/images/blank.jpg);
    background-image: linear-gradient(
      -45deg,
      rgba(0, 0, 0, 0.12),
      rgba(0, 0, 0, 0.19) 90%
    );
    display: block;
    animation: blink 2s infinite linear;
  }
`;

class Skeleton extends Component {
  render() {
    const { width, height, full } = this.props;
    const ch = (height / width) * 100;
    const cw = 100;
    return (
      <SkeletonWrapper>
        <div
          className="skeleton-item"
          style={{
            width: full ? `${cw}vw` : `${width}px`,
            height: full ? `${ch}vw` : `${height}px`,
          }}
        />
      </SkeletonWrapper>
    );
  }
}

Skeleton.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  full: PropTypes.bool,
};

export default Skeleton;
