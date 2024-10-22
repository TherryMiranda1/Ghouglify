import { useState } from 'react';

interface UseShareImageResult {
    shareImage: () => Promise<void>;
    isSharingSupported: boolean;
    error?: string;
}

export const useShareImage = (imageUrl: string): UseShareImageResult => {
    const [error, setError] = useState<string | undefined>(undefined);

    const isSharingSupported = !!navigator.share;

    const shareImage = async () => {
        if (!isSharingSupported) {
            setError('La API de compartir no está soportada en este navegador.');
            return;
        }

        try {
            await navigator.share({
                title: 'Ya probaste la IA de ghouglify?',
                text: 'Mira esta imagen generada con IA en Ghouglify',
                url: imageUrl, 
            });
        } catch (err) {
            setError('Error al compartir la imagen: ' + (err as Error).message);
        }
    };

    return { shareImage, isSharingSupported, error };
};
