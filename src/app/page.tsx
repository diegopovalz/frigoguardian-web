'use client';

import { useState } from 'react';
import { useMqttData } from './hooks/useMqtt';

export default function Home() {
  const { data, isLoading, isError } = useMqttData();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const takePhoto = async () => {
    try {
      const response = await fetch('/api/take-photo');
      if (response.ok) {
        const data = await response.json();
        const photoResponse = await fetch('/api/inventory', {
          method: 'GET',
        });
        if (photoResponse.ok) {
          const photoData = await photoResponse.json();
          setImageSrc(`data:image/jpeg;base64,${photoData.data}`);
        } else {
          console.error('Failed to fetch photo');
        }
      } else {
        console.error('Failed to take photo');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='bg-white h-screen w-screen'>
      <div className='flex flex-col items-center'>
        <div className='h-36'>
          <h1 className='text-black text-4xl'>frigo guardian</h1>
        </div>
        <div className='h-[100%] flex flex-col justify-center items-center text-center'>
          <p className='text-black block'>Temperature:</p>
          {isLoading ? (
            <p className='text-black block'>Loading...</p>
          ) : (
            <p className='text-black block'>{data}</p>
          )}
        </div>
        <div>
          <button onClick={takePhoto} className='text-black'>
            Check inventory
          </button>
          {imageSrc && <img src={imageSrc} alt='Inventory' />}
        </div>
      </div>
    </div>
  );
}
