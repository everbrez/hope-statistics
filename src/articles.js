class Articles {
	constructor() {
		this.baseUrl = 'http://ce.sysu.edu.cn/hope/statistics/Index.aspx';
		this.updatePersonList = this.updatePersonList.bind(this);
	}

	async getData(options) {
		const id = options.id || this.id;
		const type = options.type || this.type;

		const opts = Object.assign({}, options, {
			id,
			type
		});
		const data = await this.get(this.baseUrl, opts);

		return new Promise((resolve, reject) => {
			resolve(this.processData(data));
		});
	}

	get(url, data) {
		return new Promise((resolve, reject) => {
			jQuery.get(url, data)
				.done(res => resolve(res))
				.fail(error => reject(error));
		});
	}

	processData(data) {
		return JSON.parse(data);
	}

	getPersonList() {
		if (this.personList) {
			return new Promise(resolve => {
				resolve(this.personList);
			});
		}
		return this.updatePersonList();
	}

	async updatePersonList() {
		const {
			data
		} = await this.getData({
			type: 'person'
		});
		for (let person in data) {
			data[person].count = {
				num: 0,
				data: [],
				requireNum: this.requireNum,
				pass: false
			}
		}
		this.personList = data;
		return new Promise(resolve => {
			resolve(data);
		});
	}

	async analyse(data, ...middlewares) {
		const personList = await this.getPersonList();
		let res = data;
		if (middlewares.length > 0) {
			res = middlewares.reduce((res, fn) => {
				return fn(res);
			}, data);
		}

		for (let i = 0; i < res.length; i++) {
			if (!res[i]) {
				continue;
				console.log(res);
				console.log(res[i]);
			}
			let person = personList[res[i].author];
			if (person) {
				person.count.data.push(res[i].title);
				person.count.num++;
			}
		}

		let result = this.test(personList);
		console.log(result);
		return result;
	}

	async statistics(options) {
		const data = await this.getData(options);
		data.data.pop();
		return this.analyse(data.data);
	}

	test(personList) {
		for (let i in personList) {
			let person = personList[i];
			if (person.count.num >= person.count.requireNum) {
				person.count.pass = true;
			}
		}
		return personList;
	}

}

class Dairies extends Articles {
	constructor(num = 5) {
		super();
		this.id = 78;
		this.type = 'dairy';
		this.requireNum = num;
	}
}

class Summaries extends Articles {
	constructor(num = 1) {
		super();
		this.id = '77,321';
		this.type = 'summary'
		this.requireNum = num;
	}
}

class Notes extends Articles {
	constructor(num = 4) {
		super();
		this.id = '19,21,22,28,23,24,25,26,27,179,29';
		this.type = 'note';
		this.requireNum = num;
	}

	analyse(data) {
		return super.analyse(data, data => {
			return data.filter(item => {
				return /^学习笔记：/.test(item.title);
			});
		});
	}
}

export {
	Articles,
	Dairies,
	Summaries,
	Notes
}