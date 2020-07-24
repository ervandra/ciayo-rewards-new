/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './UserContext';

const Wrapper = styled.div`
  text-align: left;
`;

const SEO = () => {
  const context = useContext(UserContext);
  const head = context.config
    ? context.config.response.seo.h1
    : 'CIAYO Comics REWARDS';
  const title = context.config
    ? context.config.response.seo.h2
    : 'Ikuti aktivitas, kuis, dan game berhadiah merchandise dari CIAYO Comics setiap harinya!';
  const desc = context.config
    ? context.config.response.seo.p
    : 'Ingin mengikuti game berhadiah merchandise? Jangan lewatkan CIAYO Comics REWARDS setiap harinya! Di sini, kamu dapat menjawab kuis, menyelesaikan berbagai quest, dan juga melaksanakan berbagai aktivitas lainnya untuk mendapatkan poin. Akumulasi poin ini dapat kamu tukarkan dengan berbagai merchandise menarik dari CIAYO Comics, lho! Makanya, jangan sampai ketinggalan serunya game berhadiah satu ini. Pantengin terus halaman CIAYO Comics REWARDS setiap hari!';

  return (
    <Wrapper>
      <div id="seo-text" className="ciayo-container">
        <h1>{head}</h1>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </Wrapper>
  );
};

export default SEO;
