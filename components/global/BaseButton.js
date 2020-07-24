/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';
import React, { Component } from 'react';

export const StyledBaseButton = styled.button`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 1.5rem 0;
  font-family: inherit;
  padding: 0.375rem 0.75rem;
  -webkit-appearance: none;
  border: 1px solid #0000;
  border-radius: 4px;
  -webkit-transition: background-color 0.1s ease, color 0.1s ease;
  transition: background-color 0.1s ease, color 0.1s ease;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  cursor: pointer;
  background-color: #df6e22;
  color: #fff;
  outline: none !important

  &:hover {
    background-color: rgb(180, 112, 34);
  }
`;

const BaseWrapper = styled.div`
  text-align: center;
`;

class BaseButton extends Component {
  render() {
    return (
      <BaseWrapper>
        <StyledBaseButton onClick={this.props.onClick}>
          {this.props.text}
        </StyledBaseButton>
      </BaseWrapper>
    );
  }
}

export default BaseButton;
