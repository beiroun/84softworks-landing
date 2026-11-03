// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/** Site footer shared by the home page and the /products page: tagline, contacts, rights. */
import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LangContext';
import { EMAIL, contactLinkRows } from './contacts';

const SiteFooter = () => {
  const { t } = useLang();

  return (
    <footer>
      <div className="wrap">
        <div className="footer__cols">
          <div className="footer__col">
            <strong>84softworks</strong>
            <br />
            <span className="muted">{t.footerTagline}</span>
            <br />
            <Link to="/products">{t.allProducts}</Link>
          </div>
          <div className="footer__col">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            {contactLinkRows.map((row) => (
              <span key={row[0].label}>
                <br />
                {row.map((social, index) => (
                  <span key={social.label}>
                    {index > 0 && ' · '}
                    <a href={social.href} target="_blank" rel="noreferrer">
                      {social.label}
                    </a>
                  </span>
                ))}
              </span>
            ))}
          </div>
          <div className="footer__col muted">{t.footerRights}</div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
