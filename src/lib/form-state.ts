/** Shared contract between form actions and the AppForm client wrapper. */
export type FormState =
  | { status: "idle" }
  | {
      status: "error";
      /** Top-of-form summary message. */
      formError?: string;
      /** Field name → first error message, linked via aria-describedby. */
      fieldErrors: Record<string, string>;
    }
  | {
      status: "success";
      /** Confirmation restates what was sent and what happens next (docs/03 §3). */
      title: string;
      detail: string;
    };

export const idleState: FormState = { status: "idle" };
