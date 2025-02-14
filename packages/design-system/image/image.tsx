import { useMemo } from "react";
import { Platform } from "react-native";

import { Image, ImageProps as ExpoImageProps } from "expo-image";

import { styled } from "@showtime-xyz/universal.tailwind";

import { ResizeMode } from "./types";

export type ImgProps = ExpoImageProps & {
  height?: number;
  width?: number;
  borderRadius?: number;
};

const StyledExpoImage = styled(Image);

type ImageProps = Omit<ImgProps, "resizeMode"> & {
  tw?: string;
  alt?: string;
  blurhash?: string;
  resizeMode?: ResizeMode;
};

function StyledImage({
  borderRadius,
  source,
  height,
  width,
  style,
  contentFit,
  resizeMode,
  blurhash,
  ...rest
}: ImageProps) {
  const imageSource = useMemo(
    () =>
      typeof source === "object"
        ? {
            ...source,
            headers: {
              Accept: "image/webp,*/*;q=0.8",
            },
          }
        : source,
    [source]
  );

  return (
    <StyledExpoImage
      style={[{ height, width, borderRadius }, style as any]}
      contentFit={contentFit ?? resizeMode}
      placeholder={{ blurhash, width, height }}
      source={imageSource}
      cachePolicy={Platform.OS === "ios" ? "memory-disk" : "disk"}
      {...rest}
    />
  );
}

export { StyledImage as Image };
