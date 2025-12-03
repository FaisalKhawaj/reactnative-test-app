import { Image } from "expo-image";
import React from "react";

type Props = {
  uri: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
};

export const LazyImage: React.FC<Props> = ({
  uri,
  width = "100%",
  height = 300,
  borderRadius = 10,
  style,
}) => {
  return (
    <Image
      source={{ uri }}
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#f0f0f0",
        },
        style,
      ]}
      contentFit="cover"
      transition={300} // fade-in
      placeholder={BlurHashPlaceholder} // optional
      cachePolicy="disk"
    />
  );
};

// A neutral blurred placeholder
export const BlurHashPlaceholder = "L5I#?^t7xuRP~qRjayof_Nt7xut7"; // You can replace with any blurhash
