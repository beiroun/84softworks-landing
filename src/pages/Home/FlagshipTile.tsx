/**
 * One flagship product tile: a click-through screenshot that opens the case gallery,
 * with the product's heading and blurb beneath. The image is flat (no frame), matching
 * the founder photo — the screenshots already carry their own window chrome.
 */
import type { FlagshipCase } from './flagshipCases';

interface FlagshipTileProps {
  case_: FlagshipCase;
  title: string;
  body: string;
  onOpen: () => void;
}

const FlagshipTile = ({ case_, title, body, onOpen }: FlagshipTileProps) => (
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
    <h3>{title}</h3>
    <p>{body}</p>
  </div>
);

export default FlagshipTile;
