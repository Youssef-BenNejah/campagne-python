/**
 * Supabase Auth always identifies an account by email. To let two people
 * sign in with just a name + password (no inbox, no verification step),
 * we deterministically turn the name into a synthetic email behind the
 * scenes — the account is still a normal Supabase Auth user, just one
 * nobody ever needs to receive mail at.
 */
export function nameToEmail(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug || "joueur"}@campagne.local`;
}
