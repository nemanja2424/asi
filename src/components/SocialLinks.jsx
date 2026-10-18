import { socialProfiles } from "@/lib/socials";
import { ArrowIcon } from "./ServiceIcon";
import styles from "./SiteFooter.module.css";

function SocialIcon({ id }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {id === "instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></> : <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7.5 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>}
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <ul className={styles.socials} aria-label="Social profiles">
      {socialProfiles.map((profile) => <li key={profile.id}>
        {profile.url ? <a className={styles.socialLink} href={profile.url} target="_blank" rel="noopener noreferrer">
          <SocialIcon id={profile.id} /><span>{profile.name}</span><ArrowIcon diagonal />
        </a> : <span className={styles.socialPlaceholder}>
          <SocialIcon id={profile.id} /><span>{profile.name}</span><small>Coming soon</small>
        </span>}
      </li>)}
    </ul>
  );
}
