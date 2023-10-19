import { ComponentProps, ReactNode } from 'react';
import s from "@/components/ui/Card/Card.module.scss";

type CardProps = {
  icon?: ReactNode;
  title?: string;
  className?: string;
} & ComponentProps<'div'>;

export const Card = (props: CardProps) => {
  const { children, className, icon, title, ...rest } = props;

  return (
    <div className={`${s.card} ${className ?? ''}`} {...rest}>
      {icon && <div className={s.icon}>{icon}</div>}
      {children}
    </div>
  );
};
