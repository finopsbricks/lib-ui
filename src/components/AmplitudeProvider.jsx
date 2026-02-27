'use client';
import { useEffect, useRef, createContext, useContext } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

const AmplitudeContext = createContext(null);

export function useAmplitude() {
  return useContext(AmplitudeContext);
}

export default function AmplitudeProvider({ children }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && typeof window !== 'undefined') {
      amplitude.add(sessionReplayPlugin({ sampleRate: 1 }));

      amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '892f41249e655670c9110a6938fe5e4f', {
        autocapture: true,
        serverZone: 'EU'
      });

      initialized.current = true;
    }
  }, []);

  const setUser = (user_id, user_properties) => {
    if (user_id) {
      amplitude.setUserId(user_id);
    }
    if (user_properties) {
      const identify_event = new amplitude.Identify();
      Object.keys(user_properties).forEach(key => {
        identify_event.set(key, user_properties[key]);
      });
      amplitude.identify(identify_event);
    }
  };

  return (
    <AmplitudeContext.Provider value={{ setUser, amplitude }}>
      {children}
    </AmplitudeContext.Provider>
  );
}
