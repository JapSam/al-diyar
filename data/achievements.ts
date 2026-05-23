export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Award {
  name: string;
  year: string;
  issuer: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export const milestones: Milestone[] = [
  {
    year: "2010",
    title: "تأسيس الشركة",
    description: "انطلقت الديار للتطوير العقاري برؤية طموحة لتطوير مشاريع عقارية استثنائية في المملكة.",
  },
  {
    year: "2012",
    title: "أول مشروع سكني",
    description: "تسليم أول مشروع سكني يضم 50 وحدة سكنية في مدينة الرياض بنجاح تام.",
  },
  {
    year: "2014",
    title: "التوسع إلى جدة",
    description: "افتتاح فرع جدة وإطلاق أول مشروع تجاري في حي الشاطئ.",
  },
  {
    year: "2016",
    title: "جائزة التميز العقاري",
    description: "حصول الشركة على جائزة التميز العقاري من الهيئة العامة للعقار.",
  },
  {
    year: "2018",
    title: "مليون متر مربع",
    description: "تجاوز إجمالي المساحات المطورة حاجز المليون متر مربع.",
  },
  {
    year: "2020",
    title: "التوسع إلى المنطقة الشرقية",
    description: "إطلاق مشاريع جديدة في الدمام والخبر مع التركيز على المجمعات السكنية المتكاملة.",
  },
  {
    year: "2022",
    title: "شراكات استراتيجية",
    description: "توقيع شراكات مع شركات عالمية رائدة في مجال التصميم والبناء.",
  },
  {
    year: "2024",
    title: "رؤية 2030",
    description: "إطلاق مشاريع ضخمة تتماشى مع رؤية المملكة 2030 في قطاع الإسكان والتطوير الحضري.",
  },
];

export const awards: Award[] = [
  { name: "جائزة التميز العقاري", year: "2016", issuer: "الهيئة العامة للعقار" },
  { name: "أفضل مطور سكني", year: "2018", issuer: "جوائز العقارات العربية" },
  { name: "جائزة الاستدامة", year: "2020", issuer: "المجلس السعودي للأبنية الخضراء" },
  { name: "أفضل تصميم معماري", year: "2021", issuer: "جوائز التصميم الدولية" },
  { name: "جائزة رضا العملاء", year: "2023", issuer: "جمعية حماية المستهلك" },
  { name: "التميز في الابتكار العقاري", year: "2024", issuer: "منتدى المستقبل العقاري" },
];

export const stats: Stat[] = [
  { label: "مشروع منجز", value: 50, suffix: "+" },
  { label: "سنة خبرة", value: 15, suffix: "" },
  { label: "عميل سعيد", value: 2000, suffix: "+" },
  { label: "م² تم تسليمها", value: 2, suffix: " مليون" },
];
