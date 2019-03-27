const $url = 'http://www.chiy.online:8083' 

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const formateSecond = s => {
    const hour = Math.floor(s / 3600)
    const minute = Math.floor((s - hour * 3600) / 60);
    const second = s - hour * 3600 - minute * 60;
    let res = ''
    if (hour) {
        res += hour + 'h';
    }
    if (minute) {
        res += minute + 'm';
    }
    if (second) {
        res += second + 's'
    } else {
        res += '0s'
    }
    return res;
}

const formateMSecond = data => {
	let s = data / 1000;
    const hour = Math.floor(s / 3600)
    const minute = Math.floor((s - hour * 3600) / 60);
    const second = s - hour * 3600 - minute * 60;
    let res = ''
    if (hour) {
        res += formatNumber(hour) + ':';
    }
    if (minute) {
        res += formatNumber(minute) + ':';
    }else {
		res += '00:'
	}
    if (second) {
        res += formatNumber(Math.floor(second))
    } else {
        res += '00:00'
    }
    return res;
}

const formateSecondDigital = s => {
    const hour = Math.floor(s / 3600)
    const minute = Math.floor((s - hour * 3600) / 60);
    const second = s - hour * 3600 - minute * 60;
    let res = ''
    if (hour) {
        res += formatNumber(hour) + ':';
    }
    if (minute) {
        res += formatNumber(minute) + ':';
    } else {
        res += '00:'
    }
    if (second) {
        res += formatNumber(second);
    } else {
        res += '00'
    }
    return res;
}


const requestDataByPost = object => {
	const {url, data} = object
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://www.chiy.online:8083' + url,
			data: data,
			method: "GET",
			success: (res) => {
				if(res.data.resCode == 200) {
					resolve(res.data);
				}
			}
		});
	})
}

const getZDByZDid = (id, type) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://www.chiy.online:8083/dict/findDictList?zdid=' + id + '&zxbz=0',
			method: "GET",
			success: (res) => {
				if(type == 'JSON') {
					let zdArr = res.data.data || [];
					let resArr = []
					for(let i = 0; i < zdArr.length; i ++) {
						let ct = {}
						ct[zdArr[i].ctdm] = zdArr[i].ctmc;
						resArr.push(ct) 
					}
					resolve(resArr);
				}else {
					resolve(res.data.data);
				}
			}
		});
	})
}


/**
 * type: 'JSON' 或者不传
 * zddm: 'D_SYS_AJZTDM' => 案件状态   'D_SYS_AJCLFSDM' => 案件处理方式     'D_SYS_AJQYDM' => 案件区域
 * 		 'D_SYS_AJLXDM' => 案件类型	 'D_SYS_WFFSDM' => 外访方式	  'D_SYS_RWFSDM' => 任务方式
 * 		 'D_SYS_RWZTDM' => 任务状态
 * 传入字典代码查询， 字典json数据
 */
const getZDData = (zddm, type) => {
	return new Promise((resolve, reject) => {
		requestDataByPost({
			url: '/dict/findDicts',
			data: {
				"zddm": zddm,
				"zxbz": 0
			}
		}).then(res => {
			let zdid = res.data[0].id;
			return getZDByZDid(zdid, type)
		}).then(res => {
			resolve(res) 
		})
	})
	
}


module.exports = {
    formatTime: formatTime,
    formateSecond: formateSecond,
    formateSecondDigital: formateSecondDigital,
	formateMSecond: formateMSecond,
	getZDData: getZDData
}