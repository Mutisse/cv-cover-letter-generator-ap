import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from './firebase';

export async function createDocument(userId, payload) {
  return addDoc(collection(db, 'documents'), {
    userId,
    ...payload,
    createdAt: serverTimestamp()
  });
}

export async function listDocuments(userId) {
  const q = query(collection(db, 'documents'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function removeDocument(id) {
  return deleteDoc(doc(db, 'documents', id));
}
