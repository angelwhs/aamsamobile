import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try{
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token', 'vuex_tabbar'];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}

const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {name: '明月'},
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_version: '1.0.1',
		vuex_demo: '绛紫',
		// 自定义tabbar数据
		vuex_tabbar: lifeData.vuex_tabbar ? lifeData.vuex_tabbar:[{
				iconPath: "/static/index.png",
				selectedIconPath: "/static/index-selected.png",
				text: '首页',
				pagePath: '/pages/index/index',
				PageLayoutId: 0
			},
			{
				iconPath: "/static/center.png",
				selectedIconPath: "/static/center-selected.png",
				text: '我的',
				pagePath: '/pages/center/index',
				PageLayoutId: 0
			}
		],
		
		vuex_tabbarindex: -1,
		
		vuex_pagelayout: [],
	},
	
	getters: {
		getPagelayoutByTabbarIndex: (state) => (index) => {
			if(state.vuex_pagelayout && state.vuex_pagelayout.length > 0) {
				let pagelayout = null;
				state.vuex_pagelayout.forEach(val => {
					if(val.tabbarIndex === index) {
						pagelayout == val;
						return;
					}
				});
				return pagelayout;
			}
		},
	},
	
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		},
		initTabbarList(state, list) {
			state.vuex_tabbar = list;
		}
	},
	
	actions: {
		loadTabbarList({ commit }) {
			Vue.prototype.$u.get('/api/cms/frontend/navigationbar/GetNavBar', {
				platform: 1
			}).then(res => {
				//console.log(res);
				if(res && res.Items && res.Items.length > 0) {
					let tabbarlist = [];
					res.Items.forEach((v, index) => {
						tabbarlist.push({
							iconPath: v.Icon,
							selectedIconPath: v.SelectedIcon,
							text: v.Title,
							pagePath: v.LinkUrl,
							PageLayoutId : v.PageLayoutId
						});
					});
					
					Vue.prototype.$u.vuex('vuex_tabbar', tabbarlist);
				}
			});
		},
		
		loadPageLayout({ commit }, currentItem) {
			//console.log(currentItem);
			//console.log(this.state.vuex_pagelayout);
			
			let tabbaritem = currentItem.item;
			let index = currentItem.index;
			let mustget = currentItem.mustget;
			
			if(!tabbaritem) { return; }
			
			let pageId = tabbaritem.PageLayoutId;
			
			if(!pageId || pageId <= 0) { return; }
			
			let currentpage = this.getters.getPagelayoutByTabbarIndex(index);
			
			if(currentpage && !mustget) { return; }
			
			Vue.prototype.$u.get('/api/cms/frontend/pagelayout/GetPageById', {
				id: pageId
			}).then(res => {
				//console.log(res);
				//删除原有
				if(currentpage) {
					//console.log('currentpage ' + currentpage);
					this.state.vuex_pagelayout.splice(this.state.vuex_pagelayout.indexOf(currentpage));
				}
				
				this.state.vuex_pagelayout.push({tabbarIndex: index, pagelayout: res});
			})
		},
	}
})

export default store
