import { myTab, otherTab, field } from '../components/firestore';

export const newitem = async (data, user, type) => {
	data.timeAdded = new Date();
	try {
		if (type == 1) var tab = myTab; else tab = otherTab;

		let update = await tab.doc(user).update({ tab: field.arrayUnion(data) });
		return { code: 1, msg: 'Added to tab successfully!' }
		/* if (update) return { code: 1, msg: 'Added to tab successfully!' };
		else return { code: 0, msg: 'Unknown error!' }; */
	} catch (e) {
		return { code: 0, msg: 'Unknown error!' };
	}
};

export const updateitem = async (data, user, type) => {
	data.timeAdded = new Date();

	try {
		if (type == 1) var tab = myTab; else tab = otherTab;

		let update = await tab.doc(user).update({ payment: field.arrayUnion(data) });
		return { code: 1, msg: 'Tab updated successfully!' };
		/* if (update) return { code: 1, msg: 'Tab updated successfully!' };
		else return { code: 0, msg: 'Unknown error!' }; */
	} catch (e) {
		return { code: 0, msg: 'Unknown error!' };
	}
};