class Articles {
	constructor() {
			this.baseUrl =  'http://ce.sysu.edu.cn/hope/statistics/Index.aspx';
	}

	getData(options, callback) {
		const url = `${this.config.url}?id=${this.id}&startDate=${options.startDate}&endDate=${options.endDate}`;
		jQuery.ajax(url, {
			complete: xhr => {
				const data = this.processData(xhr.responseText);
				callback(data);
			}
		});
	}

	processData(data) {
		const pattern = /(?<=<!--data-start--\>)[\w\W]+(?=\<\!--data-end--\>)/gm;
		return JSON.parse(pattern.exec(data)[0]).data;
	}

}

class Dairies extends Data {
	constructor(url) {
		super(url);
		this.id = 78;
	}
}