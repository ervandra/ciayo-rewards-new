/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const HowToPlay = () => {
  const fullDescription = (
    <>
      <ol>
        <li>
          Setiap hari, akan ada 1 (satu) set pertanyaan trivia dari kami.
          (Tenang, bukan soal UN, kok.)
        </li>
        <li>
          Temukan jawaban trivia dari komik-komik yang sedang tayang di CIAYO
          Comics.
        </li>
        <li>Tiap jawaban benar akan menghasilkan poin yang disebut Scroll.</li>
        <li>Kumpulkan Scroll sebanyak-banyaknya.</li>
        <li>Tukar Scroll dengan hadiah yang bisa bikin hidup makin hore.</li>
      </ol>
      <p style={{ marginLeft: '0.5rem' }}>
        Lho, kok masih disini? Buruan masuk dan main! Jangan sampai kehabisan
        hadiah yang harusnya jadi punya kamu.
      </p>
    </>
  );

  return (
    <div className="info">
      <h3>Cara Main</h3>
      <div style={{ marginLeft: '-0.5rem' }}>{fullDescription}</div>
    </div>
  );
};

export default HowToPlay;
