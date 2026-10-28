import { Search } from "lucide-react";

// A plain GET form so it works before any JavaScript loads.
export default function VerifyForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/verify" method="get" className="verify-form" role="search">
      <label htmlFor="cert" className="sr-only">
        Certificate number
      </label>
      <input
        id="cert"
        name="cert"
        className="input input--mono"
        placeholder="BF-26-004187"
        defaultValue={defaultValue}
        autoComplete="off"
        autoCapitalize="characters"
        required
      />
      <button className="btn btn--primary" type="submit">
        <Search size={18} strokeWidth={1.5} /> Verify
      </button>
    </form>
  );
}
