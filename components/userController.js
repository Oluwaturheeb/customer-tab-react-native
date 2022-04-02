import {myTab, otherTab, money, field} from '../components/firestore';

export const newuser = async (name, account, type) => {
    try {
        const data = {
            account: account,
            name: name
        };
        if (type == 1) var db = myTab; else db = otherTab;
        let check = await db.where('account', '==', data.account).where('name', '==', data.name).get();

        if (check.empty) {
            await db.add(data);
            return {
                code: 1, msg: data.name + ' has been added to customers list'
            };
        } else
            return {
                code: 0, msg: 'Customer with the same name exist'
            };
    } catch (e) {
        return { code: 0, msg: e.message };
    }
};

export const userinfo = async id => {
    try {
        const tabTotal = (tab, main) => {
            let total = 0;
            if (tab.tab != undefined || tab.payment != undefined)
                tab.tab.forEach(tEach => {
                    total += tEach.total - tEach.paid;
                });
            if (tab.payment != undefined)
                tab.payment.forEach(tEach => {
                    total = total - tEach.paid
                });

            return {
                total: total,
                allTotal: main + total
            };
        };

        let customers = await myTab.where('account', '==', id).get();
        let others = await otherTab.where('account', '==', id).get();

        if (customers.empty && others.empty)
            return {
                code: 1,
                msg: 'List is empty',
                total: 0
            };
        else {
            const extract = db => {
                let data = [], iniT = 0;

                if (db.size > 0)
                    db.docs.forEach(doc => {
                        let { total, allTotal } = tabTotal(doc.data(), iniT);

                        data.push({
                            id: doc.id,
                            name: doc.data().name,
                            total: money(total),
                            details: {
                                info: doc.data().tab,
                                payment: doc.data().payment
                            }
                        });
                        iniT = allTotal;
                    });

                return { tab: data, total: iniT };
            };
            let myTab = extract(customers),
                othersTab = extract(others);

            return {
                code: 1,
                myTabTotal: money(myTab.total),
                myTab: myTab.tab,
                othersTabTotal: money(othersTab.total),
                othersTab: othersTab.tab
            };
        }
    } catch (e) {
        return { code: 0, msg: e.message };
    }
};

export const userreset = async (id, type = 1, remove = false) => {
    try {
        if (type == 1) var db = myTab; else db = otherTab;
        let up = await db.doc(id).update({
            tab: field.delete(),
            payment: field.delete(),
        });

        if (remove)
            if (up) {
                up = await db.doc(id).delete();
                if (up) return {code: 1, msg: 'Customer has been removed successfully!'};
            }

        if (up) return {code: 1, msg: 'Reset successfully!'};
        else console.log(up, 'unknown error!');
    } catch (e) {
        return { code: 0, msg: 'Unknown error!' };
    }
};
