import { ComponentProps } from "react";
import styled from "styled-components";
import { Image } from "../../image/Image";
import { Header } from "../../headers/Header";
import { Button } from "../../button/Button";

type Props = ComponentProps<"section"> & {
  title?: string;
  description?: string;
  buttonText?: string;
  image?: string;
  buttonOnClick?: () => void;
};

export const EmptyState = ({
  title,
  description,
  buttonText,
  image,
  buttonOnClick,
  ...props
}: Props) => {
  return (
    <EmptyStateStyled {...props}>
      {image && <Image src={image} />}
      {title && <Header componentType="h2" text={title} />}
      {description && <p>{description}</p>}
      {buttonText && (
        <Button text={buttonText} onClick={() => buttonOnClick?.()} />
      )}
    </EmptyStateStyled>
  );
};

const EmptyStateStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  max-width: 720px;

  p {
    text-align: center;
  }
  button {
    background-color: var(--tint-color);
  }
  img {
    max-height: 300px;
    width: auto;
    border: none;
  }
`;
