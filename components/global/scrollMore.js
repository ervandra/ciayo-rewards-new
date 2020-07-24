import React, { Component } from 'react';
import PropTypes from 'prop-types';
import verge from 'verge';

class scrollMore extends Component {
  loadComponent = React.createRef();

  componentDidMount() {
    window.addEventListener('scroll', this.handleLoadMore);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleLoadMore);
  }

  handleLoadMore = () => {
    const { getMoreRedeems } = this.props;
    if (verge.inViewport(this.loadComponent.current)) {
      getMoreRedeems();
    }
  };

  render() {
    return <div ref={this.loadComponent} />;
  }
}

scrollMore.propTypes = {
  getMoreRedeems: PropTypes.func.isRequired,
};

export default scrollMore;
