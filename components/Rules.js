/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UserContext } from './global/UserContext';
import { Link } from '../routes';
import { media } from './global/base';
import { convertTimestamp } from '../lib/utils';

const RulesStyle = styled.div`
  .body-rules {
    margin-top: 1rem;
  }
  h4 {
    margin-bottom: 0;
  }
  h3 {
    font-weight: bold;
  }
  .snk-title {
    font-weight: bold;
  }

  .centered {
    text-align: center;
    margin-top: 1rem;
    .stretch {
      border-radius: 8px;
      width: 100%;
      margin-bottom: 0;
      ${media.desktop`
        width: 40%;
      `};
    }
  }
`;

const Rules = ({ seasonBreak, isStarted }) => {
  const context = useContext(UserContext);
  const { config = null } = context;
  const [originalUrl, setURL] = useState('https://rewards.ciayo.com');
  useEffect(() => {
    setURL(window.location.href);
  }, []);
  const isTriviaAvailable = context.user
    ? context.user.is_trivia_available
    : false;

  const fullDescription = (
    <>
      <h4>
        <span className="snk-title">
          Apa CIAYO Comics REWARDS selalu ada setiap waktu?
        </span>
      </h4>
      <p>
        CIAYO Comics REWARDS hanya diadakan per periode. Periode terdekat dibuka
        pada tanggal{' '}
        {config ? convertTimestamp(config.response.season.begin, 2) : null} WIB,
        dan ditutup pada tanggal{' '}
        {config ? convertTimestamp(config.response.season.expired, 2) : null}{' '}
        WIB.
      </p>

      <h4>
        <span className="snk-title">
          Bagaimana cara mendapat hadiah khusus untuk pengguna PLUS+?
        </span>
      </h4>
      <p>
        Pengguna harus terdaftar sebagai pelanggan CIAYO Comics Plus+ untuk
        dapat menukar/menebus hadiah bertanda Plus+. Pengguna juga wajib
        terdaftar sebagai pelanggan Plus+ saat periode verifikasi (20-23
        Desember 2019), jika tidak atau pengguna terdaftar sebagai pelanggan
        trial Plus+ maka hadiah dianggap hangus.
      </p>

      <h4>
        <span className="snk-title">
          Bagaimana cara saya mengambil hadiah? Apa harus diambil di tempat?
        </span>
      </h4>
      <p>
        Tenang. Hadiah akan dikirim ke alamat pemenang selama yang bersangkutan
        berdomisili di Indonesia. Sebaliknya, CIAYO Comics tidak akan
        mengirimkan item yang ditebus ke luar area Indonesia dan tidak akan
        mengganti Scroll yang telah digunakan untuk menebus item tersebut.
      </p>

      <h4>
        <span className="snk-title">
          Kapan saya bisa ketemu sama hadiah saya?
        </span>
      </h4>
      <p>
        Semua hadiah yang sudah ditebus oleh semua pemenang akan dikirimkan
        serentak pada tanggal akhir periode. Maka, sabar adalah koentji.
      </p>

      <h4>
        <span className="snk-title">
          Boleh ambil hadiah sebanyak-banyaknya?
        </span>
      </h4>
      <p style={{ marginBottom: '0.5rem' }}>
        Dalam 1 (satu) periode Rewards, pengguna dengan nomer handphone dan
        alamat terdaftar yang sama hanya dapat menukarkan/menebus dengan
        kombinasi sbb:
      </p>
      <ul>
        <li>2 (dua) hadiah kategori harian dan tiga harian, atau</li>
        <li>1 (satu) hadiah mingguan, atau</li>
        <li>1 (satu) grand prize.</li>
      </ul>

      <h4>
        <span className="snk-title">
          Kalau saya tetap nekat tebus banyak hadiah?
        </span>
      </h4>
      <p>
        Jika pengguna dengan no HP dan alamat yang sama menebus hadiah lebih
        dari ketentuan di atas, maka hadiah yang dianggap valid adalah kombinasi
        pertama yang ditebus.
      </p>

      <h4>
        <span className="snk-title">
          Ada syarat dan ketentuan versi lengkap?
        </span>
      </h4>
      <p>
        Ada, silakan dibaca!
        <br />
        <br />
        Dengan mengakses CIAYO Comics REWARDS, Anda (“pengguna” atau “user”)
        memiliki kesempatan untuk menggunakan “mata uang” virtual bernama
        “Scroll”. Scroll dapat ditukarkan dengan berbagai barang (“item”) yang
        tercantum di CIAYO Comics REWARDS, seperti merchandise, aksesori, atau
        voucher. Scroll hanya berlaku dalam satu periode CIAYO Comics REWARDS,
        dan akan kadaluarsa setelah periode selesai. Mata uang ini tidak
        memiliki nilai dalam “dunia nyata” dan hanya dapat ditukarkan dengan
        item yang ada di CIAYO Comics REWARDS. Beberapa item memiliki masa
        tanggal kadaluarsa, sementara yang lain tidak. Item yang diperoleh
        menggunakan Scroll akan ditambahkan ke akun Anda hingga tanggal
        kadaluarsa item tersebut, atau saat platform diberhentikan. CIAYO Comics
        tidak akan mengganti item yang hilang karena pelanggaran aturan,
        kebijakan, pemberitahuan, dan / atau perjanjian lainnya yang Anda
        lakukan. CIAYO Comics juga tidak bertanggung jawab dalam situasi di mana
        ada pihak-pihak yang mengatasnamakan CIAYO Comics semata-mata untuk
        mengambil keuntungan pribadi. Harga dan ketersediaan item dapat berubah
        sewaktu-waktu tanpa adanya pemberitahuan sebelumnya. Anda setuju bahwa
        Anda tidak dapat dan tidak memiliki hak untuk memperjualbelikan atau
        mentransfer item, mata uang virtual, atau konten atau informasi lain
        yang termasuk dalam CIAYO Comics REWARDS, secara keseluruhan atau
        sebagian, untuk sesuatu yang bernilai (termasuk “uang sungguhan”) atau
        sebaliknya. Anda setuju bahwa mata uang virtual apa pun yang Anda terima
        di CIAYO Comics REWARDS bukanlah mata uang “nyata” atau instrumen
        keuangan dunia nyata. Selanjutnya Scroll tidak dapat ditukarkan dengan
        sejumlah uang “nyata” dari CIAYO Comics.
      </p>

      <h4>
        <span className="snk-title">
          Oke, pertanyaan terakhir. Scroll itu maksudnya apa sih?
        </span>
      </h4>
      <p>
        Scroll artinya gulir jempol ketika kita semua baca komik di CIAYO
        Comics. Kan bentuk komik di CIAYO Comics panjang-panjang dan butuh
        disekrol. Jadi banyak baca = banyak scroll = banyak hadiah. Ashiap.
      </p>

      <h4>
        <span className="snk-title">
          Dengan mengikuti event ini berarti kamu menyetujui semua syarat &
          ketentuan yang berlaku.
        </span>
      </h4>

      {seasonBreak ? (
        <>
          <div className="centered">
            <a className="button stretch" disabled>
              Kembali Besok untuk Trivia Berikutnya
            </a>
          </div>
        </>
      ) : (
        <>
          {!context.user ? (
            <div className="centered">
              <a
                href={`https://account.ciayo.com/?back=${originalUrl}`}
                className="button stretch"
                title="Tombol Masuk"
              >
                Masuk dan Main Sekarang
              </a>
            </div>
          ) : (
            <Link route="quiz">
              <div className="centered">
                <a className="button stretch">
                  {!context.user
                    ? 'Masuk dan Main Sekarang'
                    : isTriviaAvailable
                      ? 'Jawab Trivia Hari Ini'
                      : isStarted
                        ? 'Segera Hadir'
                        : 'Lihat Hasil Trivia Hari Ini'}
                </a>
              </div>
            </Link>
          )}
        </>
      )}
    </>
  );

  return (
    <RulesStyle>
      <div className="info">
        <h3>Syarat & Ketentuan</h3>
        <div className="body-rules">{fullDescription}</div>
      </div>
    </RulesStyle>
  );
};

Rules.propTypes = {
  seasonBreak: PropTypes.bool.isRequired,
  isStarted: PropTypes.bool.isRequired,
};

export default Rules;
