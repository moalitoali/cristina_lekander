import { css } from "@emotion/css";
import emailIcon from "../../images/icons/email.svg";
import instagramIcon from "../../images/icons/instagram.svg";

type Props = {
  title: string;
  email: string;
  instagram: { username: string; url: string };
};

export function ContactCard({ title, email, instagram }: Props) {
  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.infoContainer}>
        <div className={style.item}>
          <a href={`mailto:${email}`} className={style.link}>
            <img src={emailIcon} alt="email" className={style.icon} />
            {email}
          </a>
        </div>
        <div className={style.item}>
          <a
            href={instagram.url}
            className={style.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagramIcon} alt="instagram" className={style.icon} />
            {instagram.username}
          </a>
        </div>
      </div>
    </div>
  );
}

const style = {
  wrapper: css({
    margin: "3rem auto",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(12px)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "2.5rem",
    padding: "3rem 2rem",
    width: "100%",
    maxWidth: "40rem",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    "@media (min-width: 768px)": {
      padding: "4rem 3rem",
      maxWidth: "50rem",
    },
  }),
  title: css({
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2.5rem",
    fontWeight: 300,
    letterSpacing: "0.05em",
    color: "#ffffff",
    margin: 0,
    "@media (min-width: 768px)": {
      fontSize: "3.5rem",
    },
  }),
  infoContainer: css({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    "@media (min-width: 768px)": {
      flexDirection: "row",
      gap: "4rem",
    },
  }),
  item: css({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  }),
  icon: css({
    width: "2rem",
    height: "2rem",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
    transition: "transform 0.3s ease",
    "@media (min-width: 768px)": {
      width: "3rem",
      height: "3rem",
    },
  }),
  link: css({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.85)",
    textDecoration: "none",
    borderBottom: "1px solid transparent",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    "&:hover": {
      color: "#ffffff",
      transform: "scale(1.05)",
    },
    "@media (min-width: 768px)": {
      fontSize: "1.2rem",
    },
  }),
};
