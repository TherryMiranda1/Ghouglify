import { useState } from "react";
import { ImageDownloader, InputDrop } from "../components";
import { Button, Card, Header, Input, Section, Image } from "../components/ui";
import { useCloudinary } from "../context/useCloudinary";
import { User } from "../types/User";
import { useOnboardingUser } from "../hooks/useOnboardingUser";

export const Home = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { image, prompt } = useCloudinary();
  useOnboardingUser({ currentUser, onSuccess: (user) => setCurrentUser(user) });
  
  return (
    <Section>
      {currentUser && <Header text={`Hola ${currentUser.name}`} />}
      <Card>
        <Header text="Sube una imagen" componentType="h3" />
        <InputDrop
          onChange={(value) => {
            console.log(value);
            image.load(value);
          }}
        />
      </Card>
      <Input
        placeholder="Como quieres transformar esta imagen?"
        value={prompt.currentPrompt}
        onChange={(text) => prompt.setCurrentPrompt(text as string)}
      />
      {image.imageData && (
        <Button
          onClick={() =>
            image.transform(image.imageData.public_id, prompt.currentPrompt)
          }
        >
          Transformar
        </Button>
      )}
      {}
      {image.transformedImage && (
        <Card>
          <Image src={image.transformedImage} />
          <ImageDownloader imageUrl={image.transformedImage} />
        </Card>
      )}
    </Section>
  );
};
