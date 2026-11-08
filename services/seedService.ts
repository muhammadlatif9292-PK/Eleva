import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  writeBatch, 
  getDocs,
  query,
  where
} from 'firebase/firestore';

export const seedInitialData = async () => {
  const batch = writeBatch(db);

  // 1. Seed Access Codes
  const codes = [
    { code: 'ELV-PREM-001', type: 'premium', used: false },
    { code: 'ELV-FREE-001', type: 'free', used: false },
    { code: 'ELV-BETA-123', type: 'premium', used: false },
  ];

  for (const c of codes) {
    const codeRef = doc(db, 'accessCodes', c.code);
    batch.set(codeRef, {
      code: c.code,
      type: c.type,
      isUsed: c.used,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    });
  }

  // 2. Seed Physics Subject & Units
  const physicsRef = doc(db, 'subjects', 'physics');
  batch.set(physicsRef, {
    subjectID: 'physics',
    name: 'Physics',
    urduName: 'طبیعیات',
    icon: 'Atom',
    color: '#8B5CF6',
    grade: 10,
    totalUnits: 9
  });

  const units = [
    { id: 'p10', title: 'SHM and Waves', weight: '11%', marks: 9 },
    { id: 'p11', title: 'Sound', weight: '11%', marks: 9 },
    { id: 'p12', title: 'Geometrical Optics', weight: '15%', marks: 13, priority: true },
    { id: 'p13', title: 'Electrostatics', weight: '14%', marks: 12 },
    { id: 'p14', title: 'Current Electricity', weight: '11%', marks: 9 },
    { id: 'p15', title: 'Electromagnetism', weight: '14%', marks: 12, priority: true },
    { id: 'p16', title: 'Basic Electronics', weight: '9%', marks: 5 },
    { id: 'p17', title: 'ICT', weight: '9%', marks: 5 },
    { id: 'p18', title: 'Atomic & Nuclear Physics', weight: '12%', marks: 10 },
  ];

  for (const u of units) {
    const unitRef = doc(db, 'units', u.id);
    batch.set(unitRef, {
      unitID: u.id,
      subjectID: 'physics',
      title: u.title,
      weight: u.weight,
      marks: u.marks,
      priority: u.priority || false,
      order: parseInt(u.id.replace('p', ''))
    });
  }

  await batch.commit();
  console.log('Seeding completed!');
};
