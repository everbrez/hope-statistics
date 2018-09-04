class Articles {
	constructor() {
		this.baseUrl = 'http://ce.sysu.edu.cn/hope/statistics/Index.aspx';
	}

	async getData(options) {
		const data = await this.get(this.baseUrl, {
			id: this.id,
			type: this.type,
			...options
		});

		return this.processData(data);
	}

	get(url, data) {
		return new Promise((resolve, reject) => {
			jQuery.get(url, data)
				.done(res => resolve(res))
				.fail(error => reject(error));
		});
	}

	processData(data) {
		const pattern = /(?<=<!--data-start--\>)[\w\W]+(?=\<\!--data-end--\>)/gm;
		const result =  JSON.parse(pattern.exec(data)[0]).data;
		return result;
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

class PersonList extends Articles {
	constructor() {
		super();
		this.type = 'person'
	}
}
export {
	Articles,
	Dairies,
	Summaries,
	Notes,
	PersonList
}