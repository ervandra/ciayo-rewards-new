/* eslint-disable react/no-danger */
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// import Axios from 'axios';
import {
  getUserScript,
  getSessionFromServer,
  getConfigScript,
} from '../lib/auth';
import { getRewardsConfig } from '../lib/api';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const page = ctx.renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    const initialProps = await Document.getInitialProps(ctx);
    const user = await getSessionFromServer(ctx.req);
    const rewardsConfig = await getRewardsConfig();
    // const config = await Axios.get(
    //   'https://s3-ap-southeast-1.amazonaws.com/ciayo/services.json'
    // );
    return {
      ...page,
      initialProps,
      styleTags,
      user,
      rewardsConfig /* config: config.data */,
    };
  }

  render() {
    const { user, rewardsConfig /* config */ } = this.props;

    return (
      <html lang="en">
        <Head>
          {this.props.styleTags}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5CTWPZH');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <script
            id="ciayo-id"
            dangerouslySetInnerHTML={{ __html: getUserScript(user) }}
          />
          <script
            id="ciayo-config"
            dangerouslySetInnerHTML={{ __html: getConfigScript(rewardsConfig) }}
          />
          {/* <script
            dangerouslySetInnerHTML={{ __html: getConfigScript(config) }}
          /> */}
          <NextScript />
          <noscript>
            Apa kamu fans setia CIAYO Comics? Yuk, ikuti kuis berhadiah
            merchandise official yang diadakan setiap harinya dalam acara CIAYO
            Comics REWARDS! You need to enable JavaScript to run this app.
          </noscript>

          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5CTWPZH" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`,
            }}
          />
        </body>
      </html>
    );
  }
}
