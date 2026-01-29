/**
 * @file custom-card.component.tsx
 * @fileoverview This file contains the custom card component
 */

import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

import "./custom-card.component.css";

/**
 * @interface CustomCardProps
 * @description Props for CustomCard
 */
export interface CustomCardProps {
  title: string; // required title
  description: string; // required description
  image?: string; // optional image URL
  buttonText?: string; // optional button text
  onButtonClick?: () => void; // optional button handler
}

/**
 * A reusable React component to display a custom card with a title, description, and optional image & button.
 * @param {CustomCardProps} props - Component props
 * @returns {JSX.Element} The rendered component
 * @description This component displays a custom card with a title, description, and optional image & button.
 * The `image` prop is optional and can be used to display an image on the card.
 * The `buttonText` prop is optional and can be used to display a button on the card.
 * The `onButtonClick` prop is optional and can be used to handle the button click event.
 */
const CustomCard = ({ title, description, image, buttonText, onButtonClick }: CustomCardProps) => {
  return (
    <Card variant="outlined" className="custom-card">
      {image && <CardMedia component="img" image={image} alt={title} className="custom-card-media" />}
      <CardContent className="custom-card-content">
        <Typography variant="h5" className="custom-card-title">
          {title}
        </Typography>
        <Typography variant="body2" className="custom-card-description">
          {description}
        </Typography>
        {buttonText && (
          <Button variant="contained" color="primary" className="custom-card-button" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
