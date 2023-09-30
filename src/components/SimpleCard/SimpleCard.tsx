import { ReactElement } from "react";
import classnames from "classnames";
import { Card, styled } from "@mui/material";

import styles from "./SimpleCard.module.css";

const CardRoot = styled(Card)({
  height: "100%",
  width: "100%",
  padding: "20px 24px",
});

const CardTitle = styled("div")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  marginBottom: "8px",
}));

interface SimpleCardProps {
  children: ReactElement;
  title?: string;
  titleColor?: string;
  backgroundColor?: string;
}

export const SimpleCard = ({
  children,
  title,
  titleColor,
  backgroundColor,
  ...props
}: SimpleCardProps) => {
  console.log(backgroundColor);

  return (
    <CardRoot
      elevation={2}
      {...props}
      style={{ padding: "20px 0", background: backgroundColor }}
    >
      {title && (
        <CardTitle>
          <span style={{ padding: "0 24px", color: titleColor }}>{title}</span>
        </CardTitle>
      )}
      <div
        className={classnames(styles.content, {
          [styles.contentWithTitle]: !!title,
        })}
      >
        {children}
      </div>
    </CardRoot>
  );
};
