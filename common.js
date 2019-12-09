import Vue from 'vue'

import env from './.env.js'



Vue.prototype.isDev = function() {

	if (process.env.NODE_ENV === 'development') return true;

	return false;

}


Vue.prototype.getEnv = function(key, defaultValue = '') {

	if (Vue.prototype.isDev()) {

		let config = env.dev[key];

		if (!config) return defaultValue;

		return config;
	}

	let config = env.pro[key];

	if (!config) return defaultValue;

	return config;


}


Vue.prototype.getBaseUrl = function() {

	return Vue.prototype.getEnv('host');

}



Vue.prototype.httpCommon = function(param) {

	let baseUrl = Vue.prototype.getBaseUrl();

	if (param.loading === true) uni.showLoading({
		mask: true,
		title: "加载中..."
	})

	param.url = baseUrl + param.url;

	// //登录标识
	param.header = {
		token: Vue.prototype.localGet('token')
	};

	return new Promise((resolve, reject) => {

		param.success = function(res) {

			if (param.loading === true) uni.hideLoading()
			
			
			// console.log(res);
			
			if(res.data.code>=10&&res.data.code<=30){
				
				uni.navigateTo({
					url:'/pages/login/login'
				})
				
				return reject(res);
				
			}
			

			resolve(res);
		}


		param.fail = function(res) {

			if (param.loading === true) uni.hideLoading()

			reject(res);
		}


		uni.request(param)

	});



}


Vue.prototype.httpGet = function(param) {

	param.method = 'GET';

	return new Promise((resolve, reject) => {

		Vue.prototype.httpCommon(param).then((re) => {

			resolve(re.data);

		}).catch((re) => {

			reject(re);
		});

	});


}

Vue.prototype.httpPost = function(param) {

	param.method = 'POST';

	return new Promise((resolve, reject) => {

		Vue.prototype.httpCommon(param).then((re) => {

			resolve(re.data);

		}).catch((re) => {

			reject(re);
		});

	});


}


Vue.prototype.getImgPrefix = function() {


	return Vue.prototype.getEnv('host') + "/uploads/";
}





Vue.prototype.localSave = function(key, value, expire = 0, prefix = 'weapp_') {


	let expire_time = 0;

	if (expire !== 0) expire_time = (Date.parse(new Date()) / 1000) + expire;

	uni.setStorageSync(prefix + key, {
		value: value,
		expire: expire_time
	})

}


Vue.prototype.localGet = function(key, defaultValue = '', prefix = 'weapp_') {

	let v = uni.getStorageSync(prefix + key)

	if (v === '') return defaultValue

	let expire_time = v.expire;

	if (expire_time == 0) return v.value;

	let now = Date.parse(new Date()) / 1000;

	if (now > expire_time) {

		Vue.prototype.localRemove(key)

		return defaultValue;
	}

	return v.value;

}


Vue.prototype.localRemove = function(key, prefix = 'weapp_') {

	uni.removeStorageSync(prefix + key)

}


Vue.prototype.getObj = function(obj, attr, defaultValue = '') {

	try {
	// console.log(obj);
	
	// return false;
	
	let tempObj = Vue.prototype.cloneObj(obj)
	
	// console.log(tempObj);
	
	// return false;
		let arr = attr.split('.');
		
		// console.log(arr);
		for (let i in arr) {
			
			let isHave= tempObj.hasOwnProperty(arr[i]);
				
			if(isHave){
				tempObj = tempObj[arr[i]]
			}else{
				
				return defaultValue;
			}
				
			 
			
			
			
			// console.log(tempObj);
			
			
		}

		return tempObj;

	} catch (e) {
		
		// console.log(e);
		
		return defaultValue;
	}


}

/**
 * rule={
		phone:{rule:'required',msg:'手机号未授权'}
		};
 * 
 * @param {Object} formItem
 * @param {Object} rule
 */
Vue.prototype.checkForm = function(formItem, rule) {

	for (let i in rule) {


		let rule_check = rule[i]['rule'];
		let msg = rule[i]['msg'];

		let item = formItem[i];

		// if(rule_check)

		switch (rule_check) {

			case "required":

				if (item == '') return {
					result: false,
					msg: msg
				}

				break;

			case "email":

				let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

				if (!reg.test(item)) return {
					result: false,
					msg: msg
				}



				break;

		}





	}

	return {
		result: true
	}
}


/**
let rule={
		phone:[{rule:'required',msg:'手机号未授权'}],
		company_name:[{rule:'required',msg:'公司名未填写'}],
		name:[{rule:'required',msg:'联系人未填写'}],
		work:[{rule:'required',msg:'职位未填写'}],
		email:[{rule:'required',msg:'邮箱未填写'},{rule:'email',msg:'邮箱格式不正确'}]					
		};
 * @param {Object} formItem
 * @param {Object} rule
 */
Vue.prototype.checkFormPro = function(formItem, rule) {

	for (let i in rule) {

		for (let j in rule[i]) {

			let rule_check = rule[i][j]['rule'];
			let msg = rule[i][j]['msg'];

			let item = formItem[i];

			// if(rule_check)
			
			// console.log(rule_check);
			// console.log(item);
			
			switch (rule_check) {

				case "required":

					if (item == '') return {
						result: false,
						msg: msg
					}

					break;

				case "email":

					let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

					if (!reg.test(item)) return {
						result: false,
						msg: msg
					}



					break;

			}



		}

	}

	return {
		result: true
	}
}




/**
 * 克隆对象
 * @param {Object} object
 */
Vue.prototype.cloneObj = function(object) {

	return JSON.parse(JSON.stringify(object))
}

/**
 * item赋值
 * @param {Object} defaultItem
 * @param {Object} item
 */
Vue.prototype.setItem = function(defaultItem, item) {

	// console.log(item);
	for (let key in defaultItem) {

		// console.log(item[key]);

		// console.log(typeof(item[key]));
		if (!(typeof(item[key]) == 'undefined')) {

			// console.log(item[key]);
			defaultItem[key] = item[key];
		}

	}
}


Vue.prototype.goUrl = function(url) {


	if (url.substring(0, 4) == 'http') {

		uni.navigateTo({
			url: "/pages/web/web?url=" + encodeURIComponent(url)
		})
	} else {

		uni.navigateTo({
			url: url
		})
	}


}

Vue.prototype.showModal = function(title, content) {


	return new Promise((success, fail) => {

		uni.showModal({
			title: title,
			content: content,
			success: function(res) {
				if (res.confirm) {
					// console.log('用户点击确定');

					success();

				} else if (res.cancel) {
					// console.log('用户点击取消');

					fail();
				}
			}
		});

	});

}


//-----------------------------------------------------------------------------------------------


Vue.filter('saveOne', function(value) {

	// console.log(typeof value);

	if (value === '') return '';

	return value.substr(0, value.length - 1);

})


Vue.filter('join', function(value) {

	if (value === '') return '';

	let temp = '';

	for (let i in value) {

		temp += (value[i] + ',')

	}

	return temp;

})
