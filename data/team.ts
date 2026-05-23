export interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
}

export const team: TeamMember[] = [
  {
    name: "م. عبدالله الديار",
    title: "الرئيس التنفيذي",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    bio: "أكثر من 25 عاماً من الخبرة في قيادة مشاريع التطوير العقاري الكبرى في المملكة العربية السعودية.",
  },
  {
    name: "م. سارة القحطاني",
    title: "نائب الرئيس للتصميم",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    bio: "مهندسة معمارية حائزة على جوائز دولية، تقود فريق التصميم بإبداع ورؤية مستقبلية.",
  },
  {
    name: "م. فهد العتيبي",
    title: "مدير المشاريع",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "خبرة واسعة في إدارة المشاريع الضخمة وتسليمها في الوقت المحدد وبأعلى معايير الجودة.",
  },
  {
    name: "أ. نورة الشمري",
    title: "مديرة التسويق والمبيعات",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    bio: "متخصصة في التسويق العقاري مع سجل حافل في تحقيق أهداف المبيعات وبناء علاقات العملاء.",
  },
];
