// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * Products gallery (/products): every product on one page — the flagship case and the own
 * products — as cards with a status, a blurb, public links and the same fullscreen screenshot
 * gallery as the home page. The home page keeps only the flagship and the product in the works
 * and links here. Static navy header without the hero morph: the wordmark leads back home.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LangContext';
import type { NavLink } from '../../i18n/dict';
import LanguageToggle from '../Home/LanguageToggle';
import ContactMenu from '../Home/ContactMenu';
import ProductTile from '../Home/ProductTile';
import CaseGallery from '../Home/CaseGallery';
import SiteFooter from '../Home/SiteFooter';
import { productCatalog, type CatalogProduct, type ProductCase } from '../Home/productCases';

const Products = () => {
  const { t } = useLang();
  const copy = t.products;
  // The product case the gallery is showing, or null while closed.
  const [openCase, setOpenCase] = useState<ProductCase | null>(null);

  useEffect(() => {
    document.title = copy.docTitle;
  }, [copy]);

  const publicLinks = (product: CatalogProduct): NavLink[] => [
    ...(product.sourceUrl ? [{ href: product.sourceUrl, label: copy.sourceLink }] : []),
    ...(product.licenseUrl ? [{ href: product.licenseUrl, label: copy.licenseLink }] : [])
  ];

  return (
    <>
      <header className="navbar">
        <div className="wrap">
          <Link className="brand-link" to="/">
            84softworks
          </Link>
          <div className="nav-actions">
            <LanguageToggle />
            <ContactMenu variant="pill" />
          </div>
        </div>
      </header>

      <main className="products-page">
        <section className="intro">
          <div className="wrap">
            <h1 className="page-title">{copy.title}</h1>
            <p className="lede">{copy.lede}</p>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="tiles tiles--catalog">
              {productCatalog.map((product) => {
                const card = copy.cards[product.id];
                return (
                  <ProductTile
                    key={product.id}
                    case_={product.case_}
                    title={card.title}
                    body={card.body}
                    status={card.status}
                    links={publicLinks(product)}
                    onOpen={() => setOpenCase(product.case_)}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>

      <CaseGallery case_={openCase} onClose={() => setOpenCase(null)} />
    </>
  );
};

export default Products;
