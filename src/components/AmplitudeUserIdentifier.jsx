'use client';
import { useEffect } from 'react';
import { useAmplitude } from './AmplitudeProvider';

export default function AmplitudeUserIdentifier({ user }) {
  const amplitude_context = useAmplitude();

  useEffect(() => {
    if (amplitude_context && user) {
      const { setUser } = amplitude_context;

      const user_id = user.email;
      const user_properties = {
        email: user.email,
        name: user.name,
      };

      setUser(user_id, user_properties);
    }
  }, [amplitude_context, user]);

  return null;
}
