/*
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
*/

// api/quotes.js
import { db } from '../lib/firebase';

export default async function handler(req, res) {
	// ✅ Set CORS Headers
	res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (change '*' to a specific domain for security)
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed request methods
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed request headers

	// ✅ Handle Preflight Requests (CORS for OPTIONS method)
	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	try {
		if (req.method === 'GET') {
			// Fetch all quotes
			const snapshot = await db.collection('quotes').get();
			const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			return res.status(200).json(quotes);
		} else if (req.method === 'POST') {
			// Add a new quote
			const { text, author } = req.body;
			const newQuote = { text, author: author || 'Unknown' };
			const docRef = await db.collection('quotes').add(newQuote);
			return res.status(201).json({ id: docRef.id, ...newQuote });
		} else {
			return res.status(405).json({ message: 'Method Not Allowed' });
		}
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}
