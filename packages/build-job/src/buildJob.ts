import { Job, Size } from "@qawolf/types";
import { mousemoveData } from "rrweb/typings/types";
import { buildSteps } from "./buildSteps";
import { QAEventWithTime } from "./events";

export const findUrl = (events: QAEventWithTime[]): string => {
  for (let e of events) {
    if (e.data && e.data.href) return e.data.href;
  }

  throw new Error("No url found");
};

export const findSize = (events: any[]): Size =>
  events.filter(e => e.type === "size")[0].size;

export const orderEventsByTime = (
  events: QAEventWithTime[]
): QAEventWithTime[] => {
  const orderedEvents = [];

  for (let originalEvent of events) {
    let event = JSON.parse(JSON.stringify(originalEvent));

    // replace negative timeOffsets so we can correctly order events by timestamp
    const positions =
      (event.data && (event.data as mousemoveData).positions) || [];
    if (positions.length) {
      const firstOffset = positions[0].timeOffset;
      event.timestamp += firstOffset;
      for (const position of positions) {
        position.timeOffset -= firstOffset;
      }
    }

    orderedEvents.push(event);
  }

  orderedEvents.sort((a, b) => a.timestamp - b.timestamp);

  return orderedEvents;
};

export const buildJob = (
  originalEvents: QAEventWithTime[],
  name: string
): Job => {
  const url = findUrl(originalEvents);
  const size = findSize(originalEvents);

  const events = orderEventsByTime(originalEvents);
  const steps = buildSteps(events);

  const job = { name, size, steps, url };

  return job;
};