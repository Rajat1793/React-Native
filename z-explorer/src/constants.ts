export interface Character {
  id: string;
  name: string;
  kiLevel: string;
  kiPercent: number;
  image: string;
  description: string;
  title: string;
  stats: {
    fightingStyle: string;
    specialMove: string;
    homeLocation: string;
    powerStatus: string;
  };
}

export interface NewsItem {
  id: string;
  type: 'Event' | 'Update';
  title: string;
  description: string;
  image: string;
}

export const CHARACTERS: Character[] = [
  {
    id: 'goku',
    name: 'Goku',
    kiLevel: '90,001+',
    kiPercent: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq1F61usjnfuyMQjpfwXqbEmsvAuS-QmaVzbctr3d79bKbgKkj9H9bS3aUjCPW6kHirTvWsf1pi0paWRKHclnStd5mJ7kGnNUQV9b9lWbK3z33LJpCfYjyD-MpOpVZDVVTKiBEwlBSiExiDoGX90zYlSijbPDvXitWESzIHjT7tpHHdcM0ULZRfvKCb13_OobXOd32TYrqiGcbJ4oo1HIt1dXhFcyiRiz7DVP68IlhNY_Z0CWh9KEgw-8rP0lNRkvNEeuI_ngTLXIE',
    description: 'The legendary Saiyan raised on Earth, whose pure heart and relentless drive for self-improvement have led him to achieve the power of the gods.',
    title: 'DEFENDER OF EARTH',
    stats: {
      fightingStyle: 'Turtle School Mastery',
      specialMove: 'Kamehameha',
      homeLocation: 'Mount Paozu, Earth',
      powerStatus: 'UNMEASURABLE'
    }
  },
  {
    id: 'vegeta',
    name: 'Vegeta',
    kiLevel: '88,500',
    kiPercent: 88,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr2Y8c75qevk8MTxAlexj2Fx2eBWtemCGLrWNZLc4oUknLI7fXVFUpASy0Wfon35miDeurt_n2ckgFTY_O8dMTLYceKzk12l-fRyaHiCxqaaUg6JgPB3igycNX-GvlwVpnkhspZFdGssKO01Dz3DcxPtMjSLRyqQyb-Q2cD09O8i6adj76N-Fqh_vBBHBNwYt6p0eX4BPtfdNtqdaEh2YsgaJtl5UNXRBUFRTAE1cyORgZKpRFmeDieGt1UiRc8uithV55DI53uchD',
    description: 'Es el príncipe de una raza guerrera conocida como los Saiya-jin. Vegeta es una persona extremadamente orgullosa y obsesionada por el poder, ya que se siente profundamente herido por el hecho de que su planeta fue destruido por Freezer y su pueblo esclavizado.',
    title: 'PRÍNCIPE DE LOS SAIYANS',
    stats: {
      fightingStyle: 'Tactical Aggression',
      specialMove: 'Final Flash',
      homeLocation: 'Capsule Corp, Earth',
      powerStatus: 'OVER 8000'
    }
  },
  {
    id: 'piccolo',
    name: 'Piccolo',
    kiLevel: '72,000',
    kiPercent: 72,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi8ycYdzjfEOLBD_UERs5jvuMd7PlfopyT_E9tdAiiHv8X01kAhSQ9dogHEEEDlc8gGflRChpEKW2RB71DeI295ZgcRY4UUCnPf2eWLCBKVr3A6mUOcdl6ZxVviiJ7OgDxl-ExQyOAkqgdEB947zgve_rmsvm-pl8w2IC55_p9BzbVBh49awB0CUAZ-WYz71Ht1Qbyr2shnIL_pkCkcHz-wypZxIe2oSH58M_Schd1PX_GMR__8fdPo-Le5NFJdjTmKWPvjz_snYbT',
    description: 'A wise and powerful Namekian warrior who evolved from a ruthless conqueror to one of Earth\'s most trusted guardians and a mentor to Gohan.',
    title: 'NAMEKIAN GUARDIAN',
    stats: {
      fightingStyle: 'Strategic Counter',
      specialMove: 'Special Beam Cannon',
      homeLocation: 'The Lookout, Earth',
      powerStatus: 'STABLE'
    }
  }
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    type: 'Event',
    title: 'The return of the Galactic Tyrant',
    description: 'New world raid starting this weekend. Prepare your team for the ultimate challenge.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOnKDwJ_rD0l0hTJbJyM0A9p6w-YNCP27-keMazt11BjRkjSJ1ri4Ba2Uv_nUya0QH74SsgZuw1AC3wDh_T2SFXls4LYbWBKy5tgFErcYrlyZ1fdo5N0qrMEQH3RHjD1ee0hOS4ifVqIc3B63WCJHgF3fxizy6W5VjEJCCOP_1PA9cQhYJelyizeh_qvUINPpuji2BP1uM278N8coVJ7seXr2N0Je09Hlbm2Wdw0aAFbX7veTwGAMdkJ06WXnDEQGwVyijUNJrGwuH'
  },
  {
    id: '2',
    type: 'Update',
    title: 'Timeline Maintenance Complete',
    description: 'The Time Machine has been optimized for faster travel between eras. Check the logs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU0ipZd_dJixCx38ksNndjiGtPPniBt5xBIKmmgbwAwd9gRlnQw8Ck7DVdQD7yfGVDTObHtO4Dk2wkHdDLPOrhvk8jjjkPcA_IZJC8hrAAi16DCubll6V1A4K8AWEe8_sLCGv3qkfSzj8pz9pNETRAqomvxWTePu16qfHUXKS965wlrvOJ43hAsVMtAcZXRzvlB6pXNAz_0eAym0u84x3F0IWPH96Z65CEbg32XmUoCYvr3GccUnuR0Uubv1pXtrSCwW4a6IDf4He3'
  }
];
