import { ImageDownloader } from "../components";
import { Card, Section, Image } from "../components/ui";
import { Sandbox } from "../components/widgets/Sandbox/Sandbox";
import { useGlobalContext } from "../context/useGlobalContext";

export const Create = () => {
  const {
    image: { transformedImage },
  } = useGlobalContext();

  return (
    <Section>
      <Sandbox />
      {transformedImage && (
        <Card>
          <Image src={transformedImage} />
          <ImageDownloader imageUrl={transformedImage} />
        </Card>
      )}
    </Section>
  );
};
