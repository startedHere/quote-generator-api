// api/quotes.js
import { db } from '../lib/firebase';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		// Fetch all quotes
		const snapshot = await db.collection('quotes').get();
		const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		res.status(200).json(quotes);
	} else if (req.method === 'POST') {
		// Add a new quote
		const { text, author } = req.body;
		const newQuote = { text, author: author || 'Unknown' };
		const docRef = await db.collection('quotes').add(newQuote);
		res.status(201).json({ id: docRef.id, ...newQuote });
	} else {
		res.status(405).json({ message: 'Method Not Allowed' });
	}
}
