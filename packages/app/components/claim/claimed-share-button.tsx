import { Platform, StyleProp, ViewStyle } from "react-native";

import { Button } from "@showtime-xyz/universal.button";
import { ButtonProps } from "@showtime-xyz/universal.button";
import { useRouter } from "@showtime-xyz/universal.router";

import { CreatorEditionResponse } from "app/hooks/use-creator-collection-detail";

type ClaimedShareButtonProps = {
  edition: CreatorEditionResponse;
  size?: ButtonProps["size"];
  tw?: string;
  style?: StyleProp<ViewStyle>;
};

export const ClaimedShareButton = ({
  edition,
  size = "small",
  tw = "",
  style,
}: ClaimedShareButtonProps) => {
  const router = useRouter();
  const onClaimPress = () => {
    const contractAddress = edition.creator_airdrop_edition.contract_address;
    const as = `/qr-code-share/${contractAddress}`;
    router.push(
      Platform.select({
        native: as,
        web: {
          pathname: router.pathname,
          query: {
            ...router.query,
            contractAddress,
            qrCodeShareModal: true,
          },
        } as any,
      }),
      Platform.select({
        native: as,
        web: router.asPath,
      }),
      { shallow: true }
    );
  };

  if (!edition.is_already_claimed) return null;
  return (
    <Button onPress={onClaimPress} size={size} style={style} tw={tw}>
      Share
    </Button>
  );
};
