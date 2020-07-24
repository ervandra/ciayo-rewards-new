/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { UserContext } from '../global/UserContext';
import { getHistoryTransaction } from '../../lib/api';

const Loading = dynamic(() => import('../global/Loader'), {
  loading: () => null,
});

const HistoryLanding = dynamic(() => import('../HistoryLanding'), {
  loading: () => null,
});

const HistoryContainer = ({ status, handleCloseModal }) => {
  const context = useContext(UserContext);
  const [state, setState] = useState({ transaction: [], loading: true });

  useEffect(() => {
    const getHistories = async () => {
      const {
        data: { response = [] },
      } = await getHistoryTransaction();
      setState({ loading: false, transaction: response });
    };
    getHistories();
  }, []);

  const balance = context.user ? context.user.balance : 0;
  const { transaction, loading } = state;

  return (
    <>
      {loading ? (
        <Loading />
      ) : status ? (
        <HistoryLanding
          histories={transaction}
          balance={balance}
          expired={context.config.response.season.expired}
          seasonBreak={context.config.response.season.break}
          handleCloseModal={handleCloseModal}
        />
      ) : (
        <div>There is no data to show</div>
      )}
    </>
  );
};

HistoryContainer.propTypes = {
  status: PropTypes.object,
  handleCloseModal: PropTypes.func,
};

export default HistoryContainer;
