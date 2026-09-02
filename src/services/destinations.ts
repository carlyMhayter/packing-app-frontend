import type { DestinationPublic } from "../types/destinations";

type Props = {
  destinations: DestinationPublic[];
};

export default function destinations({ destinations }: Props) {
  const thing = destinations;
  return thing;
}
