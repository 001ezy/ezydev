import { PageFrame } from "@/components/site-chrome";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata('Privacy Policy', 'How EZY DEV handles project enquiry information and basic technical data on this GitHub Pages website.', "privacy");

export default function PrivacyPage(){return <PageFrame eyebrow="PRIVACY" title="Your information stays yours" intro="Last updated: November 2026"><article className="privacy-copy"><h2>Contact form</h2><p>This website does not send or store information entered in the project enquiry form. When you submit it, your device opens your email application and prepares a message addressed to mr.eshmambetov@gmail.com. You choose whether to send it.</p><h2>Hosting and analytics</h2><p>The site is hosted by GitHub Pages. GitHub may process basic technical information required to deliver and secure the site. This project does not intentionally use advertising cookies or analytics trackers.</p><h2>Questions</h2><p>For questions about privacy or a message you sent, contact <a href="mailto:mr.eshmambetov@gmail.com">mr.eshmambetov@gmail.com</a>.</p></article></PageFrame>}
