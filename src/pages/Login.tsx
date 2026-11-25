import { useId, useState, type FormEvent } from "react";
import { supabase, supabaseConfigured } from "../lib/supabaseClient";

type Status = "idle" | "sending" | "sent" | "error";

export function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailId = useId();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("sent");
  }

  if (!supabaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-5 py-16">
        <div role="alert" className="border-2 border-signal-danger-strong bg-bunker-900 p-5">
          <h1 className="font-display text-lg font-semibold text-signal-danger-strong">
            Supabase n'est pas configuré
          </h1>
          <p className="mt-2 text-sm text-paper-300">
            Copie <code className="font-mono">.env.example</code> vers{" "}
            <code className="font-mono">.env.local</code>, renseigne l'URL et la clé publique de
            ton projet Supabase, puis relance le serveur de développement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="font-display text-2xl font-semibold text-paper-100">Rejoindre la campagne</h1>
      <p className="mt-1 text-sm text-olive-400">
        Reçois un lien de connexion par e-mail, pas de mot de passe à retenir.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <label htmlFor={emailId} className="block text-sm font-medium text-paper-200">
            Adresse e-mail
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full border border-olive-600 bg-bunker-900 px-3 py-2 text-paper-100 focus-visible:border-brass-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-brass-500 px-4 py-2 font-display text-sm font-medium tracking-wide text-bunker-950 transition-colors hover:bg-brass-400 disabled:opacity-50"
        >
          {status === "sending" ? "Envoi en cours…" : "Recevoir le lien"}
        </button>
      </form>

      <div aria-live="polite" className="mt-3">
        {status === "sent" && (
          <p role="status" className="text-sm text-signal-success-strong">
            Lien envoyé à {email}. Ouvre-le depuis cet appareil pour te connecter.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-sm text-signal-danger-strong">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
