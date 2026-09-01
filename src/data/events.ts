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
    "id": "IKTnOXI_os08vYtD",
    "title": "Build on Stellar Bootcamp - Centro Escolar University, Malolos",
    "image": "https://files.risein.com/programs/wkxv5-cohort-1786616978674jpeg",
    "date": "October 8, 2026",
    "link": "https://www.risein.com/programs/build-on-stellar-bootcamp-centro-escolar-university-malolos",
    "location": "Malolos, Philippines",
    "status": "upcoming",
    "time": "12:00 AM",
    "type": "Bootcamp",
    "desc": "Join this exciting beginner level Stellar ecosystem tracking program. Organized via Rise In."
  }
];
