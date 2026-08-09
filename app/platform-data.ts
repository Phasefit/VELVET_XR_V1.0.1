export type Evidence = "E1" | "E2" | "E3";
export type XrClass = "C2" | "C3";

export type Platform = {
  id: string;
  rank: number;
  name: string;
  url: string;
  score: number;
  xrClass: XrClass;
  evidence: Evidence;
  status: string;
  category: "Content platform" | "Player / tool";
  technologies: string[];
  devices: string[];
  access: string;
  model: string;
  summary: string;
  limitation: string;
  sourceUrl: string;
  sourceLabel: string;
  accent: "violet" | "cyan" | "amber" | "rose" | "blue";
};

export const platforms: Platform[] = [
  {
    id: "sexlikereal",
    rank: 1,
    name: "SexLikeReal",
    url: "https://www.sexlikereal.com/",
    score: 96,
    xrClass: "C3",
    evidence: "E2",
    status: "AI passthrough / MR",
    category: "Content platform",
    technologies: ["Passthrough MR", "AI passthrough", "VR180"],
    devices: ["Meta Quest", "Vision Pro", "PICO", "Galaxy XR", "PCVR"],
    access: "Free app + headset browser",
    model: "Individual purchases + Premium",
    summary:
      "Broad XR catalog with clearly documented AI conversion and a dedicated passthrough workflow.",
    limitation:
      "Documented as passthrough MR, not as volumetric or spatially anchored AR.",
    sourceUrl: "https://www.sexlikereal.com/vr-porn-app",
    sourceLabel: "Official app and device documentation",
    accent: "violet",
  },
  {
    id: "arporn",
    rank: 2,
    name: "ARPorn",
    url: "https://arporn.com/",
    score: 93,
    xrClass: "C3",
    evidence: "E2",
    status: "Dedicated passthrough MR",
    category: "Content platform",
    technologies: ["Passthrough MR", "Stereo 3D"],
    devices: ["Meta Quest", "Vision Pro", "PCVR"],
    access: "Streaming + downloads",
    model: "Membership",
    summary:
      "Specialized passthrough catalog with practical setup guides for Quest headsets.",
    limitation:
      "The technical support documentation covers fewer devices than the homepage marketing suggests.",
    sourceUrl: "https://arporn.com/help/",
    sourceLabel: "Official setup and headset guide",
    accent: "cyan",
  },
  {
    id: "czechar",
    rank: 3,
    name: "Czech AR",
    url: "https://www.czechar.com/",
    score: 91,
    xrClass: "C3",
    evidence: "E2",
    status: "Dedicated passthrough MR",
    category: "Content platform",
    technologies: ["Passthrough MR", "VR180"],
    devices: ["Meta Quest", "PICO"],
    access: "HereSphere + DeoVR",
    model: "Czech VR Network membership",
    summary:
      "Passthrough-focused catalog with named headsets and compatible players.",
    limitation:
      "A compatible player and the correct passthrough format are required.",
    sourceUrl: "https://www.czechar.com/",
    sourceLabel: "Official format and player documentation",
    accent: "amber",
  },
  {
    id: "realvr",
    rank: 4,
    name: "RealVR / PassthroughVR",
    url: "https://realvr.com/",
    score: 89,
    xrClass: "C3",
    evidence: "E2",
    status: "Passthrough MR channel",
    category: "Content platform",
    technologies: ["Passthrough MR", "VR180"],
    devices: ["Meta Quest", "Vision Pro", "PCVR"],
    access: "Headset browser + downloads",
    model: "Membership + free section",
    summary:
      "VR network with a dedicated passthrough channel and explicit support information for Quest and Vision Pro.",
    limitation:
      "Passthrough support is documented at catalog level, not through a complete title-by-title matrix.",
    sourceUrl: "https://realvr.com/help/",
    sourceLabel: "Official help and compatibility",
    accent: "rose",
  },
  {
    id: "vrspy",
    rank: 5,
    name: "VRSpy",
    url: "https://www.vrspy.com/",
    score: 87,
    xrClass: "C3",
    evidence: "E2",
    status: "Documented passthrough MR",
    category: "Content platform",
    technologies: ["Passthrough MR", "VR180"],
    devices: ["Meta Quest", "PCVR"],
    access: "Streaming + downloads",
    model: "Free samples + membership",
    summary:
      "Active VR catalog with a dedicated passthrough collection and specific guidance for Quest 3.",
    limitation:
      "Passthrough is specifically documented for Quest 3; broader device support applies to general VR.",
    sourceUrl: "https://www.vrspy.com/",
    sourceLabel: "Official passthrough catalog",
    accent: "blue",
  },
  {
    id: "vrporn",
    rank: 6,
    name: "VRPorn.com",
    url: "https://vrporn.com/",
    score: 86,
    xrClass: "C3",
    evidence: "E2",
    status: "Passthrough + AI passthrough",
    category: "Content platform",
    technologies: ["Passthrough MR", "AI passthrough", "VR180"],
    devices: ["Meta Quest", "Vision Pro", "PCVR", "Mobile"],
    access: "Headset browser",
    model: "Free content + Premium",
    summary:
      "Aggregator with maintained categories for both conventional and AI-generated passthrough.",
    limitation:
      "The general headset list does not prove that every passthrough title works on every device.",
    sourceUrl: "https://vrporn.com/tag/passthrough-ai/",
    sourceLabel: "Official AI passthrough category",
    accent: "violet",
  },
  {
    id: "vrbangers",
    rank: 7,
    name: "VR Bangers",
    url: "https://vrbangers.com/",
    score: 85,
    xrClass: "C3",
    evidence: "E2",
    status: "Documented passthrough MR",
    category: "Content platform",
    technologies: ["Passthrough MR", "VR180"],
    devices: ["Meta Quest", "Vision Pro", "PICO", "PCVR"],
    access: "Streaming + downloads",
    model: "Subscription + free selection",
    summary:
      "VR studio with a dedicated passthrough category marketed as AR, plus broad headset guidance.",
    limitation:
      "The category documents passthrough content; support is not confirmed for every device and scene.",
    sourceUrl: "https://vrbangers.com/category/ar-porn/",
    sourceLabel: "Official passthrough category",
    accent: "cyan",
  },
  {
    id: "realitylovers",
    rank: 8,
    name: "RealityLovers",
    url: "https://realitylovers.com/",
    score: 82,
    xrClass: "C3",
    evidence: "E2",
    status: "Passthrough in selected titles",
    category: "Content platform",
    technologies: ["Passthrough MR", "VR180"],
    devices: ["Meta Quest", "PCVR"],
    access: "Streaming + downloads",
    model: "Monthly, quarterly or annual",
    summary:
      "VR180 catalog that also publishes passthrough versions of selected titles.",
    limitation:
      "No public passthrough matrix is available for every supported headset.",
    sourceUrl: "https://realitylovers.com/views/common/faq/",
    sourceLabel: "Official FAQ and headset support",
    accent: "amber",
  },
  {
    id: "deovr",
    rank: 9,
    name: "DeoVR",
    url: "https://deovr.com/app",
    score: 80,
    xrClass: "C3",
    evidence: "E2",
    status: "XR player with passthrough",
    category: "Player / tool",
    technologies: ["Passthrough MR", "AI passthrough", "XR player"],
    devices: ["Meta Quest", "Vision Pro", "PICO", "Galaxy XR", "PCVR"],
    access: "Dedicated app",
    model: "Free player + Premium/channels",
    summary:
      "Compatibility tool and delivery platform supporting alpha-packed and AI-generated passthrough video.",
    limitation:
      "DeoVR is primarily a player and delivery platform, not a dedicated adult-content producer.",
    sourceUrl: "https://deovr.com/blog/54-ar-passthrough-videos",
    sourceLabel: "Official passthrough guide",
    accent: "rose",
  },
  {
    id: "vrsmash",
    rank: 10,
    name: "VRSmash",
    url: "https://www.vrsmash.com/",
    score: 74,
    xrClass: "C3",
    evidence: "E1",
    status: "Limited passthrough content",
    category: "Content platform",
    technologies: ["Passthrough MR", "VR180", "VR360"],
    devices: ["Meta Quest", "Vision Pro", "PICO", "PCVR"],
    access: "Headset browser",
    model: "Free content + Premium",
    summary:
      "Large VR catalog where selected current uploads are labeled as passthrough.",
    limitation:
      "No dedicated technical passthrough page or complete MR catalog is documented.",
    sourceUrl: "https://www.vrsmash.com/how-to-watch-vr-porn-videos/",
    sourceLabel: "Official playback guide",
    accent: "blue",
  },
  {
    id: "povr",
    rank: 11,
    name: "POVR",
    url: "https://povr.com/",
    score: 69,
    xrClass: "C2",
    evidence: "E2",
    status: "UI passthrough — content remains VR",
    category: "Content platform",
    technologies: ["UI passthrough", "VR180", "VR360"],
    devices: ["Meta Quest", "PCVR", "Mobile"],
    access: "Free app",
    model: "Monthly, annual or lifetime",
    summary:
      "The app can show the physical surroundings in its menus, but does not document passthrough within the content itself.",
    limitation:
      "UI passthrough should not be presented as content-based MR or AR.",
    sourceUrl: "https://povr.com/app",
    sourceLabel: "Official app documentation",
    accent: "violet",
  },
  {
    id: "virtualrealporn",
    rank: 12,
    name: "VirtualRealPorn",
    url: "https://virtualrealporn.com/",
    score: 68,
    xrClass: "C2",
    evidence: "E2",
    status: "WebXR / VR180 — no documented AR",
    category: "Content platform",
    technologies: ["WebXR", "VR180", "Interactive sync"],
    devices: ["Meta Quest", "Vision Pro", "PCVR"],
    access: "Headset browser",
    model: "Premium + previews",
    summary:
      "WebXR and VR180 platform with interactive features, but no documented content-based MR.",
    limitation:
      "WebXR is an API standard and does not by itself demonstrate support for immersive AR.",
    sourceUrl: "https://virtualrealporn.com/discover-webxr/",
    sourceLabel: "Official WebXR page",
    accent: "cyan",
  },
  {
    id: "stripchatvr",
    rank: 13,
    name: "Stripchat VR",
    url: "https://vr.stripchat.com/",
    score: 64,
    xrClass: "C2",
    evidence: "E2",
    status: "Live VR — no documented AR",
    category: "Content platform",
    technologies: ["Live VR", "Headset browser"],
    devices: ["Headset browser"],
    access: "Browser",
    model: "Free entry; other pricing varies",
    summary:
      "Live VR destination with browser access, but no public passthrough or AR documentation.",
    limitation:
      "The public VR page provides no precise device matrix or AR feature description.",
    sourceUrl: "https://vr.stripchat.com/",
    sourceLabel: "Official VR landing page",
    accent: "amber",
  },
  {
    id: "wankzvr",
    rank: 14,
    name: "WankzVR",
    url: "https://www.wankzvr.com/",
    score: 62,
    xrClass: "C2",
    evidence: "E1",
    status: "VR180 — AR claim not substantiated",
    category: "Content platform",
    technologies: ["VR180", "Haptic sync"],
    devices: ["Meta Quest", "PCVR", "Mobile"],
    access: "Streaming + downloads",
    model: "Membership + selected free clips",
    summary:
      "Established VR180 catalog with haptic support and broad general headset marketing.",
    limitation:
      "The provider mentions AR but publishes no current passthrough category or technical explanation.",
    sourceUrl: "https://www.wankzvr.com/",
    sourceLabel: "Official product description",
    accent: "rose",
  },
  {
    id: "vrconk",
    rank: 15,
    name: "VRConk",
    url: "https://vrconk.com/",
    score: 60,
    xrClass: "C2",
    evidence: "E2",
    status: "VR180/360 — no documented AR",
    category: "Content platform",
    technologies: ["VR180", "VR360"],
    devices: ["Meta Quest", "Vision Pro", "PCVR", "Mobile"],
    access: "Streaming + downloads",
    model: "Membership + free app",
    summary:
      "Traditional VR180/360 catalog with broad general playback support.",
    limitation:
      "The network links to ARPorn as a separate service; VRConk itself does not document passthrough.",
    sourceUrl: "https://vrconk.com/",
    sourceLabel: "Official platform page",
    accent: "blue",
  },
];
