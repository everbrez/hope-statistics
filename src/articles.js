class Articles {
	constructor() {
		this.baseUrl = 'http://ce.sysu.edu.cn/hope/statistics/Index.aspx';
		this.updatePersonList = this.updatePersonList.bind(this);
	}

	async getData(options) {
		const {
			id,
			type,
			...opts
		} = options;
		const data = await this.get(this.baseUrl, {
			id: id || this.id,
			type: type || this.type,
			...opts
		});

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
			return this.personList;
		}
		return this.updatePersonList();
	}

	async updatePersonList() {
		const {data} = await this.getData({
			type: 'person'
		});

		this.personList = data;
		return new Promise(resolve => {
			resolve(data);
		});
	}

}

class Dairies extends Articles {
	constructor() {
		super();
		this.id = 78;
		this.type = 'dairy';
	}
}

class Summaries extends Articles {
	constructor() {
		super();
		this.id = '77,321';
		this.type = 'summary'
	}
}

class Notes extends Articles {
	constructor() {
		super();
		this.id = '19,21,22,28,23,24,25,26,27,179,29';
		this.type = 'note'
	}
}

export {
	Articles,
	Dairies,
	Summaries,
	Notes
}