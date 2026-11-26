import {
  Award,
  Clock,
  Gem,
  Globe,
  Handshake,
  Heart,
  Lightbulb,
  MessageCircleQuestion,
  MousePointerClick,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  ThumbsUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Icon names editors can pick in the Studio (kept in sync with the schema). */
const ICONS: Record<string, LucideIcon> = {
  ThumbsUp,
  MousePointerClick,
  Award,
  MessageCircleQuestion,
  Rocket,
  ShieldCheck,
  Lightbulb,
  Users,
  Target,
  Heart,
  Handshake,
  Sparkles,
  Gem,
  Zap,
  Globe,
  Clock,
  Palette,
};

/** Used in order when no icon is picked, so values never look identical. */
const DEFAULTS: LucideIcon[] = [
  Lightbulb,
  Handshake,
  Award,
  Rocket,
  ShieldCheck,
  Target,
];

export function ValueIcon({
  name,
  index = 0,
  className,
}: {
  name: string | null | undefined;
  /** Position of the value, used to pick a default icon. */
  index?: number;
  className?: string;
}) {
  const Icon = (name && ICONS[name]) || DEFAULTS[index % DEFAULTS.length];
  return <Icon aria-hidden className={className} strokeWidth={1.25} />;
}
