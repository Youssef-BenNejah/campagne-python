import { useId, useState, type FormEvent } from "react";
import { nameToEmail } from "../lib/nameAuth";
import { supabase, supabaseConfigured } from "../lib/supabaseClient";

type Mode = "login" | "register";
type Status = "idle" | "sending" | "error";

export function Login() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const nameId = useId();
  const passwordId = useId();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const email = nameToEmail(name);
    const { data, error } =
      mode === "register"
        ? await supabase.auth.signUp({
            email,
            password,
            options: { data: { display_name: name.trim() } },
          })
        : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setErrorMessage(translateAuthError(error.message));
      return;
    }
    if (mode === "register" && !data.session) {
      // Supabase still has "Confirm email" turned on — the account was
      // created but there is no inbox behind @campagne.local to confirm it
      // from, so the player would be stuck forever without this message.
      setStatus("error");
      setErrorMessage(
        'Compte créé, mais Supabase attend une confirmation par e-mail. ' +
          'Désactive "Confirm email" dans Authentication > Providers > Email ' +
          "sur le dashboard Supabase, puis connecte-toi normalement.",
      );
      return;
    }
    // On success the session updates via onAuthStateChange and the app
    // navigates away — nothing else to do here.
    setStatus("idle");
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
      <h1 className="font-display text-2xl font-semibold text-paper-100">
        {mode === "register" ? "Rejoindre la campagne" : "Retour au front"}
      </h1>
      <p className="mt-1 text-sm text-olive-400">
        {mode === "register"
          ? "Choisis un nom et un mot de passe — aucune adresse e-mail requise."
          : "Entre ton nom et ton mot de passe."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <label htmlFor={nameId} className="block text-sm font-medium text-paper-200">
            Nom
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="username"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full border border-olive-600 bg-bunker-900 px-3 py-2 text-paper-100 focus-visible:border-brass-500"
          />
        </div>
        <div>
          <label htmlFor={passwordId} className="block text-sm font-medium text-paper-200">
            Mot de passe
          </label>
          <input
            id={passwordId}
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full border border-olive-600 bg-bunker-900 px-3 py-2 text-paper-100 focus-visible:border-brass-500"
          />
          {mode === "register" && (
            <p className="mt-1 font-mono text-[11px] text-olive-400">6 caractères minimum.</p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-brass-500 px-4 py-2 font-display text-sm font-medium tracking-wide text-bunker-950 transition-colors hover:bg-brass-400 disabled:opacity-50"
        >
          {status === "sending"
            ? "Un instant…"
            : mode === "register"
              ? "Créer mon compte"
              : "Se connecter"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "register" ? "login" : "register");
          setStatus("idle");
          setErrorMessage("");
        }}
        className="mt-4 font-mono text-xs text-olive-400 underline-offset-2 hover:text-paper-200 hover:underline"
      >
        {mode === "register" ? "J'ai déjà un compte" : "Pas encore de compte ? En créer un"}
      </button>

      <div aria-live="polite" className="mt-3">
        {status === "error" && (
          <p role="alert" className="text-sm text-signal-danger-strong">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

function translateAuthError(message: string): string {
  if (/already registered/i.test(message)) {
    return "Ce nom est déjà pris. Choisis-en un autre ou connecte-toi.";
  }
  if (/invalid login credentials/i.test(message)) {
    return "Nom ou mot de passe incorrect.";
  }
  if (/password.*least/i.test(message)) {
    return "Le mot de passe doit faire au moins 6 caractères.";
  }
  if (/rate limit/i.test(message)) {
    return (
      "Supabase tente encore d'envoyer un e-mail de confirmation en arrière-plan. " +
      'Désactive "Confirm email" dans Authentication > Providers > Email sur le ' +
      "dashboard Supabase, puis réessaie."
    );
  }
  return message;
}
