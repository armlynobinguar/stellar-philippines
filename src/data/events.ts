export interface CommunityEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  link: string;
  location: string;
  status: 'upcoming' | 'past';
  time: string;
  type: 'Bootcamp' | 'Hackathon' | 'Workshop' | 'Challenge';
  desc: string;
}

export const events: CommunityEvent[] = [
  {
    "id": "BA-w_GOHGKIjuPQK",
    "title": "Build on Stellar Bootcamp - Bestlink College of the Philippines",
    "image": "https://files.risein.com/programs/of-l7-program-1786544993825jpeg",
    "date": "August 18, 2026",
    "link": "https://www.risein.com/programs/build-on-stellar-bootcamp-bestlink-college-of-the-philippines",
    "location": "Quezon City, Philippines",
    "status": "upcoming",
    "time": "12:00 AM",
    "type": "Bootcamp",
    "desc": "Join this exciting beginner level Stellar ecosystem tracking program. Organized via Rise In."
  },
  {
    "id": "wMv5p7kJycFb5Lvk",
    "title": "Build on Stellar Bootcamp - PHINMA Araullo University",
    "image": "https://files.risein.com/programs/yesdp-program-1786616760205jpeg",
    "date": "August 24, 2026",
    "link": "https://www.risein.com/programs/build-on-stellar-bootcamp-phinma-araullo-university",
    "location": "Cabanatuan, Philippines",
    "status": "upcoming",
    "time": "12:00 AM",
    "type": "Bootcamp",
    "desc": "Join this exciting beginner level Stellar ecosystem tracking program. Organized via Rise In."
  },
  {
    "id": "HrDjqCAA8yxTm1yn",
    "title": "Stellar Journey to Mastery: Monthly Builder Challenges - $20,000 Prize Pool 🎉",
    "image": "https://files.risein.com/programs/_3zmz-cohort-1780031137050png",
    "date": "June 1, 2026",
    "link": "https://www.risein.com/programs/stellar-journey-to-mastery-monthly-builder-challenges",
    "location": "Online",
    "status": "upcoming",
    "time": "02:30 AM",
    "type": "Challenge",
    "desc": "Join this exciting Stellar ecosystem tracking program. Organized via Rise In."
  },
  {
    "id": "IKTnOXI_os08vYtD",
    "title": "Build on Stellar Bootcamp - Centro Escolar University, Malolos",
    "image": "https://files.risein.com/programs/wkxv5-cohort-1786616978674jpeg",
    "date": "September 4, 2026",
    "link": "https://www.risein.com/programs/build-on-stellar-bootcamp-centro-escolar-university-malolos",
    "location": "Malolos, Philippines",
    "status": "upcoming",
    "time": "12:00 AM",
    "type": "Bootcamp",
    "desc": "Join this exciting beginner level Stellar ecosystem tracking program. Organized via Rise In."
  }
];
