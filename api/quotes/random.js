// api/quotes/random.js
import { db } from '../../lib/firebase';

export default async function handler(req, res) {
	const snapshot = await db.collection('quotes').get();
	const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

	if (quotes.length > 0) {
		const randomIndex = Math.floor(Math.random() * quotes.length);
		res.status(200).json(quotes[randomIndex]);
	} else {
		res.status(404).json({ message: 'No quotes found' });
	}
}
