import { Link } from '../routes';

const Error = () => (
  <section id="content">
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell">
          <div className="section text-center not-found">
            <img
              src="/static/assets/images/aset_error-404.png"
              alt="Oops, not found"
              style={{ width: 230 }}
            />
            <h1>The Dreaded Error 404</h1>
            <hr />
            <p>
              Whelp, we couldn't find the page you're looking for. Why don't we
              go back and try again?
            </p>
            <Link to="/">
              <a className="button small secondary hollow">
                Back to CIAYO Comics Rewards
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default Error;
