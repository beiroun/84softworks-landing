// Copyright (c) 2026 Andrei Baranov (84softworks). All rights reserved. Published for reference only - see LICENSE.
/**
 * One product tile: a click-through screenshot that opens the case gallery, with the
 * product's heading and blurb beneath. The image is flat (no frame), matching the founder
 * photo — the screenshots already carry their own window chrome. The /products cards add a
 * status badge above the heading and the product's public links below the blurb.
 */
import type { NavLink } from '../../i18n/dict';
import type { ProductCase } from './productCases';

interface ProductTileProps {
  case_: ProductCase;
  title: string;
  body: string;
  onOpen: () => void;
  status?: string;
  links?: NavLink[];
}

const ProductTile = ({ case_, title, body, onOpen, status, links = [] }: ProductTileProps) => (
  <div className="tile">
    <button type="button" className="tile__shot" onClick={onOpen} aria-label={`${title} – open screenshots`}>
      <img src={case_.hero} alt={title} />
      <span className="tile__badge" aria-hidden="true">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
        {case_.shots.length}
      </span>
    </button>
    {status && <div className="tile__status">{status}</div>}
    <h3>{title}</h3>
    <p>{body}</p>
    {links.length > 0 && (
      <div className="product-links product-links--tile">
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    )}
  </div>
);

export default ProductTile;
