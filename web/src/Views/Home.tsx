import { ImageDownloader } from "../components";
import { Card, Header, Section, Image } from "../components/ui";
import { Sandbox } from "../components/widgets/Sandbox/Sandbox";
import { useGlobalContext } from "../context/useGlobalContext";

export const Home = () => {
  const {
    image: { transformedImage },
    user: { currentUser },
  } = useGlobalContext();

  return (
    <Section>
      {currentUser && (
        <Header componentType="h3" text={`Hola ${currentUser.name}`} />
      )}

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
