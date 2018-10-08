import jQuery from 'jquery';

class Articles {
	constructor() {
		this.baseUrl = '/hope/statistics/Index.aspx';
		this.updatePersonList = this.updatePersonList.bind(this);
	}

	async getData(options) {
		const id = options.id || this.id;
    const type = options.type || this.type;
    if(type === 'dairy') {
      let end = new Date(options.endDate);
      end.setMonth(end.getMonth() + 1);
      options.endDate = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()} 23:59:59`;
    }
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
  
  formatDate(date, end = false) {
    let time  = '00:00:00';
    if(end) {
      time = '23:59:59';
    }
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${time}`
  }

	async getStatisticData(options) {
    this.startDate = new Date(options.startDate);
    this.endDate = new Date(options.endDate);
		const data = await this.statistics(options);
		const res = [];
		for(let i in data) {
			let person = data[i];
			res.push({
				name: i,
				grade: person['年级'],
				group: person['组别'],
				...person['count']
			});
		}
		return res.sort((a,b) => a.grade + a.group + a.name > b.grade + b.group + b.name ? 1 : -1);
	}

}

class Dairies extends Articles {
	constructor(num = 5) {
		super();
		this.id = 78;
		this.type = 'dairy';
		this.requireNum = num;
		this.unit = 5;
  }
  
  analyse(data) {
		return super.analyse(data, data => {
			return data.filter(item => {
        const time = new Date(item.title);
        return time >= this.startDate && time <= this.endDate;
			});
		});
	}
}

class Summaries extends Articles {
	constructor(num = 1) {
		super();
		this.id = '77,321';
		this.type = 'summary'
		this.requireNum = num;
		this.unit = 0.25;
	}
}

class Notes extends Articles {
	constructor(num = 4) {
		super();
		this.id = '19,21,22,28,23,24,25,26,27,179,29';
		this.type = 'note';
		this.requireNum = num;
		this.unit = 1;
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