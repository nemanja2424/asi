import ServiceIcon, { ArrowIcon } from "./ServiceIcon";
import styles from "./ServiceArtwork.module.css";

const labels = {
  "web-development": ["Digital experiences", "Designed for the next step"],
  "social-media-management": ["A consistent presence", "Every touchpoint, connected"],
  "content-creation": ["Ideas into motion", "One story. Many possibilities."],
  "ai-automation": ["Connected workflows", "Less friction. More focus."],
};

export default function ServiceArtwork({ slug }) {
  const [label, caption] = labels[slug];
  return (
    <div className={styles.artwork} aria-hidden="true">
      <div className={styles.topline}><span>ASI / {label}</span><span className={styles.status} /></div>
      <div className={styles.stage}>
        <div className={styles.orbit} />
        {slug === "web-development" && <div className={styles.browser}>
          <div className={styles.browserBar}><span /><span /><span /><i>yourbrand.com</i></div>
          <div className={styles.webBody}>
            <div className={styles.webNav}><b>YOUR BRAND</b><span>Explore <ArrowIcon /></span></div>
            <div className={styles.webHero}><div><small>A NEW PERSPECTIVE</small><strong>Made to<br /><em>stand out.</em></strong><span className={styles.miniButton}>Discover more <ArrowIcon /></span></div><div className={styles.sculpture}><i /><i /><i /></div></div>
            <div className={styles.webTiles}><span /><span /><span /></div>
          </div>
          <div className={styles.cursor}><ArrowIcon diagonal /><span>Built around you</span></div>
        </div>}
        {slug === "social-media-management" && <div className={styles.socialScene}>
          <div className={styles.profile}><div className={styles.avatar}>a.</div><div><strong>Your brand</strong><span>A story worth following.</span></div><ServiceIcon slug={slug} /></div>
          <div className={styles.postGrid}>{["Perspective", "In the details", "Your story", "Connection", "A new chapter", "Everyday"].map((text, index) => <div key={text} className={styles.post} data-pattern={index}><span>{String(index + 1).padStart(2, "0")}</span><strong>{text}</strong></div>)}</div>
          <div className={styles.schedule}><span className={styles.status} /><span>A clear plan. A consistent voice.</span><ArrowIcon /></div>
        </div>}
        {slug === "content-creation" && <div className={styles.contentScene}>
          <div className={styles.storyBehind}><span>CREATIVE DIRECTION</span><strong>Find your<br />perspective.</strong><div className={styles.storyCircle} /></div>
          <div className={styles.storyFront}><span>STORY / 01</span><div className={styles.play}><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="m9 5 11 7-11 7Z" /></svg></div><strong>Make<br /><em>them feel.</em></strong><div className={styles.storyProgress}><i /><i /><i /></div></div>
          <div className={styles.editBar}><span>Concept</span><i /><span>Create</span><i /><span>Connect</span></div>
        </div>}
        {slug === "ai-automation" && <div className={styles.flowScene}>
          <div className={styles.flowNode}><span className={styles.nodeIcon}><ServiceIcon slug="web-development" /></span><div><small>01 / INPUT</small><strong>A new inquiry</strong></div><span className={styles.nodeDot} /></div>
          <div className={styles.flowConnector}><span /></div>
          <div className={`${styles.flowNode} ${styles.flowCore}`}><span className={styles.nodeIcon}><ServiceIcon slug={slug} /></span><div><small>02 / CONNECT</small><strong>The right workflow</strong></div><span className={styles.spark}>✦</span></div>
          <div className={styles.flowConnector}><span /></div>
          <div className={styles.flowBranches}><div><span>03 / REVIEW</span><strong>Your team</strong><small>People in control</small></div><div><span>04 / ACTION</span><strong>Next step</strong><small>Everything in place</small></div></div>
        </div>}
      </div>
      <div className={styles.bottomline}><span>{caption}</span><ServiceIcon slug={slug} /></div>
    </div>
  );
}
