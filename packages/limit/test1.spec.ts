import { setTimeout } from "timers/promises";

import { pLimit } from "./util/p-limit";

describe("test3", () => {
  it("1", async () => {
    const retry = 3;
    const limit = pLimit(1);
    const interval = 1;

    let skip = false;
    const requests:any[]= [];
    for (let i = 1; i <= retry; i++) {
      requests.push(
        limit(async () => {
          // skip = await this.sendWebhook(
          //   data.action.event_id,
          //   request,
          //   i,
          //   retry,
          //   skip,
          // );
          await setTimeout(1000);
          console.info(i);
        }),
      );
      if (i !== retry) {
        requests.push(
          limit(async () => {
            console.info(i);
            if (skip) return;
            await setTimeout(interval * 1000);
          }),
        );
      }
    }
    await Promise.allSettled(requests);
  });
});
