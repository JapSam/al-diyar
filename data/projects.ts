export interface Project {
  id: string;
  name: string;
  category: "سكني" | "تجاري" | "فلل" | "مجمعات";
  location: string;
  status: "مكتمل" | "تحت الإنشاء";
  year: string;
  area: string;
  description: string;
  images: string[];
  coordinates: { lat: number; lng: number };
  featured?: boolean;
}

export const categories = ["الكل", "سكني", "تجاري", "فلل", "مجمعات"] as const;

export const projects: Project[] = [
  {
    id: "al-rimal-towers",
    name: "أبراج الرمال",
    category: "سكني",
    location: "الرياض، حي العليا",
    status: "مكتمل",
    year: "2023",
    area: "45,000 م²",
    description:
      "مجمع سكني فاخر يضم برجين بارتفاع 30 طابقاً، يوفر إطلالات بانورامية على مدينة الرياض. يتميز بتصاميم عصرية وتشطيبات فائقة الجودة مع مرافق ترفيهية متكاملة تشمل مسابح ونوادي صحية ومساحات خضراء.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
    ],
    coordinates: { lat: 24.7136, lng: 46.6753 },
    featured: true,
  },
  {
    id: "al-yasmin-mall",
    name: "مجمع الياسمين التجاري",
    category: "تجاري",
    location: "جدة، حي الشاطئ",
    status: "مكتمل",
    year: "2022",
    area: "120,000 م²",
    description:
      "مركز تجاري ضخم يضم أكثر من 300 متجر ومطعم، مع سينما ومنطقة ترفيهية للعائلات. يتميز بتصميم معماري مستوحى من الثقافة العربية مع لمسات عصرية، ويوفر تجربة تسوق فريدة من نوعها.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
      "https://images.unsplash.com/photo-1577587230708-187fdbef4d91?w=1200",
      "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=1200",
    ],
    coordinates: { lat: 21.5433, lng: 39.1728 },
    featured: true,
  },
  {
    id: "wahat-villas",
    name: "فلل الواحة",
    category: "فلل",
    location: "الرياض، حي النرجس",
    status: "تحت الإنشاء",
    year: "2025",
    area: "85,000 م²",
    description:
      "مشروع فلل فاخرة يضم 45 فيلا بتصاميم متنوعة تجمع بين الأصالة العربية والحداثة. كل فيلا تتميز بحديقة خاصة ومسبح وموقف سيارات مغطى، مع خدمات أمنية وصيانة على مدار الساعة.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    ],
    coordinates: { lat: 24.8204, lng: 46.6285 },
    featured: true,
  },
  {
    id: "business-gate",
    name: "بوابة الأعمال",
    category: "تجاري",
    location: "الدمام، حي الفيصلية",
    status: "مكتمل",
    year: "2021",
    area: "60,000 م²",
    description:
      "مجمع مكاتب من الفئة الأولى يضم 15 طابقاً من المساحات المكتبية المرنة، مع قاعات اجتماعات ومرافق مشتركة حديثة. يقع في قلب المنطقة التجارية مع سهولة الوصول من جميع الاتجاهات.",
    images: [
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200",
    ],
    coordinates: { lat: 26.3927, lng: 49.9777 },
  },
  {
    id: "rawdah-compound",
    name: "مجمع الروضة السكني",
    category: "مجمعات",
    location: "الخبر، حي الروضة",
    status: "مكتمل",
    year: "2020",
    area: "200,000 م²",
    description:
      "مجمع سكني متكامل يضم 200 وحدة سكنية متنوعة بين شقق وتاون هاوس، مع مرافق رياضية وتعليمية ومساجد وحدائق عامة. يوفر بيئة آمنة ومريحة للعائلات مع خدمات إدارة عقارية متميزة.",
    images: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200",
    ],
    coordinates: { lat: 26.2172, lng: 50.1971 },
  },
  {
    id: "sedr-residences",
    name: "سدر ريزيدنس",
    category: "سكني",
    location: "جدة، حي الحمراء",
    status: "تحت الإنشاء",
    year: "2026",
    area: "35,000 م²",
    description:
      "مشروع سكني عصري يضم 120 شقة فاخرة بتصاميم ذكية تستغل المساحات بكفاءة. يتميز بموقعه الاستراتيجي بالقرب من كورنيش جدة ويوفر إطلالات بحرية ساحرة مع مرافق ترفيهية عالمية المستوى.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18f6b6b3c?w=1200",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
    ],
    coordinates: { lat: 21.5169, lng: 39.2192 },
  },
];
