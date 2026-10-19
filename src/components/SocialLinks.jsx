import { socialProfiles } from "@/lib/socials";
import { ArrowIcon } from "./ServiceIcon";
import styles from "./SiteFooter.module.css";

function SocialIcon({ id }) {
  const icons = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7.5 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
    calendly: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[id]}
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <ul className={styles.socials} aria-label="Social profiles and meeting booking">
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
