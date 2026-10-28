import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import VerifyForm from "@/components/VerifyForm";
import { findCertificate } from "@/lib/catalogue";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Verify a certificate" };

type Props = { searchParams: Promise<{ cert?: string }> };

export default async function VerifyPage({ searchParams }: Props) {
  const { cert } = await searchParams;
  const record = cert ? findCertificate(cert) : undefined;

  return (
    <section className="section">
      <div className="container text-col stack-5">
        <span className="eyebrow">Public lookup</span>
        <h1 className="h1">Verify a certificate</h1>
        <p className="lede">
          Enter the number printed on the Bonafide card, or scan its QR code. Every certificate we
          issue is listed here.
        </p>
        <VerifyForm defaultValue={cert} />
        {cert && record && (
          <div className="verify-result verify-result--ok" role="status">
            <CheckCircle2 size={22} strokeWidth={1.5} />
            <div className="stack-2">
              <b>Genuine Bonafide certificate</b>
              <span className="ref" style={{ color: "var(--ink)" }}>{record.cert}</span>
              <span>{record.title}, inspected {formatDate(record.inspected)}.</span>
              <Link className="text-link" href={record.href}>See the full report</Link>
            </div>
          </div>
        )}
        {cert && !record && (
          <div className="verify-result verify-result--no" role="status">
            <XCircle size={22} strokeWidth={1.5} />
            <div className="stack-2">
              <b>We have no certificate with that number</b>
              <span className="small">
                Check the characters (BF, two digits, then six digits). If it still doesn&rsquo;t
                match, the card may not be ours: contact us before you buy.
              </span>
            </div>
          </div>
        )}
        <p className="small muted">Try BF-26-004187 to see an example.</p>
      </div>
    </section>
  );
}
