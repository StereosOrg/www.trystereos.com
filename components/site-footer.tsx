import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-[#2b2e3a] mb-4">Product</h4>
            <ul className="space-y-2 text-[#718096] text-sm">
              <li><Link href="https://www.trystereos.com/ai-enablement" target="_blank" className="hover:text-[#2b2e3a] transition-colors">ZDR Gateway</Link></li>
              <li><Link href="https://www.trystereos.com/otel-relay" target="_blank" className="hover:text-[#2b2e3a] transition-colors">Telemetry Relay</Link></li>
              <li><Link href="https://www.trystereos.com/key-provisioning" target="_blank" className="hover:text-[#2b2e3a] transition-colors">Virtual Key Management</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#2b2e3a] mb-4">Legal</h4>
            <ul className="space-y-2 text-[#718096] text-sm">
              <li><Link href="/privacy" className="hover:text-[#2b2e3a] transition-colors">Privacy</Link></li>
              <li><Link href="/trust" className="hover:text-[#2b2e3a] transition-colors">Trust Center</Link></li>
              <li><Link href="/terms" className="hover:text-[#2b2e3a] transition-colors">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#2b2e3a] mb-4">Resources</h4>
            <ul className="space-y-2 text-[#718096] text-sm">
              <li><Link href="/partners" className="hover:text-[#2b2e3a] transition-colors">Partner Program</Link></li>
              <li><Link href="/" className="hover:text-[#2b2e3a] transition-colors">Guides</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#2b2e3a] text-lg">Stereos</span>
          </div>
          <div className="flex items-center gap-6">
            <Image
              src="/zero-data-retention-badge.webp"
              alt="Zero Data Retention"
              width={64}
              height={72}
            />
            <p className="text-sm text-[#718096]">
              &copy; {new Date().getFullYear()} Stereos. ELv2 License.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
