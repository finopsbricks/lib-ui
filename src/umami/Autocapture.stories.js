/**
 * Autocapture Stories - what UmamiAnalytics sends for each click and submit
 */

import React, { useEffect, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { installAutocapture } from './autocapture.js';
import { Button } from '../primitives/button';
import { Input } from '../primitives/input';

function AutocaptureDemo() {
  const [sent, setSent] = useState([]);

  useEffect(() => {
    // A fake tracker: records what autocapture would send to Umami.
    window.umami = { track: (name, data) => setSent((previous) => [...previous, { name, data }]) };
    const removeAutocapture = installAutocapture();
    return () => {
      removeAutocapture();
      delete window.umami;
    };
  }, []);

  return (
    <div className="bg-background text-foreground flex flex-col gap-6 p-6 sm:flex-row">
      <div
        className="flex flex-col items-start gap-3"
        onClick={(event) => event.target.closest('a') && event.preventDefault()}
        onSubmit={(event) => event.preventDefault()}
      >
        <Button>Save changes</Button>
        <Button variant="outline" data-umami-label="org_switcher">Acme Industries Pvt Ltd</Button>
        <Button variant="ghost" aria-label="Close panel">×</Button>
        <a className="underline" href="/orgs/org_8f2k/objects/42/records">Records of object 42</a>
        <a className="underline" href="/orgs/org_8f2k/exports/7.csv">Download CSV</a>
        <Button data-umami-event="statement_upload_start">Upload (named event)</Button>
        <form name="new_record" className="flex gap-2">
          <Input name="vendor_name" aria-label="Vendor name" defaultValue="Acme Industries" />
          <Button type="submit">Create</Button>
        </form>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground mb-2 text-sm">Sent to Umami</p>
        <ol aria-label="Sent events" className="space-y-1 font-mono text-xs">
          {sent.map((event, index) => (
            <li key={index}>
              {event.name} {JSON.stringify(event.data)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const meta = {
  title: 'Umami/Autocapture',
  component: AutocaptureDemo,
  parameters: {
    layout: 'fullscreen',
    description:
      'UmamiAnalytics listens for clicks and submits on the document and sends what the user did, never what was on the screen. Click anything to see the event it sends.',
  },
};

export default meta;

const sentEvents = (canvas) =>
  within(canvas.getByRole('list', { name: 'Sent events' }))
    .queryAllByRole('listitem')
    .map((item) => item.textContent);

/**
 * USER JOURNEY STORY 1: A user clicks buttons; the label comes from data-umami-label, aria-label or text
 */
export const ButtonClicks = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Save changes' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Acme Industries Pvt Ltd' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Close panel' }));

    await waitFor(() => expect(sentEvents(canvas)).toEqual([
      'button_click {"label":"Save changes"}',
      'button_click {"label":"org_switcher"}',
      'button_click {"label":"Close panel"}',
    ]));
  },
};

/**
 * USER JOURNEY STORY 2: A user follows a link and downloads an export; ids are stripped from the path
 */
export const LinksAndDownloads = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('link', { name: 'Records of object 42' }));
    await userEvent.click(canvas.getByRole('link', { name: 'Download CSV' }));

    await waitFor(() => expect(sentEvents(canvas)).toEqual([
      'link_click {"href":"/orgs/[id]/objects/[id]/records"}',
      'file_download {"href":"/orgs/[id]/exports/7.csv"}',
    ]));
  },
};

/**
 * USER JOURNEY STORY 3: A user submits a form; only the form's name is sent, never what was typed
 */
export const FormSubmit = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Create' }));

    await waitFor(() => expect(sentEvents(canvas)).toEqual([
      'button_click {"label":"Create"}',
      'form_submit {"form":"new_record"}',
    ]));
    await expect(canvasElement.querySelector('ol').textContent).not.toContain('Acme Industries');
  },
};

/**
 * USER JOURNEY STORY 4: A button with Umami's own data-umami-event is left to the tracker
 */
export const NamedEventSkipped = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Upload (named event)' }));

    await expect(sentEvents(canvas)).toEqual([]);
  },
};
